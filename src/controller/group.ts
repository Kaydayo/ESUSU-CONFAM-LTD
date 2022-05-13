import {Request, Response, NextFunction} from "express";
import Group from "../model/groupModel"
import {ActiveInactive} from "../utils/interfaces";



export const createGroupPref = async (req: Request, res: Response) => {
    try {
        const existingGroupName = await Group.findOne({groupName: req.body.groupName.toLowerCase()})
        if (existingGroupName) {
            return res.status(400).json({
                status: "failed",
                message: "group name already exist"
            })
        }
        const newGroup = await Group.create({...req.body, members: [req.user], adminId: req.user.id, groupName: req.body.groupName.toLowerCase()})
        if (!newGroup) {
            return res.status(400).json({
                status: "failed",
                messsage: "an error occurred creating group"
            })
        }
        res.status(201).json({
            status: "success",
            payload: newGroup,
            message: `${req.body.groupName} was created successfully`
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("invalid");
    }
};

export const startSavingGroup = async (req: Request, res: Response) => {
    try {
        const findGroup = await Group.findOne({_id: req.params.id})

        if (!findGroup) {
            return res.status(400).json({
                status: "failed",
                message: "sorry! the group specified does not exist "
            })
        }

        if (findGroup.members!.length !== findGroup.maximumCapacity) {
            return res.status(400).json({
                status: "failed",
                message: `group savings cannot start, ${findGroup.maximumCapacity - findGroup.members!.length} more members needed`
            })
        }

        findGroup.hasBegin = ActiveInactive.ACTIVE
        findGroup.payoutAmount = findGroup!.payingAmount * findGroup.maximumCapacity
        const result = await Group.findOneAndUpdate({_id: req.body.id}, findGroup, {new: true})

        return res.status(200).json({
            status: "success",
            payload: result,
            message: `${result?.groupName} group savings started!`
        })

    } catch (err) {
        console.log(err);
        res.status(400).send("invalid");
    }
}

export const searchGroup = async (req: Request, res: Response) => {
    try {
        const getGroup = await Group.findOne({groupName: req.body.groupName.toLowerCase()})
        if (!getGroup || !getGroup.isSearch) {
            return res.status(400).json({
                status: "failed",
                message: "sorry can't find specified group name"
            })
        }
        return res.status(200).json({
            status: "success",
            payload: getGroup,
            messgae: "public group found successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("invalid");
    }

}

export const getALlPublicGroups = async (req: Request, res: Response) => {
    try {
        const listAll = await Group.find({isSearch: true}, {groupName: 1})
        if (!listAll) {
            return res.status(400).json({
                status: "failure",
                message: "sorry an error occurred"
            })
        }

        const result = listAll.map(list => list.groupName.charAt(0).toUpperCase() + list.groupName.slice(1))
        return res.status(200).json({
            status: "success",
            payload: result,
            message: "public groups"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send("invalid");
    }
}

export const getMemberPay = async (req: Request, res: Response) => {
    try {
        const findGroup = await Group.findOne({_id: req.params.id}).populate('members')
        if (!findGroup) {
            return res.status(400).json({
                status: "failed",
                message: "unable to fetch group details"
            })
        }

        return res.status(200).json({
            status: "success",
            payload: findGroup.members,
            message: 'member contributions retrieved successfully'
        })


    } catch (error) {
        console.log(error);
        res.status(400).send("invalid");
    }
}

export const genGroupInvite = async (req: Request, res: Response) => {
    try {
        const findGroup = await Group.findOne({_id: req.params.id})
        if (!findGroup) {
            return res.status(400).json({
                status: "failed",
                message: "unable to fetch group details"
            })
        }
        return res.status(200).json({
            status: "success",
            payload: findGroup.link,
            message: "group invite link retrieved successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("invalid");
    }
}

export const addMember = async (req: Request, res: Response) => {
    try {
        const findGroup = await Group.findOne({_id: req.body.groupId})
        if (!findGroup) {
            return res.status(400).json({
                status: "failed",
                message: "unable to fetch group details"
            })
        }
        findGroup?.members?.push({_id: req.body.userId})
        const result = await Group.findOneAndUpdate({_id: req.body.groupId}, findGroup, {new: true})
        return res.status(200).json({
            status: "success",
            payload: result,
            message: `added a member to ${findGroup.groupName} successfully`
        })

    } catch (error) {
        
    }
}

export const joinAGrop = async (req: Request, res: Response) => {
    const findGroup = await Group.findOne({_id: req.params.id})
    if (!findGroup) {
        return res.status(400).json({
            status: "failed",
            message: "unable to fetch group details"
        })
    }
    const result = await Group.findOneAndUpdate({_id: req.body.groupId}, findGroup, {new: true})
    return res.status(200).json({
        status: "success",
        payload: result,
        message: `a member joined ${findGroup.groupName} successfully, via i=nvite link`
    }) 
}
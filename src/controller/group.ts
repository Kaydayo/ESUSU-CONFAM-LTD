import {Request, Response, NextFunction} from "express";
import Group from "../model/groupModel"
import {ActiveInactive} from "../utils/interfaces";



export const createGroupPref = async (req: Request, res: Response) => {
    try {
        const existingGroupName = await Group.findOne({groupName: req.body.groupName.toLowerCase()})
        if (existingGroupName) {
            return res.status(400).json({
                status:"failed",
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
        const findGroup = await Group.findOne({_id: req.body.id})
        
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
        const result = await Group.findOneAndUpdate({_id: req.body.id}, findGroup, {new: true})
        
        return res.status(200).json({
            status: "success",
            payload: result,
            message: `${result?.groupName} group savings started!`
        })
        
    } catch (err){
        
    }
}





import {Request, Response, NextFunction} from "express";
import Group from "../model/groupModel"



export const createGroup = async (req: Request, res: Response) => {
    try {
        const existingGroupName = await Group.findOne({groupName: req.body.groupName})
        if (existingGroupName) {
            return res.status(400).json({
                status:"failed",
                message: "group name already exist"
            })
        }
        const newGroup = await Group.create({...req.body})
        if (!newGroup) {
            return res.status(400).json({
                status: "failed",
                messsage: "an error occurred creating group"
            })
        }
        res.status(201).json({
            status: "success",
            message: `${req.body.groupName} was created successfully`
        })
    } catch (err) {
        console.log(err);
        res.status(400).send("invalid");
    }
};





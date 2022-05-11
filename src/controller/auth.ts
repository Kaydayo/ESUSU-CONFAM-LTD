import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel";

const generateToken = (userId: string, email: string) => {
    const token = jwt.sign({email, user:userId}, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};

export const signup = async (req: Request, res: Response) => {
    try {
        const userAlreadyExist = await User.findOne({email: req.body.email});
        if (userAlreadyExist) {
            return res.status(403).json({
                status: "error",
                message: `User with the email ${req.body.email} already exists`,
            });
        }
        //hash the password
        const password = await bcrypt.hash(req.body.password, 12);

        const newUser = {...req.body, password, isAdmin: false};
        const user = await User.create({...newUser});
        const token = generateToken(user._id, newUser.email);
        res.status(201).json({
            message: "Signup successful",
            data: {token, user, password: "*********"},
        });
    } catch (err) {
        console.log(err);
        res.status(400).send("invalid");
    }
};

export const logins = async (req: Request, res: Response) => {
    try {
        //check if user's email exist
        const existingUser = await User.findOne({email: req.body.email}).select(
            "+password"
        );
        if (!existingUser) {
            res.status(400).json({
                message: "invalid login credentials",
            });
        }

        //check if user's password is correct by using bycrypt.compare

        const match = await bcrypt.compare(req.body.password, existingUser.password);

        if (!match) {
            return res.status(400).json({
                message: "invalid login credentials",
            });
        }

        const token = generateToken(existingUser.userId, existingUser.email);

        res.status(201).json({
            status: "success",
            message: "login successful",
            data: {token},
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send("invalid");
    }

};


export const protectRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token: string | undefined;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "You are not authorized! 🚨",
        });
    }
    try {
        const decodedToken: any = jwt.verify(
            token as string,
            process.env.JWT_SECRET as string
        );
        const user = await User.findOne({email: decodedToken.email});
        req.user = user;
        next();
    } catch (err) {
        // console.log(err);

        return res.status(401).json({
            status: "error",
            message: "You are not authorized! 🚨 !!!",
        });
    }
};
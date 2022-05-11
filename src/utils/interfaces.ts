import mongoose from "mongoose"

export interface User {
    firstName: string;
    lastName: string;
    DOB: Date;
    email: string;
    phoneNo: number;
    password: string;
}

export interface sign {
    fullname: string;
    email: string;
    dateOfBirth: Date;
    password: string;
}

export interface login {
    email: string;
    password: string;
}
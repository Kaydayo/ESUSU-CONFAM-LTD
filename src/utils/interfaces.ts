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

export interface IGroup {
    groupName: string;
    payingAmount?: number;
    maximumCapacity: number;
    members?: User[];
    groupDescription: string;
    payoutAmount: number;
    isSearch: boolean;
    hasBegin: ActiveInactive.ACTIVE | ActiveInactive.INACTIVE;
    adminId: string;
    link: string;
}

export enum ActiveInactive {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
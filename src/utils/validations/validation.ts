import Joi from "joi";
import {User, login, IGroup} from "../interfaces";



export const validateUser = (user: User) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        DOB: Joi.date().required(),
        email: Joi.string().email().required(),
        phoneNo: Joi.number().required(),
        password: Joi.string()
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(user);
};

export const validateLogin = (person: login) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(person);
};

export const validateGroupPref = (group: Partial<IGroup>) => {
    const schema = Joi.object({
        groupName: Joi.string().required(),
        groupDescription: Joi.string().required(),
        maximumCapacity: Joi.number().required(),
        isSearch: Joi.boolean().required(),
        payingAmount: Joi.number().required()
    });
    return schema.validate(group)
}

export const validateSearchGroup = (group: Partial<IGroup>) => {
    const schema = Joi.object({
        groupName: Joi.string().required(),
    });
    return schema.validate(group)
}

export const validateAddMember = (member: any) => {
    const schema = Joi.object({
        groupId: Joi.string().required(),
        userId: Joi.string().required(),
    });
    return schema.validate(member)
}

export const validateFundWallet = (wallet: any) => {
    const schema = Joi.object({
        amount: Joi.number().required().greater(0),
    });
    return schema.validate(wallet)
}

export const validatePayGroup = (pay: any) => {
    const schema = Joi.object({
        groupId: Joi.string().required(),
        amount: Joi.number().required().greater(0)
    });
    return schema.validate(pay)
}




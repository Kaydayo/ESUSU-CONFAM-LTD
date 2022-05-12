import mongoose, {Schema} from 'mongoose';
import Joi, {number} from 'joi';
import validator from 'validator';
import {IGroup} from '../utils/interfaces';




const groupSchema = new mongoose.Schema({

    groupName: {
        type: String,
        required: [true, 'Please provide your first name']
    },

    groupDescription: {
        type: String
    },

    payingAmount: {
        type: String, required: [true, 'Please provide saving amount']
    },

    maximumCapacity: {
        type: Number
    },

    savingsAmount: {
        type: String
    },

    isSearch: {
        type: Boolean
    },

    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
},

    {
        timestamps: true
    }

)


export default mongoose.model<IGroup>('Group', groupSchema)










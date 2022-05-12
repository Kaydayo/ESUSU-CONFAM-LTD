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
        type: Number, required: [true, 'Please provide saving amount']
    },

    maximumCapacity: {
        type: Number
    },

    payoutAmount: {
        type: Number
    },

    isSearch: {
        type: Boolean
    },

    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    
    adminId: String
},

    {
        timestamps: true
    }

)


export default mongoose.model<IGroup>('Group', groupSchema)










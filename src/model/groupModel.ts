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

    hasBegin: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },

    link: {
        type: String
    },

    members: [{ref: {type: Schema.Types.ObjectId, ref: 'User'}, amountPaid:{type:Number, default: 0}}],
    
    adminId: String
},

    {
        timestamps: true
    }

)


export default mongoose.model<IGroup>('Group', groupSchema)










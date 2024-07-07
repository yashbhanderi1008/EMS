import mongoose, { Schema, model } from "mongoose";
import { RegistrationInterface } from "@interface";


const registrationSchema = new mongoose.Schema<RegistrationInterface>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event is required'],
    },
}, { timestamps: true });

registrationSchema.index({ user: 1, event: 1 }, { unique: true });

const Registration = model<RegistrationInterface>('Registration', registrationSchema);

export default Registration;
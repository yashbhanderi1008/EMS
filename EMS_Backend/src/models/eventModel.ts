import mongoose from "mongoose";
import { EventInterface } from "@interface";


const eventSchema = new mongoose.Schema<EventInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'UserID is required'],
    },
    name: {
        type: String,
        required: [true, 'Event name is required'],
        trim: true,
        minlength: [5, 'Event name must be at least 5 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, 'Event date is required'],
        validate: {
            validator: (date: Date) => date >= new Date(),
            message: 'Event date must be in the future',
        },
    },
    location: {
        type: String,
        required: [true, 'Event location is required'],
        trim: true,
    }
}, { timestamps: true });

const Event = mongoose.model<EventInterface>('Event', eventSchema);

export default Event;
import { Document, Types } from 'mongoose';

interface EventInterface extends Document {
  userId: Types.ObjectId
  name: string;
  description: string;
  date: Date;
  location: string;
}

export default EventInterface
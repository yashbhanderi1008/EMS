import { Document, Types } from 'mongoose';

interface RegistrationInterface extends Document {
  user: Types.ObjectId;
  event: Types.ObjectId;
}

export default RegistrationInterface
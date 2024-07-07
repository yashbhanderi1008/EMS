import mongoose, { Types } from 'mongoose';
import { RegistrationInterface } from '@interface';
import { Registration } from '@models';

export class RegistrationService {
    private Registration: mongoose.Model<RegistrationInterface>;

    constructor(registrationModel: mongoose.Model<RegistrationInterface>) {
        this.Registration = registrationModel;
    }

    async registerUser(eventId: Types.ObjectId, userId: Types.ObjectId): Promise<RegistrationInterface> {
        const registration = new this.Registration({ event: eventId, user: userId });
        return await registration.save();
    }

    async getRegistrationsByEvent(eventId: string): Promise<any> {
        const users = await Registration.aggregate([
            {
              $match: { event: new mongoose.Types.ObjectId(eventId) }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
              }
            },
            {
              $unwind: '$userDetails'
            },
            {
              $project: {
                _id: 0,
                user: {
                  _id: '$userDetails._id',
                  username: '$userDetails.username',
                  email: '$userDetails.email',
                  role: '$userDetails.role',
                  createdAt: '$createdAt',
                  updatedAt: '$updatedAt'
                }
              }
            }
          ]);

        return users;
    }
}

export default new RegistrationService(Registration);

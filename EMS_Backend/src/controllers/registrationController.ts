import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { RegistrationService, registrationService } from '@services';
import { RegistrationInterface } from '@interface';

export class RegistrationController {
  private _registrationService: RegistrationService;

  constructor(registrationService: RegistrationService) {
    this._registrationService = registrationService;
    this.registerUser = this.registerUser.bind(this);
    this.getRegistrationsByEvent = this.getRegistrationsByEvent.bind(this);
  }

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eventId = new Types.ObjectId(req.params.eventId);
      const userId = (req.user._id) as Types.ObjectId;

      const registration = await this._registrationService.registerUser(eventId, userId);
      
      res.status(201).json({ message: 'User registered successfully for this event', data: registration });
    } catch (error) {
      next(error);
    }
  }

  async getRegistrationsByEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eventId = req.params.eventId;

      const registrations = await this._registrationService.getRegistrationsByEvent(eventId);

      res.status(200).json({ data: registrations });
    } catch (error) {
      next(error);
    }
  }

}

export default new RegistrationController(registrationService)
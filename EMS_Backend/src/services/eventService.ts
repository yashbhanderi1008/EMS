import mongoose, { Types } from 'mongoose';
import { Event } from '@models';
import { EventInterface } from '@interface'

export class EventService {
  private Event: mongoose.Model<EventInterface>;

  constructor(eventModel: mongoose.Model<EventInterface>) {
    this.Event = eventModel;
  }

  async createEvent(eventData: Partial<EventInterface>, userId: Types.ObjectId): Promise<EventInterface> {
    const event = new this.Event({ ...eventData, userId });
    return await event.save();
  }

  async getEventByUserId(userId: Types.ObjectId): Promise<EventInterface[] | null> {
    const event = await this.Event.find({ userId: userId }).exec();
    if (!event) {
      throw new Error(`Event not found`);
    }
    return event;
  }
  
  async getAllEvents(): Promise<EventInterface[]> {
    return await this.Event.find().exec();
  }

  async updateEvent(eventId: string, updateData: Partial<EventInterface>): Promise<EventInterface | null> {
    const event = await this.Event.findByIdAndUpdate(eventId, updateData, { new: true }).exec();
    if (!event) {
      throw new Error(`Event is not found`);
    }
    return event;
  }

  async deleteEvent(eventId: string): Promise<EventInterface | null> {
    const event = await this.Event.findByIdAndDelete(eventId).exec();
    if (!event) {
      throw new Error(`Event is not found`);
    }
    return event;
  }
}

export default new EventService(Event);

import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { EventInterface } from '@interface';
import { EventService, eventService } from '@services';

class EventController {
    private _eventService: EventService;

    constructor(eventService: EventService) {
        this._eventService = eventService;
        this.createEvent = this.createEvent.bind(this);
        this.getEventByUser = this.getEventByUser.bind(this);
        this.getAllEvents = this.getAllEvents.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req.user._id) as Types.ObjectId;
            const eventData: Partial<EventInterface> = req.body;

            const event = await this._eventService.createEvent(eventData, userId);

            res.status(201).json({ message: "Event created successfully", data: event });
        } catch (error) {
            next(error)
        }
    }

    async getEventByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req.user._id) as Types.ObjectId;

            const event = await this._eventService.getEventByUserId(userId);

            res.status(200).json({ data: event });
        } catch (error) {
            next(error)
        }
    }

    async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const events = await this._eventService.getAllEvents();

            res.status(200).json({ data: events });
        } catch (error) {
            next(error)
        }
    }

    async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const eventId = req.params.id;
            const updateData: Partial<EventInterface> = req.body;

            const event = await this._eventService.updateEvent(eventId, updateData);

            res.status(200).json({ message: 'Event updated successfully', data: event });
        } catch (error) {
            next(error)
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const eventId = req.params.id;

            await this._eventService.deleteEvent(eventId);

            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            next(error)
        }
    }
}

export default new EventController(eventService);

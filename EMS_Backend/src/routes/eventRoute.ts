import express from 'express';
import { eventController } from '@controllers';
import authentication from '../middleware/authentication';

const router = express.Router();

router.post('/', authentication.authorizeUser, eventController.createEvent);
router.get('/user', authentication.authorizeUser, eventController.getEventByUser);
router.get('/', authentication.authorizeUser, eventController.getAllEvents);
router.put('/:id', authentication.authorizeUser, eventController.updateEvent);
router.delete('/:id', authentication.authorizeUser, eventController.deleteEvent);

export default router;

import express from 'express';
import { registrationController } from '@controllers';
import authentication from '../middleware/authentication';

const router = express.Router();

router.post('/:eventId', authentication.authorizeUser, registrationController.registerUser);
router.get('/event/:eventId', authentication.authorizeUser, registrationController.getRegistrationsByEvent);

export default router;

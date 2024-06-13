import express from 'express';
import zodValidationRequest from '../../middlewares/zodValidationRequest';
import { userValidation } from './user.validate';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/me', UserControllers.getUser);

export const UserRoutes = router;

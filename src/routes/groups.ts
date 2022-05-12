import express from 'express';
import { createGroupPref } from '../controller/group';
import validateMiddleware from '../middleware/validateMiddleware';
import {validateGroupPref} from '../utils/validations/validation';
import { protectRoute } from '../controller/auth';

var router = express.Router();

/* GET users listing. */
router.post('/grouppreference', protectRoute, [validateMiddleware(validateGroupPref)], createGroupPref )


export default router;

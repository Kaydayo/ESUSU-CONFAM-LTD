import express from 'express';
import {fundMyWallet, getBalance, logins, protectRoute, signup} from '../controller/auth';
import validateMiddleware from '../middleware/validateMiddleware';
import {validateUser, validateLogin, validateFundWallet} from '../utils/validations/validation';

var router = express.Router();

/* GET users listing. */

router.get('/balance', protectRoute, getBalance)

router.post('/signup', [validateMiddleware(validateUser)], signup)
router.post('/login', [validateMiddleware(validateLogin)], logins)
router.post('/fundmywallet', protectRoute, [validateMiddleware(validateFundWallet)], fundMyWallet)



export default router;

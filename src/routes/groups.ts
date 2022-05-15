import express from 'express';
import {addMember, createGroupPref, genGroupInvite, getALlPublicGroups, getMemberPay, joinAGroup, payToGroup, searchGroup, startSavingGroup} from '../controller/group';
import validateMiddleware from '../middleware/validateMiddleware';
import {validateAddMember, validateFundWallet, validateGroupPref, validatePayGroup} from '../utils/validations/validation';
import {fundMyWallet, protectRoute} from '../controller/auth';

var router = express.Router();

/* GET users listing. */
router.get('/groupinvite/:id', protectRoute, genGroupInvite)

router.get('/getmemberpay/:id', protectRoute, getMemberPay)

router.get('/publicgroups', protectRoute, getALlPublicGroups)

router.get('/searchgroup', protectRoute, searchGroup)

router.get('/startgroupsavings/:id', protectRoute, startSavingGroup)

router.get('/joinagroup/:id', protectRoute, joinAGroup)

router.post('/addmember', protectRoute, [validateMiddleware(validateAddMember)], addMember)

router.post('/grouppreference', protectRoute, [validateMiddleware(validateGroupPref)], createGroupPref)

router.post('/paytogroup', protectRoute, [validateMiddleware(validatePayGroup)], payToGroup)







export default router;

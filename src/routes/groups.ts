import express from 'express';
import {addMember, createGroupPref, genGroupInvite, getALlPublicGroups, getMemberPay, joinAGrop, searchGroup, startSavingGroup} from '../controller/group';
import validateMiddleware from '../middleware/validateMiddleware';
import {validateGroupPref} from '../utils/validations/validation';
import {protectRoute} from '../controller/auth';

var router = express.Router();

/* GET users listing. */
router.get('/groupinvite/:id',protectRoute,genGroupInvite )

router.get('/getmemberpay/:id', protectRoute, getMemberPay)

router.get('/publicgroups', protectRoute, getALlPublicGroups)

router.get('/searchgroup', protectRoute, searchGroup)

router.get('/startgroupsavings/:id', protectRoute, startSavingGroup)

router.post('/joinagroup', protectRoute, joinAGroup)

router.post('/addmember',protectRoute, [validateMiddleware(validateGroupPref)], addMember)

router.post('/grouppreference', protectRoute, [validateMiddleware(validateGroupPref)], createGroupPref)




export default router;

const express =require('express')
const { getUsersForSideBar}=require('../controllers/user.controller.js')
const protectRoute = require('../middleware/protectRoute.js');

const router=express.Router()


router.get('/',protectRoute,getUsersForSideBar)



module.exports=router;
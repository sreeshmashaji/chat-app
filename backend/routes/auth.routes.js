const express =require('express')
const { loginUser,logoutUser,signUpUser}=require('../controllers/auth.controller.js')

const router=express.Router()

router.post("/login",loginUser)


router.post("/signup",signUpUser)


router.post("/logout",logoutUser)



module.exports = router;
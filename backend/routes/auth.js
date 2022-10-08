const express = require('express');
const {body, validationResult} = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/User');
const signature = "praty@ksh1";
const fetchuser = require('../middleware/fetchuser');
const { findById } = require('../models/Note');

//Route 1: -> To create the user 

router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],async (req,res)=>{
   
    let success = false;
    //<----- these all errors are related to the validation only not for the authentication
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success,error:error.array()});
    }  // -------------->
try{
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(404).json({success,email:'the email has already been registered'});
    }

    //creating the hash value for the password with the help of bcryptjs-->
    const salt = await bcrypt.genSalt(5); // salt is the additional text after user password
    const secPass = await bcrypt.hash(req.body.password,salt);

    //here we are creating and making the user into database
    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
    })   


    //generating the tokens with the help of jsonwebtoken for authentication

    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,signature);

    success = true;
    res.json({success,authtoken});
    
}
catch(err){
    res.status(500).json({success,error:'sorry some error has been occured'});
    console.log(err.message)
}
})

//Route 2 :-> route for the login 


router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password',"Enter a valid password").exists()
], async (req,res)=>{

    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,error:errors.array()});
    }
try{
    const{email, password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
        res.status(400).json({success,error:"Invalid Credentials"});
    }
    else{
        
        const check = await bcrypt.compare(password, user.password);
        if(!check) res.status(400).json({success,error: "Invalid Credentials"});
        else {
            const data = {
                user : {
                    id: user.id
                }
            }

            const key = jwt.sign(data,signature);
            success = true;
            res.json({success,yourkey:key});
        }
    }
}
catch(error){
    console.error(error);
    res.status(404).send('Some internal error occures');

}

})

//Route 3: Route for getting the user details 

router.post('/getuser',fetchuser,async (req,res)=>{

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error:"some internal error occured"});
    }
})

module.exports = router;

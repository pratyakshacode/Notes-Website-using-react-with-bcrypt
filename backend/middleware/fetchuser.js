const jwt = require('jsonwebtoken');
const signature = "praty@ksh1";

const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"please validate yourself with the token "});

    }

    else {
        try {
            const data = jwt.verify(token,signature);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).json({error:"please validate youself with the correct token"});
        }
    }

}

module.exports = fetchuser;
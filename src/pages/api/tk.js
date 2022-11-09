import {verify} from 'jsonwebtoken'
export default function handler(req, res) {
    const tk = req.cookies.usr
    if(typeof tk == 'undefined'){
        res.json({
            status:"Error",
            msg:"No token"
        })
    }else{
        try {
            const user = verify(tk,process.env.SECRET)
            res.json({
                status:"OK",
                msg:"Todo okas",
                data:{
                    uid:user.uid,
                    firstname:user.firstname,
                    surename:user.surename,
                    email:user.email,
                    school_id:user.school_id,
                    token_usr:tk,
                }
            })
        } catch (error) {
            res.json({
                status:"Error",
                msg:"No token"+error
            })
        }
    }
  }
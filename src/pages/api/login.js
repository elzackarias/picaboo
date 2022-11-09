import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function login(req,res){
    const data = req.body

  /*const res = await axios({
    method: "post",
    url: process.env.API_URI + "/login",
    data: data,
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
  });*/

  const settings = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      email:data.email,
      password:data.pass
    })
  };
  try {
    const peticion = await fetch(process.env.API_URI+'/login', settings);
    const respuesta = await peticion.json();
    console.log(respuesta)
    if(respuesta.status == "OK"){
      const tk = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 60,
          email: respuesta.data.email,
          uid:respuesta.data.uid,
          firstname:respuesta.data.firstname,
          surename:respuesta.data.surename,
          school_id:respuesta.data.school_id
        },
        process.env.SECRET
      );

      const serialized = cookie.serialize("usr", tk, {
        httpOnly: true,
        //secure: process.env.NODE_ENV !== "development",
        secure:true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });
     res.setHeader("Set-Cookie", serialized);
    return res.json({ data: respuesta.status, tk });
    }else{
      throw respuesta.msg
    }
  } catch (error) {
    const err = {
      status:'Error',
      msg:error
    }
    return res.json(err);
  }
};

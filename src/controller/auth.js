import axios from "axios";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const login = async (data) => {
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
      return { data: respuesta.status, tk };
    }else{
      throw 'Error desconocido'
    }
  } catch (error) {
    const err = {
      status:'Error',
      msg:error
    }
    return err;
  }
};

export const signup = async (data) => {
  const {
    firstname,
    surename,
    reg_email__,
    reg_passwd__,
    birthday_day,
    birthday_month,
    birthday_year,
    sex,
  } = data;

  const validRegex = /^[\w-\.]+@alumno.buap.mx$/;
  if (validRegex.test(reg_email__) == false) {
    const err = {
      status: "Error",
      msg: "Solo de admiten emails BUAP",
    };
    return err;
  } else {
    const birth = birthday_year + "-" + birthday_month + "-" + birthday_day;

    const newData = {
      name: firstname,
      surename,
      email: reg_email__,
      password: reg_passwd__,
      school: 1,
      birth,
      sex,
    };

    try {
      const res = await axios({
        method: "post",
        url: process.env.API_URI + "/register",
        data: newData,
      });
      return res.data;
    } catch (error) {
      const err = {
        status: "Error",
        msg: error,
      };
      return err;
    }
  }
};

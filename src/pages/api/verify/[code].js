import axios from "axios";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  const { code, vrk } = req.query;
  //estrres.redirect('/');
  if (vrk === "6f4f4238-0229-4159-aa4b-204feaedcbe0") {
    const query = await axios({
      method: "post",
      url: process.env.API_URI + "/verify",
      data: {
        code: code,
      },
    });
    if (query.data.status == "Error") {
      res.redirect("/");
    } else {
      const tk = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 60,
          email: query.data.data.email,
          uid:query.data.data.uid,
          firstname:query.data.data.firstname,
          surename:query.data.data.surename,
          school_id:query.data.data.school_id
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
      return res.json({ data: query.data.status, tk });
    }
  } else {
    res.redirect("/");
  }
}

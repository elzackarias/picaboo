import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar";

export default function Code() {
  const router = useRouter();
  const [estado,setEstado] = useState("")
  useEffect(() => {
    const ruta = router.query.code;
    console.log(ruta)
    if (ruta == "success") {
      setEstado("success")
    }else if (ruta == "error"){
        setEstado("error")
    }else{
        //router.push('/')
    }
  }, []);

  return (
    <div className="bg-gris h-screen">
      <Navbar />
      <div className="flex items-center justify-center m-auto">
        Centered using Tailwind Flex{estado}
      </div>
    </div>
  );
}

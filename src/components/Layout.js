import { useEffect, useState } from "react";
import { login, signup } from "../controller/auth";
import { useRouter } from "next/router";
import axios from "axios";

export const Layout = () => {
  const router = useRouter()
  const mss = [
    { name: "enero", id: 1 },
    { name: "febrero", id: 2 },
    { name: "marzo", id: 3 },
    { name: "abril", id: 4 },
    { name: "mayo", id: 5 },
    { name: "junio", id: 6 },
    { name: "julio", id: 7 },
    { name: "agosto", id: 8 },
    { name: "septiembre", id: 9 },
    { name: "octubre", id: 10 },
    { name: "noviembre", id: 11 },
    { name: "diciembre", id: 12 },
  ];
  const [email, setEmail] = useState("");
  const [dia, setDia] = useState(0);
  const [month, setMes] = useState(0);
  const [inactive, setActive] = useState(false);
  const [meses, setMeses] = useState(mss);
  const [pass, setPass] = useState("");
  const [datos, setDatos] = useState({
    firstname: "",
    surename: "",
    reg_email__: "",
    reg_passwd__: "",
    birthday_day: "",
    birthday_month: "",
    birthday_year: "",
    sex: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowModalError] = useState(false);
  const [showSuccessModal, setShowModalSuccess] = useState(false);
  const [errno, setErrno] = useState("");

  useEffect(() => {
    setDia(new Date().toLocaleString("en-US", { day: "2-digit" }));
    setMes(new Date().getMonth() + 1);
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const logg = await axios.post('/api/login',{ email, pass })
    if(logg.data.status == "OK"){
      router.push('/home')
    }else{
      setErrno(logg.data.msg)
      setShowModalError(true);
    }
    //const q = login();

  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSign = async (e) => {
    e.preventDefault();
    setActive(true);
    const s = await signup(datos);
    if (s.status == "Error") {
      setActive(false);
      setErrno(s.msg);
      setShowModalError(true);
    } else {
      setActive(false);
      setShowModal(false)
      setShowModalSuccess(true);
    }
  };
  return (
    <div className="w-3/4 xs:w-full my-0 mx-auto p-5">
      {showSuccessModal ? (
        <>
          <div className="fixed inset-0 z-150 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40 bg-negro"
              onClick={() => setShowModalSuccess(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-md p-6 mx-auto bg-blanco rounded-md shadow-lg">
                <div className="sm:flex">
                  <div className="text-center sm:text-left">
                    <h4 className="text-2xl font-bold text-corporative mb-2">
                      Éxitoo!
                    </h4>
                    <p>
                      Por favor confirme su email ingresando al link enviado
                    </p>
                    <p className="mb-2">
                      Email enviado a <b>{datos.reg_email__}</b>
                    </p>
                    <button
                      onClick={() => {
                        setShowModalSuccess(false);
                      }}
                      className="w-full mt-2 p-2 font-bold bg-corporative text-blanco rounded-lg"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showErrorModal ? (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40 bg-negro"
              onClick={() => setShowModalError(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-md p-6 mx-auto bg-blanco rounded-md shadow-lg">
                <div className="sm:flex">
                  <div className="text-center  w-full sm:text-left">
                    <h4 className="text-2xl font-bold text-red-500">Error</h4>
                    <p className="">Ocurrió el siguiente error:</p>
                    <p>{errno}</p>
                    <button
                      onClick={() => {
                        setShowModalError(false);
                      }}
                      className="w-full mt-2 p-2 font-bold bg-corporative text-blanco rounded-lg"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-30 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40 bg-negro"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-md p-6 mx-auto bg-blanco rounded-md shadow-lg">
                <div className="sm:flex">
                  <div className="text-center sm:text-left">
                    <form onSubmit={handleSign}>
                      <h4 className="text-2xl font-bold text-gray-800">
                        Registrarte
                      </h4>
                      <div className="grid overflow-hidden grid-cols-2 grid-rows-1 gap-3 mt-2">
                        <div className="box row-start-1 col-start-1 col-end-1">
                          <input
                            className="p-2.5 w-full border-2 outline-corporative bg-form border-borde rounded-md"
                            placeholder="Nombre"
                            type="text"
                            name="firstname"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="box row-start-1 col-start-2 col-end-2">
                          <input
                            className="p-2.5 w-full border-2 outline-corporative bg-form border-borde rounded-md"
                            placeholder="Apellido"
                            type="text"
                            name="surename"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid overflow-hidden grid-cols-1 grid-rows-2 gap-1.5 mt-1.5">
                        <div className="box">
                          <input
                            className="p-2.5 w-full border-2 outline-corporative bg-form border-borde rounded-md"
                            placeholder="Correo electrónico (BUAP)"
                            type="email"
                            name="reg_email__"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="box">
                          <input
                            className="p-2.5 w-full border-2 outline-corporative bg-form border-borde rounded-md"
                            placeholder="Contraseña"
                            type="password"
                            name="reg_passwd__"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <p>Fecha de nacimiento:</p>
                      </div>
                      <div className="grid overflow-hidden grid-cols-3 grid-rows-1 gap-1">
                        <div className="box">
                          <select defaultValue={dia} onChange={handleChange} name="birthday_day">
                            {[...Array(31)].map((x, i) =>
                              dia == i + 1 ? (
                                <option key={i+1} selected value={i+1}>
                                  {i+1}
                                </option>
                              ) : (
                                <option key={i+1} value={i+1}>{i + 1}</option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="box">
                          <select defaultValue={month} onChange={handleChange} name="birthday_month">
                            {meses.map((mes) =>
                              mes.id == month ? (
                                <option key={mes.id} selected value={mes.id}>
                                  {mes.name}
                                </option>
                              ) : (
                                <option key={mes.id} value={mes.id}>{mes.name}</option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="box">
                          <select defaultValue="2022" onChange={handleChange} name="birthday_year">
                            {[...Array(110)].map((x, i) => (
                              <option key={i} value={2022 - i}>{2022 - i}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid overflow-hidden grid-cols-3 grid-rows-2 gap-1">
                        <div className="box row-start-1 row-end-1 col-start-1 col-end-12">
                          <p>Sexo:</p>
                        </div>
                        <div className="box">
                          <input
                            onChange={handleChange}
                            type="radio"
                            id="woman"
                            name="sex"
                            value="woman"
                            required
                          />
                          <label htmlFor="woman">Mujer</label>
                        </div>
                        <div className="box">
                          <input
                            onChange={handleChange}
                            type="radio"
                            id="men"
                            name="sex"
                            value="men"
                            required
                          />
                          <label htmlFor="men">Hombre</label>
                        </div>
                        <div className="box">
                          <input
                            onChange={handleChange}
                            type="radio"
                            id="other"
                            name="sex"
                            value="other"
                            required
                          />
                          <label htmlFor="other">Otro</label>
                        </div>
                      </div>
                      <div className="items-center m-auto mt-3 sm:flex w-9/12">
                        <button
                          className="mt-2 p-2 w-full flex-1 text-lg font-bold bg-verde text-blanco rounded-md outline-none border focus:ring-2 disabled:opacity-75"
                          disabled={inactive}
                        >
                          Registrarte
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-9 lg:grid-cols-5">
        <div className="col-span-8 col-start-2 col-end-8 hidden lg:block md:block xl:block md:col-span-5 lg:col-span-3 items-center lg:max-w-2xl xl:max-w-2xl ">
          <h1 className="font-normal font-sans md:text-lg lg:text-xl xl:text-2xl text-black ">
            Picaboo te ayuda a conectar y compartir con la gente que te rodea
          </h1>
          <img src="images/home.png" className="w-9/12" />
        </div>
        <div className="col-span-3 sm:col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-2 max-w-sm">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full p-2.5 mb-2 border-2 outline-corporative bg-blanco border-borde rounded-lg"
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full p-2.5 border-2 outline-corporative bg-blanco border-borde rounded-lg"
              onChange={handlePass}
              required
            />
            <br />
            <button className="w-full mt-3 p-2 font-bold bg-corporative text-blanco rounded-lg">
              Iniciar sesión
            </button>
          </form>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="w-full mt-2 p-2 font-bold bg-verde text-blanco rounded-lg"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

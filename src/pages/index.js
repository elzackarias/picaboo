import { useContext, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Layout } from "../components/Layout";
import Head from "next/head";

const Index = () => {
  return (
    <div className="bg-gris h-screen">
      <Head>
        <title>Picaboo | ¡Bienvenido!</title>
      </Head>
      <Navbar />
      <Layout />
    </div>
  );
};

export default Index;

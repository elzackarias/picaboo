import React, { useContext, useEffect,useState } from "react";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import Header from '../components/Header'
import { Layout } from "../components/Layout";
import UserContext from "../context/User/UserContext";

const Home = () => {
  const { setData, user } = useContext(UserContext);

  return (
    <div className="h-screen">
      <Head>
        <title>Picaboo | Home</title>
      </Head>
      <Header />
      <button onClick={setData}>CLick me</button>
    </div>
  );
};

export default Home;

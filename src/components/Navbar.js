import React, { useContext } from "react";
import UserContext from "../context/User/UserContext";
import Link from "next/link";
export const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <header className="bg-blanco flex h-16 items-center">
        <div className="w-3/4 my-0 mx-auto">
          <Link href="/">
            <a className="font-Main text-corporative text-2xl">Picaboo</a>
          </Link>
        </div>
      </header>
    </div>
  );
};

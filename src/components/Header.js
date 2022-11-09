import Link from "next/link";
import { FiSearch,FiHome,FiBook,FiBookmark,FiBookOpen } from "react-icons/fi";
import HeaderIcon from "./HeaderIcon";
function Header() {
  return (
    <div className="sticky top-0 z-50 bg-blanco flex items-center p-2 lg:px-5 shadow-md">
      {/* START LEFT */}
      <div className="flex items-center">
        <Link href="/">
          <a className="font-Main text-corporative text-2xl">Picaboo</a>
        </Link>

        <div className="flex ml-3 items-center rounded-full bg-gray-100 p-2">
          <FiSearch className="text-xl text-gray-600" />
          <input
            className="flex ml-2 items-center bg-gray-100 outline-none placeholder-gray-500 flex-shrink"
            type="text"
            name="search__"
            placeholder="Buscar en Picaboo"
          />
        </div>
      </div>
      {/* END LEFT */}
      {/* START CENTER*/}
      <div className="flex justify-center items-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
        <HeaderIcon active={true} Icon={FiHome} />
        <HeaderIcon Icon={FiBook} />
        <HeaderIcon Icon={FiBookmark} />
        </div>
      </div>
      {/* END CENTER */}
      {/* START RIGHT */}
      <div className="flex items-center">
        <p>José Reducindo</p>
      </div>
      {/* END RIGHT */}
    </div>
  );
}

export default Header;

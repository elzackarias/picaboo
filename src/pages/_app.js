import "../styles/globals.css";
import UserState from "../context/User/UserState";

function Main({ Component, pageProps }) {
  return (
    <UserState>
      <Component {...pageProps} />
    </UserState>
  );
}

export default Main;

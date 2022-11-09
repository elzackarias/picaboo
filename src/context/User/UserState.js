import React, { useReducer } from "react";
import UserReducer from "./UserReducer";
import UserContext from "./UserContext";
import axios from "axios";

const UserState = (props) => {
  const initialState = {
    user: {
      uid: "",
      firstname: "",
      surename: "",
      email: "",
      school_id: "",
      token_usr: "",
    },
    noti: 0,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setData = async () => {
    //dispatch({
    //    type:'SAVE_DATA',
    //    payload:
    //})
    const res = await axios.get("/api/tk");
    if (res.data.status == "OK") {
      dispatch({
        type: "SAVE_DATA",
        payload: res.data.data,
      });
    }
  };

  const setNotification = () => {
    dispatch({
      type: "NOTIFY",
      payload: state.noti+1,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setData,
        setNotification,
        notification: state.noti,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;

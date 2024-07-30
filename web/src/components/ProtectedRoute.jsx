import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { setUser } from "../stores/redux/slice/userSlice";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const logedInProtectedPath = ["/", "/signup"];
  const notLogedInProtectedPath = ["/books"];

  let usersToken = localStorage.getItem("acctkn");
  usersToken = usersToken ? JSON.parse(usersToken) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (
        !usersToken &&
        notLogedInProtectedPath?.includes(location?.pathname)
      ) {
        navigate("/");
        return;
      }

      if (usersToken && logedInProtectedPath?.includes(location?.pathname))
        return navigate("/books");

      try {
        const fetch = await axios.post(
          "http://localhost:8000/signin/persist",
          {},
          {
            headers: {
              accesstoken: usersToken,
            },
          }
        );
        console.log(fetch);
        dispatch(
          setUser({
            email: fetch.data.data.email,
            role: fetch.data.data.role,
          })
        );
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    fetchData();

    return () => {};
  }, [usersToken, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;

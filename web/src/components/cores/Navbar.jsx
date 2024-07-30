import { useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setUser } from "../../stores/redux/slice/userSlice";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const route = useLocation();

  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.user);

  const onHandleSignout = () => {
    localStorage.clear();
    dispatch(
      setUser({
        email: "",
        role: "",
      })
    );
    window.location.reload();
  };

  return (
    <div
      className={`${
        route.pathname === "/" || route.pathname === "/signup"
          ? "hidden"
          : "block bg-emerald-700 h-12 text-white"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        {stateUser.email}
        <IoIosLogOut
          className="text-2xl font-bold hover:cursor-pointer hover:text-zinc-200"
          onClick={onHandleSignout}
        />
      </div>
    </div>
  );
}

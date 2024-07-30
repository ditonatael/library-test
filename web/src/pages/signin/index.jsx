import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../schemas/loginSchema";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onHandleSignin = async (values, restForm) => {
    try {
      const res = await axios.post("http://localhost:8000/signin", {
        email: values.email,
        password: values.password,
      });
      const accesstoken = res.data.data.accesstoken;
      localStorage.setItem("acctkn", JSON.stringify(accesstoken));
      toast.success(res.data.message);
      const role = res.data.data.role;
      if (role === "User") {
        navigate("/books");
      } else if (role === "Admin") {
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-xl font-bold">Signin</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          onHandleSignin(values);
        }}
      >
        <Form>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <Field
              type="text"
              name="email"
              className="input input-bordered w-[400px] rounded-none"
            />
            <ErrorMessage
              name="email"
              component={"div"}
              className="text-red-500 text-sm font-montserrat"
            />
          </label>
          <label className="form-control w-full relative">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-[400px] rounded-none pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <ErrorMessage
              name="password"
              component={"div"}
              className="text-red-500 text-sm font-montserrat"
            />
          </label>
          <div className="text-sm">
            <span>Don't have an account? </span>
            <Link to="/signup">
              <span className="text-blue-400 hover:cursor-pointer hover:text-blue-300">
                Signup
              </span>
            </Link>
          </div>
          <button
            type="submit"
            className="btn bg-black text-white w-full rounded-none my-3"
          >
            Signin
          </button>
        </Form>
      </Formik>
    </div>
  );
}

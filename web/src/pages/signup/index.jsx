import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../../schemas/registerSchema";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onHandleSignup = async (values, restForm) => {
    try {
      console.log(values);
      const res = await axios.post("http://localhost:8000/signup/user", {
        email: values.email,
        password: values.password,
      });
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-xl font-bold">Signup</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          onHandleSignup(values);
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
            <span>already have an account? </span>
            <Link to="/">
              <span className="text-blue-400 hover:cursor-pointer hover:text-blue-300 ">
                signin
              </span>
            </Link>
          </div>
          <button
            type="submit"
            className="btn bg-black text-white w-full rounded-none my-3"
          >
            Signup
          </button>
        </Form>
      </Formik>
    </div>
  );
}

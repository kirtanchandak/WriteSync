import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
import { useSetRecoilState } from "recoil";

function Login() {
    const userEmail = useSetRecoilState(userState);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email: email,
                password: password
            })
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            userEmail({
                isLoading: false,
                userEmail: email,
            })
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <>
      <Layout>
        <div className="max-w-[280px] mx-auto">
          <div className="flex flex-col items-center mt-[10vh]">
            <h2 className="mb-5 text-gray-900 font-bold text-xl">
              Log In
            </h2>
            <form>
              <input
                type="email"
                className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-gray-300 text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]"
                onClick={handleLogin}
              >
                Log In
              </button>
            </form>
            <p className="text-center mt-3 text-[14px]">
              Don&#x27;t have an account?{" "}
              <a href="/signup" className="text-gray-600">
                Create one
              </a>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
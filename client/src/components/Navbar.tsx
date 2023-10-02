import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";

function Navbar() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState)

  const handlelogOut =  () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }

  return (
    <>
      <div className="flex justify-between md:px-20 py-5 text-xl px-5 border-b-2 border-black">
        <div className="flex gap-16">
          <a className="font-dm-serif-display font-bold " href="/">
            WriteSync+
          </a>
        </div>
        <div>
          <ul className="flex lg:gap-8 gap-3 font-poppins">
            <span className="flex lg:gap-8 gap-3 lg:mt-[6px]"> 
              {
                userEmail ? (
                  <div className="flex gap-8">
                    <p>{userEmail}</p>
                    <button className="hidden lg:flex" onClick={handlelogOut}>
               Logout
              </button>
                </div>
                ) : (
                    <div>
                       <Link to="/login" className="hidden lg:flex">
               Login
              </Link>
                    </div>
                )
              }
            </span>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
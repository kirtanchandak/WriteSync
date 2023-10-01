import { Link } from "react-router-dom";

function Navbar() {

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
              <Link to="/login" className="hidden lg:flex">
               Login
              </Link>
              <Link to="/signup" className="hidden md:block">Signup</Link>
            </span>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
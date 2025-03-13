import hourGlass from "../assets/images/hourglass.svg";
import { FaPlus } from "react-icons/fa6";
const Header = () => {
  return (
    <header className="px-[120px] pt-[30px] pb-[70px] flex items-center justify-between">
      <div className="flex items-center group">
        <h1 className="text-purple text-[32px] font-black font-heading">
          Momentum
        </h1>
        <img
          src={hourGlass}
          alt="HourGlassIcon"
          className="transition-transform duration-700 group-hover:animate-slowSpin"
        />
      </div>

      <div className="flex items-center gap-x-10">
        <button className="py-[10px] px-[20px] text-[#212529] border border-purple rounded-[5px] transition-all duration-300 hover:bg-purple hover:text-white">
          თანამშრომლის შექმნა
        </button>
        <button className="flex items-center gap-2 py-[10px] px-[20px] text-white bg-purple border border-purple rounded-[5px] transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-400 hover:shadow-lg hover:scale-105 active:scale-95">
          <FaPlus />
          <span>შექმენი ახალი დავალება</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

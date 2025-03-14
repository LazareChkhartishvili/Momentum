import hourGlass from "../assets/images/hourglass.svg";
import { FaPlus } from "react-icons/fa";
import ModeSwither from "./ModeSwither";
import { motion } from "framer-motion";
import { useState } from "react";

import { Link } from "react-router";
import CreateEmployer from "./CreateEmployer";

const Header = () => {
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

  return (
    <header className="pt-[30px] pb-[70px] flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center group gap-2">
          <Link
            to={"/"}
            className="text-purple text-[32px] font-black font-heading"
          >
            Momentum
          </Link>
          <img
            src={hourGlass}
            alt="HourGlassIcon"
            className="transition-transform duration-700 group-hover:animate-slowSpin"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-x-10">
          <button
            onClick={() => setIsEmployerModalOpen(true)}
            className="py-[10px] dark:text-white px-[20px] text-darkGray border border-purple rounded-[5px] transition-all duration-300 hover:bg-purple hover:text-white"
          >
            თანამშრომლის შექმნა
          </button>
          {isEmployerModalOpen && (
            <CreateEmployer closeModal={() => setIsEmployerModalOpen(false)} />
          )}
          <Link
            to={"/addTask"}
            className="flex items-center gap-2 py-[10px] px-[20px] text-white bg-purple border border-purple rounded-[5px] transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-400 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <FaPlus />
            <span>შექმენი ახალი დავალება</span>
          </Link>
          <ModeSwither />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;

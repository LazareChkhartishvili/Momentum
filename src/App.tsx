import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import { ThemeProvider } from "./context/ThemeContext";
import SingleTask from "./pages/SingleTask";

const App = () => {
  return (
    <ThemeProvider>
      <div className="px-[120px] font-FiraGo w-full min-h-screen bg-white dark:bg-zinc-800 text-black dark:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addTask" element={<AddTask />}></Route>
          <Route path="/task/:id" element={<SingleTask />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;

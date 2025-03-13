import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className="font-FiraGo w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addTask" element={<AddTask />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;

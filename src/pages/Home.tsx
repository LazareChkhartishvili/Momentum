import MainFilter from "../components/MainFilter";
import StatusList from "../components/StatusList";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-darkGray dark:text-white font-semibold text-[32px]">
        დავალებების გვერდი
      </h1>
      <MainFilter />
      <StatusList />
    </div>
  );
};

export default HomePage;

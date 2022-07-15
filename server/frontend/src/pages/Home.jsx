import { Link } from "react-router-dom";
import { HomeStats } from "../components";

const Home = () => {

  return (
    <div className="relative overflow-hidden w-full h-screen">
    <div className="container">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <HomeStats />
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
              Select
            </h2>
            <Link to="find" className="text-white bg-indigo-500 border-0  focus:outline-none hover:bg-indigo-600 rounded text-lg mt-5 h-20 flex justify-center items-center hover:scale-x-105 duration-500">
              <i className="mdi mdi-account-plus mr-3"></i>
              New User
            </Link>
            <Link to="existing-devices" className="text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-5 h-20 flex justify-center items-center hover:scale-x-105 duration-500">
              <i className="mdi mdi-account-search mr-3"></i>
              Existing User
            </Link>

            {/* <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-5">
              Button
            </button> */}
          </div>
        </div>
      </section>
    </div>
  </div>
  );
};

export default Home;

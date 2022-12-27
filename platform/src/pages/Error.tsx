import { errorIllustration } from "../assets/illustrations";
import { Link } from "react-router-dom";
export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={errorIllustration} alt="error" width={500}></img>
      <h1 className="text-2xl font-bold text-slate-200">Ooops...</h1>
      <h2 className="text-xl font-bold text-slate-200">
        Something went wrong. Please try again.
      </h2>
      <Link to="/">
        <button className="bg-slate-200 text-slate-900 hover:bg-slate-400 px-4 py-2 rounded-md mt-4">
          Go Back
        </button>
      </Link>
    </div>
  );
};

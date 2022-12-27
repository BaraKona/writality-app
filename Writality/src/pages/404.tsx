import { FourOFourIllustration } from "../assets/illustrations";
import { Link } from "react-router-dom";

export const FourOFour = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={FourOFourIllustration} alt="404" width={500}></img>
      <h1 className="text-4xl font-bold">Ooops, seems you're a bit lost 😅</h1>
      <Link to="/">
        <button className="bg-slate-200 text-slate-900 hover:bg-slate-400 px-4 py-2 rounded-md mt-8">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

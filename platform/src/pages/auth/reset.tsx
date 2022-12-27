import { MainNavigation } from "../../components/Navigation";
import { registerIllustration } from "../../assets/illustrations";
import { Reset } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function ResetPage() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/dashboard");
  }
  return (
    <div>
      <MainNavigation />
      <div className="container flex px-4 mx-auto flex-wrap-reverse">
        <Reset />
        <div className="flex flex-grow flex-shrink sm justify-center min-w-[400px]">
          <img src={registerIllustration} alt="login" width={500}></img>
        </div>
      </div>
    </div>
  );
}

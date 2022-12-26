import { MainNavigation } from "../../components/Navigation";
import { loginIllustration } from "../../assets/illustrations";
import { Login } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/dashboard");
  }
  return (
    <div>
      <MainNavigation />
      <div className="container flex px-4 mx-auto flex-wrap-reverse ">
        <Login />
        <div className="flex flex-grow sm justify-center min-w-[400px]">
          <img src={loginIllustration} alt="login" width={500}></img>
        </div>
      </div>
    </div>
  );
}

import { ComponentLoader } from "./components/ComponentLoader";
import { useEffect } from "react";
// import { io } from "socket.io-client";
import { useAuthContext } from "./contexts/AuthContext";
import { useQuery } from "react-query";
// const socket = io("http://localhost:5000");

function App() {
  // const { currentUser } = useAuthContext();
  // useEffect(() => {
  //   if (currentUser) {
  //     socket.emit("join", currentUser.uid);
  //   }
  //   return () => {
  //     socket.on("disconnect", () => {
  //       socket.emit("disconnect");
  //       socket.off();
  //     });
  //   };
  // }, [currentUser]);

  return (
    <ComponentLoader>
      <div className="App" />
    </ComponentLoader>
  );
}

export default App;

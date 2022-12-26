import { FC } from "react";
import { MainNavigation } from "../components/Navigation";
import styles from "../Home.module.scss";
import { useAuthContext } from "../contexts/AuthContext";

export const Home: FC = () => {
  return (
    <>
      <MainNavigation />
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className="text-3xl font-bold underline">Welcome to Writality</h1>
        </div>
      </div>
    </>
  );
};

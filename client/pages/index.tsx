import type { NextPage } from "next";
import { LandingNavigation, Header } from "../components/Navigation";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <LandingNavigation />
      <div className={styles.container}>
        <Header header="" />
        <div className={styles.main}>
          <h1 className="text-3xl font-bold underline">Welcome to Writality</h1>
        </div>
      </div>
    </>
  );
};

export default Home;

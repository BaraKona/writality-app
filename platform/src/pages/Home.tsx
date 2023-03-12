import { FC } from "react";
import { MainNavigation } from "../components/Navigation";
import { HomeBanner } from "../components/Home/HomeBanner";
import { HomeInfo } from "../components/Home/HomeInfo";
import { HomeAccount } from "../components/Home/HomeAccount";
import { HomeFooter } from "../components/Home/HomeFooter";
export const Home: FC = () => {
	return (
		<div className="h-full bg-baseMid pb-5">
			<MainNavigation />
			<HomeBanner />
			<HomeInfo />
			<HomeAccount />
			<HomeFooter />
		</div>
	);
};

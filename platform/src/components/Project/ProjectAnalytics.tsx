import { FC, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const ProjectAnalytics: FC<{}> = ({}) => {
	const ref = useRef();

	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "First dataset",
				data: [33, 53, 85, 41, 44, 65],
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
			},
			{
				label: "Second dataset",
				data: [33, 25, 35, 51, 54, 76],
				fill: true,
				backgroundColor: "rgba(75,30,192,0.2)",
				borderColor: "#742774",
			},
		],
	};

	return (
		<div className="col-span-3 p-2 row-span-2 rounded-normal border border-border flex items-center">
			<Line ref={ref} data={data} />
		</div>
	);
};

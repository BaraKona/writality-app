import React, { useEffect } from "react";
import { mockData } from "../data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { IconArrowBigRight } from "@tabler/icons";
import { useRouter } from "next/router";
function data() {
  const router = useRouter();
  const [color, setColor] = React.useState("#8884d8");

  function calcCountryCount() {
    const countryCount = {} as any;
    // calculate the number of times each country appears in the data and store it in objects with country name and count
    mockData.forEach((item) => {
      if (countryCount[item.country]) {
        countryCount[item.country] += 1;
      } else {
        countryCount[item.country] = 1;
      }
    });
    // convert the object to an array of objects
    const countryCountArray = Object.keys(countryCount).map((key) => {
      return { country: key, count: countryCount[key] };
    });
    // reduce the array to only the top 10 countries
    const topTenCountries = countryCountArray
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    // set the state to the top 10 countries
    console.log(topTenCountries);
    return topTenCountries;
    // setCountry(countryCountArray);
    // console.log(countryCountArray);
  }
  const calcGenderCount = () => {
    const genderCount = {} as any;
    mockData.forEach((item) => {
      if (genderCount[item.gender]) {
        genderCount[item.gender] += 1;
      } else {
        genderCount[item.gender] = 1;
      }
    });
    // convert the object to an array of objects
    const genderCountArray = Object.keys(genderCount).map((key) => {
      return { gender: key, count: genderCount[key] };
    });
    return genderCountArray;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-10">
      <IconArrowBigRight
        size={50}
        className="absolute right-10 cursor-pointer hover:transform hover:scale-125 transition duration-500 ease-in-out"
        onClick={() => router.push("/data_2")}
      />
      <h1> Line Charts </h1>
      <div className="flex gap-8 flex-wrap">
        <div>
          <h2>Country</h2>
          <button onClick={() => setColor("#fff")}>Blue</button>
          <LineChart width={730} height={250} data={calcCountryCount()}>
            <Line type="monotone" dataKey="count" stroke={color} />
            <XAxis dataKey="country" />
            {/* cartesianGrid with dotted lines */}

            <CartesianGrid stroke="#111322" strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div>
          <h2>Gender</h2>
          <LineChart width={730} height={250} data={calcGenderCount()}>
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
      <h1> Bar Charts </h1>
      <div className="flex gap-8 flex-wrap">
        <div>
          <h2>Country</h2>
          <BarChart
            width={750}
            height={200}
            data={calcCountryCount()}
            margin={{
              top: 20,
              right: 50,
              left: 50,
              bottom: 20,
            }}
          >
            <Bar type="monotone" dataKey="count" stroke="#8884d8" />
            <XAxis dataKey="country" />
            {/* cartesianGrid with dotted lines */}

            <CartesianGrid stroke="#111322" strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </div>
        <div>
          <h2>Gender</h2>
          <BarChart width={730} height={250} data={calcGenderCount()}>
            <Bar type="monotone" dataKey="count" stroke="#8884d8" />
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default data;

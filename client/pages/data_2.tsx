import React, { useEffect } from "react";
import { mockData } from "../data/mockData";
import {
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
} from "recharts";
import { IconArrowBigLeft } from "@tabler/icons";
import { useRouter } from "next/router";

function data() {
  const [country, setCountry] = React.useState([] as any);
  const router = useRouter();
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
      .slice(0, 12);
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
  const calcColorCount = () => {
    const colorCount = {} as any;
    mockData.forEach((item) => {
      if (colorCount[item.color]) {
        colorCount[item.color] += 1;
      } else {
        colorCount[item.color] = 1;
      }
    });
    // convert the object to an array of objects
    const colorCountArray = Object.keys(colorCount).map((key) => {
      return { color: key, count: colorCount[key] };
    });
    return colorCountArray;
  };
  const calCountryAndGenderCount = () => {
    const countryAndGenderCount = {} as any;
    mockData.forEach((item) => {
      if (countryAndGenderCount[item.country]) {
        if (countryAndGenderCount[item.country][item.gender]) {
          countryAndGenderCount[item.country][item.gender] += 1;
        } else {
          countryAndGenderCount[item.country][item.gender] = 1;
        }
      } else {
        countryAndGenderCount[item.country] = {
          [item.country]: 1,
          [item.gender]: 1,
        };
      }
    });
    // convert the object to an array of objects
    const countryAndGenderCountArray = Object.keys(countryAndGenderCount).map(
      (key) => {
        return {
          country: key,
          female: countryAndGenderCount[key].Female,
          male: countryAndGenderCount[key].Male,
          count: countryAndGenderCount[key].key,
        };
      }
    );
    // reduce the array to only the top 10 countries
    const topTenCountries = countryAndGenderCountArray
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    return topTenCountries;
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-10">
      <IconArrowBigLeft
        size={50}
        className="absolute left-10 cursor-pointer hover:transform hover:scale-125"
        onClick={() => router.push("/data")}
      />
      <h1> Other Charts </h1>
      <div className="flex gap-8 flex-wrap">
        <div>
          <h2>Colors PieChart</h2>
          <PieChart width={730} height={250}>
            <Pie
              type="monotone"
              dataKey="count"
              data={calcColorCount()}
              label
              fill="#8884d8"
            />
          </PieChart>
        </div>
        <div>
          <h2>Gender PieChart</h2>
          <PieChart width={730} height={250}>
            <Pie
              type="monotone"
              dataKey="count"
              data={calcGenderCount()}
              label
              fill="#8884d8"
            />
          </PieChart>
        </div>
      </div>
      <div className="flex gap-8 flex-wrap">
        <div>
          <h2>Country Radar Chart</h2>
          <RadarChart width={730} height={250} data={calcCountryCount()}>
            {/* <Bar type="monotone" dataKey="count" stroke="#8884d8" /> */}
            <PolarAngleAxis dataKey="country" stroke="#aaa" />
            {/* cartesianGrid with dotted lines */}

            <PolarGrid />
            <PolarRadiusAxis />
            <Radar
              name="users"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </div>
        <div>
          <h2> Users per country </h2>
          <LineChart width={730} height={250} data={calCountryAndGenderCount()}>
            <Line type="monotone" dataKey="male" stroke="#8884d8" />
            <Line type="monotone" dataKey="female" stroke="#DDD" />
            <Line type="monotone" dataKey="country" stroke="#8224d8" />

            <XAxis dataKey="country" />
            {/* cartesianGrid with dotted lines */}

            <CartesianGrid stroke="#111322" strokeDasharray="3 3" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default data;

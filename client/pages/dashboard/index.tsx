import React from "react";

import { Authenticated } from "../../components/auth/Authenticated";

const Dashboard = () => {
  return (
    <Authenticated>
      <div className="h-screen"></div>
    </Authenticated>
  );
};

export default Dashboard;

import React, { useState } from "react";
import TopBar from "./TopBar";
import { TopBarTab } from "../models/constants";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState(TopBarTab.Reporting);

  return (
    <React.Fragment>
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab}/>
    </React.Fragment>
  );
}
import React, { useState } from "react";
import TopBar from "./TopBar";
import { TopBarTab } from "../shared/models";
import Reporting from "./Reporting";
import Payouts from "./Payouts";
import { Backdrop, CircularProgress } from "@mui/material";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState(TopBarTab.Payouts);
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab}/>
      {activeTab === TopBarTab.Payouts ? (
        <Payouts setLoading={setLoading} />
      ) : (
        <Reporting setLoading={setLoading} />
      )}
    </React.Fragment>
  );
}
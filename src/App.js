import React, { useState } from "react";
import "./App.css";
import { Paper } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { TabPanel } from "@material-ui/lab";

// Material Icons
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import ApartmentIcon from "@material-ui/icons/Apartment";
// Import View Components
import MapView from "./views/MapBox";
import RMapView from "./views/RMapBox";

// import Container2 from "./container/Container2";

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Paper square>
        <TabContext value={tab}>
          <TabList
            onChange={(event, NewValue) => setTab(NewValue)}
            variant="standard"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<AddToQueueIcon />} label="view 1" value={0} />
            <Tab icon={<AirportShuttleIcon />} label="container 2" value={1} />
            <Tab icon={<ApartmentIcon />} label="component 3" value={2} />
          </TabList>
          <TabPanel style={{ padding: 0, paddingTop: "0.5rem" }} value={0}>
            <RMapView />
          </TabPanel>
          <TabPanel value={1}>
            <MapView/>
          </TabPanel>
          <TabPanel value={2}>number 3</TabPanel>
        </TabContext>
      </Paper>
    </div>
  );
}
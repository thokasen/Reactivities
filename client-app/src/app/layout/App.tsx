import React, { useEffect, Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/nav/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading activities' />;
  }

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default observer(App);

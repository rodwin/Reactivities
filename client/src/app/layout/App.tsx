import React, { useEffect, Fragment, useContext } from "react";
import { List, Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading activities..." />
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <List>
        <Container style={{ marginTop: "7rem" }}>
          <ActivityDashboard></ActivityDashboard>
        </Container>
      </List>
    </Fragment>
  );
};

export default observer(App);

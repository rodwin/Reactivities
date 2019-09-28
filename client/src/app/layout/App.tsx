import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right'></ToastContainer>
      <Route exact path="/" component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7rem" }}>
              <Switch>
                <Route
                  exact
                  path="/activities"
                  component={ActivityDashboard}
                ></Route>
                <Route path="/activities/:id" component={ActivityDetails}></Route>
                <Route
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                ></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </Fragment>
        )}
      ></Route>
    </Fragment>
  );
};

export default observer(App);

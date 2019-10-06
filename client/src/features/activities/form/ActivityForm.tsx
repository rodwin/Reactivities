import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface IDetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IDetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initializeFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id).then(
        () => initializeFormState && setActivity(initializeFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [loadActivity, clearActivity, match.params.id, initializeFormState]);

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={activity.title}
            ></Form.Input>
            <Form.TextArea
              onChange={handleInputChange}
              name="description"
              rows={2}
              placeholder="Description"
              value={activity.description}
            ></Form.TextArea>
            <Form.Input
              onChange={handleInputChange}
              name="category"
              placeholder="Category"
              value={activity.category}
            ></Form.Input>
            <Form.Input
              onChange={handleInputChange}
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            ></Form.Input>
            <Form.Input
              placeholder="City"
              name="city"
              onChange={handleInputChange}
              value={activity.city}
            ></Form.Input>
            <Form.Input
              placeholder="Venue"
              name="venue"
              onChange={handleInputChange}
              value={activity.venue}
            ></Form.Input>
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            ></Button>
            <Button
              onClick={() => history.push("/activities")}
              floated="right"
              type="button"
              content="Cancel"
            ></Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);

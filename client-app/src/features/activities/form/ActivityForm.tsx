import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid, GridColumn } from "semantic-ui-react";
import {
  ActivityFormValues
} from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
  time: isRequired("Time")
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    //this will remove date and time from values and put in activity
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder="Title"
                  name="title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  placeholder="Description"
                  name="description"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  placeholder="Category"
                  name="category"
                  options={category}
                  value={activity.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    type="datetime-local"
                    placeholder="Date"
                    name="date"
                    value={activity.date}
                    component={DateInput}
                    date={true}
                  />
                  <Field
                    type="datetime-local"
                    placeholder="Time"
                    name="time"
                    value={activity.date}
                    component={DateInput}
                    time={true}
                  />
                </Form.Group>

                <Field
                  placeholder="City"
                  name="city"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  placeholder="Venue"
                  name="venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  floated="right"
                  content="Submit"
                  type="submit"
                  loading={submitting}
                  positive
                  disabled={loading || invalid || pristine}
                />
                <Button
                  floated="right"
                  content="Cancel"
                  type="button"
                  onClick={
                    activity.id
                      ? () => {
                          history.push(`/activities/${activity.id}`);
                        }
                      : () => history.push("/activities")
                  }
                  disabled={loading}
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {

  const [activities, setActivity] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivity([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivity([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id:string) => {
    setActivity([...activities.filter(a => a.id !== id)]);
    setEditMode(false);
  }

  //useEffect takes in method to get the API response and set the activities state
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivity(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm = { handleOpenCreateForm }/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity = {selectedActivity}
          editMode = {editMode}
          setEditMode = {setEditMode}
          setSelectedActivity = {setSelectedActivity}
          createActivity = {handleCreateActivity}
          editActivity = {handleEditActivity}
          deleteActivity = {handleDeleteActivity}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default App;

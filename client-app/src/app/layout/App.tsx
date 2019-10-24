import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {

  const [activities, setActivity] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [submitting, setsubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setsubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivity([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setsubmitting(false));
  }

  const handleEditActivity = (activity: IActivity) => {
    setsubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivity([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setsubmitting(false));
  }

  const handleDeleteActivity = (event:SyntheticEvent<HTMLButtonElement>, id:string) => {
    setsubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivity([...activities.filter(a => a.id !== id)]);
      setEditMode(false);
    }).then(() => setsubmitting(false));
  }

  //useEffect takes in method to get the API response and set the activities state
  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivity(activities);
      }).then(() => setLoading(false));
  }, []);

  if (loading){
    return <LoadingComponent content='loading component...'/>;
  }

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
          submitting = {submitting}
          target = {target}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default App;

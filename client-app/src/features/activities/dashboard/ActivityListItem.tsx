import React from "react";
import { Item, Button, Segment, Icon, ItemGroup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";

interface IProps {
    key: string;
    activity: IActivity;
}

const ActivityListItem:React.FC<IProps> = ({activity}) => {
  return (
    <Segment.Group>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            ></Item.Image>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Host by JX</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <Icon name="clock" /> {activity.date}
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          content="View"
          color="blue"
          floated="right"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;

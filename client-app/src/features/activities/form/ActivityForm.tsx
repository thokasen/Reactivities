import React, { useState, FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  handleEditActivity: (activity: IActivity) => void;
  handleCreateActivity: (activity: IActivity) => void;
}
const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  handleCreateActivity,
  handleEditActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      handleCreateActivity(newActivity);
    } else {
      handleEditActivity(activity);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          onChange={handleInputChange}
          name='title'
        />
        <Form.TextArea
          rows={2}
          placeholder='Description'
          value={activity.description}
          onChange={handleInputChange}
          name='description'
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          onChange={handleInputChange}
          name='category'
        />
        <Form.Input
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
          onChange={handleInputChange}
          name='date'
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          onChange={handleInputChange}
          name='city'
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          onChange={handleInputChange}
          name='venue'
        />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;

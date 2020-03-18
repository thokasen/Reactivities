import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { IProfile } from "../../app/models/profile";

const validate = combineValidators({
  displayName: isRequired("displayName")
});

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

export const ProfileEditForm: React.FC<IProps> = ({
  updateProfile,
  profile
}) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name='displayName'
            component={TextInput}
            placeholder='Display Name'
            value={profile!.displayName}
          />
          <Field
            name='bio'
            component={TextAreaInput}
            placeholder='Bio'
            rows={3}
            value={profile!.bio}
          />
          <Button
            disabled={invalid || pristine}
            loading={submitting}
            positive
            content='Update profile'
            fluid
          />
        </Form>
      )}
    />
  );
};

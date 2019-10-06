import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import {
  combineValidators,
  isRequired,
  createValidator,
  composeValidators
} from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const isValidEmail = createValidator((message: any) => {
  return (value: string) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  };
}, "Invalid email address");

const validate = combineValidators({
  email: composeValidators(isRequired("email"), isValidEmail)(),
  password: isRequired("password")
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          ></Header>
          <Field
            name="email"
            type="email"
            component={TextInput}
            placeholder="Email"
          ></Field>
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          ></Field>
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text='Invalid email or password'></ErrorMessage>
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            positive
            color='teal'
            content="Login"
            fluid
          ></Button>
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    ></FinalForm>
  );
};

export default LoginForm;

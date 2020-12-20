import React from "react";
import SigninForm from "../../../../containers/User/Auth/SigninForm/SigninForm";

const LoginPage = (props) => {
  return (
    <React.Fragment>
      <SigninForm {...props} />
    </React.Fragment>
  );
};

export default LoginPage;

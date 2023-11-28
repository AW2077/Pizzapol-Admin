import React from 'react';
import './Login.css';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp';

const Login = () => {

  return (
    <div>
      <SignIn/>
      <SignUp/>
    </div>
  );
};

export default Login;

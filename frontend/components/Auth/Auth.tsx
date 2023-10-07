import React, {useState} from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Auth = () => {  

  const [hasAccount, setHasAccount] = useState(false);

  if (!hasAccount) {
    return (<SignUp setHasAccount={setHasAccount}/>);
  } else {
    return (<SignIn setHasAccount={setHasAccount}/>);
  }
};

export default Auth;
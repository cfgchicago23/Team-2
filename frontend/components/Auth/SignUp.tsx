import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signUpUser } from '../../firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';

type SignUpProps = {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = (props: SignUpProps) => {  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userOpen, setuserOpen] = useState(false);
  const [userValue, setuserValue] = useState("");
  const [user, setUser] = useState([
    { label: "Girl", value: "Girl" },
    { label: "Leader", value: "Leader" },
    { label: "Admin", value: "Admin" },
  ]);

  const handleSignUp = () => {
    if (name === "") {
      setError("name cannot be empty");
    } else if (password !== confirmPassword) {
      setError("passwords do not match");
    } else if(userValue === "") {
      //error check that user type is not empty
      setError("Please select user type")
    }
    else {
      signUpUser(name, email, password, userValue, setError);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        value={name}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.TextInput}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.TextInput}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.TextInput}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {/* dropdown picker to select user type */}
      <View style={styles.container}>
        <DropDownPicker
              open={userOpen}
              value={userValue} //userValue
              items={user}
              style={styles.dropdown}
              setOpen={setuserOpen}
              setValue={setuserValue}
              setItems={setUser}
              placeholder="Select User Type"
              activityIndicatorColor="#5188E3"
            />
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={handleSignUp}>
          <Text
            style={styles.ButtonText}>
            Sign Up
          </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text>Already have an account? </Text>
        <Text
            style={styles.changeText} 
            onPress={(event) => {props.setHasAccount(true);}}>
            Sign In
        </Text>
      </View>
      <Text style={styles.ErrorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  changeText: {
    color: 'blue',
  },
  TextInput: {
    width: 250,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  Button: {
    width: 250,
    margin: 5,
    marginTop: 150,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  ButtonText: {
    color: 'white',
  },
  ErrorText: {
    textAlign: 'center',
    color: 'red',
  },
  dropdown: {
    width: 250,
    height: 40,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});

export default SignUp;
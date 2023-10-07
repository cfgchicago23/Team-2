import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInUser } from '../../firebase/auth';

type SignInProps = {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = (props: SignInProps) => {  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.Button}
        onPress={() => signInUser(email, password, setError)}>
          <Text
            style={styles.ButtonText}>
            Sign In
          </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text>Don't have an account? </Text>
        <Text
            style={styles.changeText} 
            onPress={(event) => {props.setHasAccount(false);}}>
            Sign Up
        </Text>
      </View>
      <Text style={styles.ErrorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  }
});

export default SignIn;
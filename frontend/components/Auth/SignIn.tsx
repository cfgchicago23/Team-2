import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { signInUser } from '../../firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';

type SignInProps = {
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignIn = (props: SignInProps) => {  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <SafeAreaView style={styles.parentContainer}>
      {/* Add an Image component at the top */}
      <Image
        source={require('../../constants/images/CFGLogoNoBkg.png')} // Adjust the path to your image
        style={styles.logo}
      />

      <Text style={styles.signInText}>Welcome!</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
  },
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.background,
  },
  signInText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 60,
  },
  changeText: {
    color: colors.pink,
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
    backgroundColor: colors.magenta,
    borderRadius: 10,
  },
  ButtonText: {
    color: 'white',
  },
  ErrorText: {
    textAlign: 'center',
    color: 'red',
  },
  // Add your image style here
  logo: {
    width: 400,
    height: 150,
    //put logo at top of screen
    position: 'absolute',
    top: 160,
  },
});

export default SignIn;
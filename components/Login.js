import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import GoogleLogin from "./GoogleLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigation=useNavigation()
    
  const onSubmit = async() => {
    console.log("onSubmit");
    console.log("email",  email);
    console.log("password",  password);
    // setSubmit(true);
    const user = await AsyncStorage.getItem("@user")
    console.log("user", JSON.parse(user))

    if(JSON.parse(user).email===email && JSON.parse(user).password===password)
      navigation.navigate('Todo')
    else
      Alert.alert("FAiled", "Email or password does not match")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Here</Text>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {submit && !email && (
          <Text style={styles.errorText}>Email Required</Text>
        )}
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {submit && !password && (
          <Text style={styles.errorText}>Password Required</Text>
        )}
      </View>
      <Button color="#3740FE" onPress={onSubmit} title="Submit" />
          <Text style={styles.footerText}
            onPress={()=>navigation.navigate('Signup')}
          >
        Don't have account? Click here to signup
      </Text>
      <GoogleLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
    borderWidth: 5,
    borderColor: "lightgrey",
    borderRadius: 10,
  },
  inputBox: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  heading: {
    fontSize: 30,
    color: "lightgrey",
    fontWeight: "bold",
    marginBottom: 10,
  },
  footerText: {
    color: "blue",
    marginTop: 10,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

export default Login;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigation=useNavigation()
  
  const isAlredyThere = async() => {
    const user = await AsyncStorage.getItem("@user")
    if (user)
      navigation.navigate("Todo")
  }
  useEffect(() => {
    isAlredyThere()
  }, [])
  
  const onSubmit = () => {
      console.log("onSubmit");
    setSubmit(true)
    if (email && password) {
      AsyncStorage.setItem("@user",JSON.stringify({email,password}))
      Alert.alert("success", "registered")
      navigation.navigate("Login")
    }

    //refresh the users Input
    setEmail("")
    setName("")
    setPassword("")

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup Here</Text>
      <View>
        <Text style={styles.label}>UserName</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
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
          <Button
              color="#3740FE"
              onPress={onSubmit}
              title="Submit"
          />
          <Pressable>
          <Text style={styles.footerText}
              onPress={() => {
                  console.log('navigation')
                navigation.navigate('Login')
            }}
          >
          Already Registered? Click here to login
          </Text>
          </Pressable>
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

export default Signup;

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import TodoList from "./TodoList";
import { useNavigation } from "@react-navigation/native";

function Todo() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);
  const [update,setUpdate]=useState(-1)
  const [user,setUser]=useState()
  const navigation=useNavigation()

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todo");
        setTask(JSON.parse(jsonValue))
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };

  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem("@user")
    setUser(JSON.parse(user))
  }

  useEffect(() => {
    getData();
    getUserFromStorage();
  }, []);

  console.log("user",user)

  const storeData = async (value) => {
    try {
      if (value !== [])
        await AsyncStorage.setItem("todo", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    storeData(task);
  }, [task]);

  const addTodo = async () => {
    console.log("taskdata", title);
    console.log("taskdata", details);
    if (title && details) {
      Alert.alert("Success", "New Task Added");
      setTask((item) => [
        ...item,
        {
          title: title,
          details: details,
        },
      ]);

    } else {
      Alert.alert("Warning", "Title or Details field is Empty");
    }
  };

  const onDelete = (index) => {
    setTask(task.filter((data,i) => index !== i))
    Alert.alert("Success","Successfully deleted")
  }

  const onUpdate = (index) => {
    setUpdate(index)
  }

  return (
    <ScrollView style={{height:"90%"}}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.heading}>Welcome to To-do</Text>
          <Button title="Signout"
            onPress={async() => {
              await AsyncStorage.removeItem("@user")
              navigation.navigate("Login")
            }}
          />
        </View>
      <Text style={styles.inputTitle}>Title</Text>
      <TextInput
        type="text"
        placeholder="Enter heading"
        style={styles.inputField}
        value={title}
        onChangeText={(newText) => setTitle(newText)}
      />
      <Text style={styles.inputTitle}>Task Details</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder="Task Details"
        style={styles.inputField}
        value={details}
        onChangeText={(newText) => setDetails(newText)}
      />

      <Button onPress={addTodo} title="Add Task" style={styles.btn} />

        <View style={styles.taskContainer}>
        {task?.map((data,index) => (
          (index === update)
            
          ?

          <>
            <Text style={styles.inputTitle}>Title</Text>
            <TextInput
              type="text"
              placeholder="Enter heading"
              style={styles.inputField}
              defaultValue={data.title}
              onChangeText={(newText) => setTitle(newText)}
            />
            <Text style={styles.inputTitle}>Task Details</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Task Details"
              style={styles.inputField}
              defaultValue={data.details}
              onChangeText={(newText) => setDetails(newText)}
            />

              <Button
                onPress={() => {
                  setTask((prev) => prev.map((upItem,index) => {
                    if (index === update) {
                    upItem.title = title
                    upItem.details=details
                  }
                  return upItem
                  }))

                  setUpdate("")

                  Alert.alert("Success","Successfully Updated")
                }}
                title="Save"
                style={styles.btn} />
            </>
        :
        
          <View style={styles.task} key={index}>
            <Text style={styles.inputTitle}>{data.title}</Text>
            <View
              style={{
                borderBottomColor: "black",
                marginTop: 5,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={{ marginTop: 5 }}>{data.details}</Text>
            <View style={{ display: "flex", flexDirection: 'row', gap: 5 }}>
              <Button
                title="UPDATE"
                onPress={() => onUpdate(index)}
              />
              <Button
                title="DELETE"
                onPress={() => onDelete(index)}
              />
            </View>
          </View>
        
        ))}
        </View>
      {/* <TodoList /> */}
    </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    padding: 25,
  },
  head: {
    display: "flex",
    alignItems: "center",
    flexDirection:"row",
    justifyContent:'space-between'
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  inputField: {
    width: 300,
    fontSize: 15,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 10,
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  taskContainer: {
    display: "flex",
    // flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  task: {
    // backgroundColor: 'lightblue',
    borderWidth: 2,
    borderColor: "thistle",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
 
});

export default Todo;

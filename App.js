import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Todo from './components/Todo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './components/TodoList';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='home'
            component={Todo}
          />
          <Stack.Screen
            name='todo-list'
            component={TodoList}
          />
        </Stack.Navigator>
        {/* <Todo /> */}
        <StatusBar style="auto" />

      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

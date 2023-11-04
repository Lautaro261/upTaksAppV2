import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

if (__DEV__) {  
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: "http://192.168.100.10:4000/"
})

const authLink = setContext(async(_, {headers})=>{
  const token = await AsyncStorage.getItem('token')

  return{
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


export default function App() {

  const Stack = createStackNavigator();
  return (
    <ApolloProvider client={client}>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Register' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Register" component={Register}/>

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </ApolloProvider>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#757474',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { MIPORT } from "@env"


import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Proyectos from './components/Proyectos';
import NuevoProyecto from './components/NuevoProyecto';
import Proyecto from './components/Proyecto';



if (__DEV__) {  
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: MIPORT
})

const authLink = setContext(async(_, {headers})=>{

  //const token = await AsyncStorage.getItem('token')
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzJlZGY0MDcyZTgzMDdmYTg0ZTdlMyIsImVtYWlsIjoiTmFodWVsQGdtYWlsLnhvbSIsIm5vbWJyZSI6Ik5haHVlbCIsImlhdCI6MTcwMDI1ODI1NiwiZXhwIjoxNzAwMjcyNjU2fQ.MOhS-gTuEdP59MpAarzB33X6YfkAZyd2vrM3n9fA_hk"
  console.log('29', token)

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
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Proyectos" component={Proyectos}/>
          <Stack.Screen name="NuevoProyecto" component={NuevoProyecto}/>
          <Stack.Screen name="Proyecto" component={Proyecto}/>
        
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

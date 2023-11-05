import React, { useState } from "react";
//import { Text } from "react-native";
import { Text, Box, Button, Input, FormControl, useToast, VStack, Center, Heading } from "native-base"
import { useNavigation } from "@react-navigation/native";
import { useQuery, gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GET_TEST = gql`
query GetTest {
  saludo
} 
`
const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput) {
  autenticarUsuario(input: $input) {
    token
  }
}
` 

const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]=useState("");
    const [mensaje, setMensaje] = useState(null);
    const navigation = useNavigation();
    const toast = useToast();


    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)
    const { data, loading, error } = useQuery(GET_TEST)
    console.log(data)


    const mostrarAlerta = ()=>{
        toast.show({
            description: mensaje,
            isClosable: true,
            duration: 5000
        })
    }

    const handlerSubmit = async()=>{

        if(email === "" || password === ""){
            setMensaje("Todos los campos son obligatorios");
            mostrarAlerta("Todos los campos son obligatorios")
            return
        }

        if(password.length<4){ /* cambiar a 6 */
            setMensaje("El password debe tener al menos 6 caracteres")
            mostrarAlerta("El password debe tener al menos 6 caracteres");
            return
        }

        try {
            const { data } = await autenticarUsuario({
                variables:{
                    input:{
                        email,
                        password
                    }
                }
            })
            console.log("RESPUESTA",data)
            const { token } = data.autenticarUsuario
            console.log("token: ", token)
            navigation.navigate("Proyectos")

        } catch (error) {
            console.log(error.message);
            setMensaje(error.message);
            mostrarAlerta(error.message);
        }


    }

    return ( 
        <Center flex="1" backgroundColor="#e84347">
            <Box>
        <Heading>
            UpTask
        </Heading>

        <Heading>
            Sing in to continue!
        </Heading>

        <VStack>
            <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input placeholder="juan@gmail.com" onChangeText={text => setEmail(text)}/>

                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" onChangeText={text => setPassword(text)}/>
            </FormControl>

        <Button onPress={()=>handlerSubmit()}>
            Iniciar Sesión
        </Button>

        <Button onPress={()=> navigation.navigate("Home")}>
            Crear Cuenta
        </Button>
            
        </VStack>
        </Box>
        </Center>
     );
}
 
export default Login;
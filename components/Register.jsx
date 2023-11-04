import { useState } from "react";
import { Text ,Button, Input, FormControl, useToast, VStack, Center, Box, Heading} from "native-base"
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";


const NUEVA_CUENTA = gql`
    mutation crearUsuario($input: UsuarioInput) {
      crearUsuario(input: $input)
      }
    `

const Register = () => {
    const [nombre, setNombre]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [mensaje, setMensaje]= useState("");
    const toast = useToast();
    const navigation = useNavigation();
    const [crearUsuario] = useMutation(NUEVA_CUENTA);

    const mostrarAlerta=(mensaje)=>{
        toast.show({
            description:mensaje,
            isClosable: true,
            duration:5000
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
          const { data } = await   crearUsuario({
            variables:{
                input:{
                    password,
                    nombre,
                    email
                }
            }
          })
          setMensaje(data.crearUsuario)
          mostrarAlerta(data.crearUsuario)
          navigation.navigate("Login")
        } catch (error) {
            console.log(error.message)
            setMensaje(error.message)
            mostrarAlerta(error.message)
        }
    }

    return ( 
        <Center flex="1" backgroundColor="#272727">
            <Box>
                <Heading>
                    UpTask
                </Heading>
                <Heading>
                    Sing in to continue!
                </Heading>

                <VStack>
                    <FormControl>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input placeholder="Juan" onChangeText={text=>setNombre(text)}/>

                        <FormControl.Label>Email</FormControl.Label>
                        <Input placeholder="juan@gmail.com" onChangeText={text=>setEmail(text)}/>

                        <FormControl.Label>Contraseña</FormControl.Label>
                        <Input type="password" onChangeText={text=>setPassword(text)}/>
                    </FormControl>

                    <Button onPress={()=>handlerSubmit()}>
                        Crear Cuenta
                    </Button>
                </VStack>
            </Box>

            
        </Center>
     );
}
 
export default Register;
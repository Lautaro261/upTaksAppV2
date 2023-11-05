import { useState } from "react";
import { Button, Input, FormControl, useToast, VStack, Center, Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";

const NUEVO_PROYECTO = gql`
mutation nuevoProyecto($input: ProyectoInput) {
  nuevoProyecto(input: $input) {
    nombre
    id
  }
}
`

const NuevoProyecto = () => {

    const [nombre, setNombre] = useState("")
    const [mensaje, setMensaje] = useState("")
    const navigation = useNavigation()
    const toast = useToast();
    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO)

    const mostrarAlerta = (mensaje)=>{
        console.log('se crea una alerta')
  
        toast.show({
            description: mensaje, 
            isClosable: true,
            duration:5000
        })
    }

    const handleSubmit = async()=>{
        if(nombre ===""){
            setMensaje("El nombre del proyecto es obligatorio")
            mostrarAlerta("El nombre del proyecto es obligatorio")
        }

        try {
            const { data } = await nuevoProyecto({
                variables:{
                    input:{
                        nombre,
                    }
                }
            })
            console.log(data)
            mostrarAlerta("Proyecto creado correctamente")
            navigation.navigate("Proyectos")
        } catch (error) {
            console.log(error)
            mostrarAlerta(error.message)
        }

    }

    return ( 
        <Center>
            <Box>
                <Heading>
                    Nuevo Proyecto
                </Heading>

                <VStack>
                    <FormControl>
                        <FormControl.Label>Nombre del proyecto</FormControl.Label>
                        <Input placeholder="Tienda Virtual"/>
                    </FormControl>

                    <Button onPress={()=>handleSubmit()}>
                        Crear Proyecto
                    </Button>
                </VStack>

            </Box>
        </Center>
     );
}
 
export default NuevoProyecto;
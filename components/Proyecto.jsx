import { useState } from "react";
import { Heading, Center, VStack, FormControl, Input, Box, Button, useToast} from "native-base";
import { useMutation,gql } from "@apollo/client";

const NUEVA_TAREA = gql`
mutation nuevaTarea($input: TareaInput) {
  nuevaTarea(input: $input) {
    id
    nombre
    proyecto
    estado
  }
}
`


const Proyecto = ({route}) => {
    const {id} = route.params
    console.log(route.params)
    console.log(id)
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const toast = useToast();
    const [nuevaTarea] = useMutation(NUEVA_TAREA)

    const mostrarAlerta = ()=>{
        toast.show({
            description: mensaje,
            isClosable: true,
            duration: 5000
        })
    }

    const handlerSubmit = async (event)=>{
        //event.persist()
        if(nombre === ""){
            setMensaje("Debe agregar un nombre a la tarea");
            mostrarAlerta("Debe agregar un nombre a la Tarea");
            return;
        }
        try {
            const { data } = await nuevaTarea({
                variables:{
                    input:{
                        nombre,
                        proyecto : id
                    }
                }
            })

            console.log("NUEVA TAREA:", data)
            setNombre("");
            setMensaje("Tarea creada correctamente");

        } catch (error) {
            console.log("ERROR!!!",error.message)
        }


    }

    return ( 
        <Center flex="1" backgroundColor="#e84347">
            <Box>
        <Heading>
            UpTask
        </Heading>

        <Heading>
            Tarea
        </Heading>

        <VStack>
            <FormControl>
                <FormControl.Label>Tarea</FormControl.Label>
                <Input placeholder="Nueva Tarea" onChangeText={text => setNombre(text)} value={nombre}/>

                
            </FormControl>

        <Button onPress={()=>handlerSubmit()}>
            Agregar Tarea
        </Button>


            
        </VStack>
        </Box>
        </Center>
     );
}
 
export default Proyecto;
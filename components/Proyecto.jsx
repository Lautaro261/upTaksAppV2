import { useState, useEffect } from "react";
import { 
    VStack,
     Spacer, 
     Avatar, 
     HStack, 
     Pressable, 
     Button, 
     Text, 
     ScrollView, 
     Center, 
     Box, 
     Heading,
     Icon,
     FormControl,
     Input,
     useToast
      } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useMutation,gql, useQuery } from "@apollo/client";

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

const OBTENER_TAREAS = gql`
query ObtenerTareas($input: ProyectoIDInput) {
  obtenerTareas(input: $input) {
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
    const [listData, setListData] = useState({});

         //FUNCION CIERRA FILA EN LA LISTA
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };


  //FUNCION ELIMINA UNA FILA EN LA LISTA
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  //FUNCION QUE SE EJECUTA AL ABRIR UNA FILA
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  //FUNCION AL PRESIONAR UN PROYECTOS
  const handlerProyecto=(item)=>{
    //console.log('Abriendo el proyecto', item.id)
    navigation.navigate("Proyecto", item)
  }

  //FUNCION DE BOTON "NUEVO PROYECTO"
  const handlerNuevoProyecto=()=>{
    //console.log("Linea 99", "quieres crear un nuevo proyecto")
    navigation.navigate("NuevoProyecto")
  }

    const [nuevaTarea] = useMutation(NUEVA_TAREA)
    const { data, loading, error } = useQuery(OBTENER_TAREAS, {
        variables:{
            input:{
                proyecto: id
            }
        }
    })
    console.log("SOY DATA",data);

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

    if (loading){
        return <Text>Cargando... </Text>
    }

    useEffect(() => {
        if (data) {
          console.log("Me actualicé", data.obtenerTareas);
          setListData(data.obtenerTareas);
        }
      }, [data]);

    const renderItem = ({ item, index }) => (
        <Box key={index}>
          <Pressable onPress={() => handlerProyecto(item)} _dark={{bg: 'coolGray.800'}} _light={{bg: 'white'}}>
            <Box pl="4" pr="5" py="2">
              <HStack alignItems="center" space={8}>
                <Avatar size="48px" source={{ uri: item.avatarUrl }} />
                
                <VStack bg="amber.100">  
                  <Text color="blue.900" _dark={{color: 'warmGray.50'}} bold>{item.nombre}</Text>
                  {/* <Text color="coolGray.600" _dark={{color: 'warmGray.200'}}>{item.recentText}</Text> */}
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="coolGray.800" _dark={{color: 'warmGray.50'}} alignSelf="flex-start">{item.estado}</Text>
              </HStack>
            </Box>
          </Pressable>
        </Box>
      );
    
      const renderHiddenItem = (data, rowMap) => (
        <HStack flex="1" pl="2">
          <Pressable w="70" ml="auto" cursor="pointer" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{opacity: 0.5}}>
            <VStack alignItems="center" space={2}>
              <Icon as={<Entypo name="dots-three-horizontal" />} />
              <Text fontSize="xs" fontWeight="medium" color="coolGray.800">More</Text>
            </VStack>
          </Pressable>
          <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{opacity: 0.5}}>
            <VStack alignItems="center" space={2}>
              <Icon as={<MaterialIcons name="delete" />} color="white" size="xs"/>
              <Text color="white" fontSize="xs" fontWeight="medium">Delete</Text>
            </VStack>
          </Pressable>
        </HStack>
      );

    return ( 
        <Center flex="1" backgroundColor="#e84347">
            <Box safeArea flex="1">

        <Heading>
            Tareas
        </Heading>

        <VStack>
            <FormControl>
                <FormControl.Label>Tarea</FormControl.Label>
                <Input placeholder="Nueva Tarea" onChangeText={text => setNombre(text)} value={nombre}/>

                
            </FormControl>

        <Button onPress={()=>handlerSubmit()}>
            Agregar Tarea
        </Button>

        <Box bg="white" safeArea flex="1">
          <Heading>{`Tareas: ${route.params.nombre}`}</Heading>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <SwipeListView
              data={listData}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-130}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          {/* </ScrollView> */}
        </Box>


            
        </VStack>
        </Box>
        </Center>
     );
}
 
export default Proyecto;
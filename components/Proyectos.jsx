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
      } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect} from "react";

const GET_PROYECTOS = gql`
query obtenerProyectos {
    obtenerProyectos {
        id
        nombre
        creado
        }
    }
`

const Proyectos = () => {
   /*  const data = [{
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        nombre: 'Cosito',
        creado: '21/10/2023',
        recentText: 'Good Day!',
        avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      }, {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        nombre: 'Sujita Mathur',
        creado: '11:11 PM',
        recentText: 'Cheer up, there!',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU'
      }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        nombre: 'Anci Barroco',
        creado: '6:22 PM',
        recentText: 'Good Day!',
        avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg'
      }, {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        nombre: 'Aniket Kumar',
        creado: '8:56 PM',
        recentText: 'All the best',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU'
      }, {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        nombre: 'Kiara',
        creado: '12:47 PM',
        recentText: 'I will call today.',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU'
      }]; */

    const navigation = useNavigation()
    const [listData, setListData] = useState({});
    const { data, loading, error } = useQuery(GET_PROYECTOS)


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


  useEffect(() => {
    if (data) {
      console.log("Me actualicé", data.obtenerProyectos);
      setListData(data.obtenerProyectos);
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
            <Text fontSize="xs" color="coolGray.800" _dark={{color: 'warmGray.50'}} alignSelf="flex-start">{item.creado}</Text>
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
    <Center flex="1">
      <Box safeArea flex="1">
        <Button onPress={()=> handlerNuevoProyecto()}>
          Nuevo Proyecto
        </Button>

        <Text>Selecciona un Proyecto</Text>

        <Box bg="white" safeArea flex="1">
          <Heading>Inbox</Heading>
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
      </Box>
    </Center>
     );
}
 
export default Proyectos;
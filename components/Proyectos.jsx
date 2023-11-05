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
import { useState } from "react";

const GET_PROYECTOS = gql`
query obtenerProyectos {
    obtenerProyectos {
        nombre
        id
        }
    }
`

const Proyectos = () => {
    const data = [{
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        fullName: 'Afreen Khan',
        timeStamp: '12:47 PM',
        recentText: 'Good Day!',
        avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      }, {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        fullName: 'Sujita Mathur',
        timeStamp: '11:11 PM',
        recentText: 'Cheer up, there!',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU'
      }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        fullName: 'Anci Barroco',
        timeStamp: '6:22 PM',
        recentText: 'Good Day!',
        avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg'
      }, {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        fullName: 'Aniket Kumar',
        timeStamp: '8:56 PM',
        recentText: 'All the best',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU'
      }, {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        fullName: 'Kiara',
        timeStamp: '12:47 PM',
        recentText: 'I will call today.',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU'
      }];

    const navigation = useNavigation()
    const [listData, setListData] = useState(data);
    //const { data, loading, error } = useQuery(GET_PROYECTOS)


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



  const renderItem = ({ item, index }) => (
    <Box key={index}>
      <Pressable onPress={() => console.log('You touched me')}>
        <Box>
          <HStack>
            <Avatar size="48px" source={{ uri: item.avatarUrl }} />
            <VStack>
              <Text>{item.fullName}</Text>
              <Text>{item.recentText}</Text>
            </VStack>
            <Spacer />
            <Text>{item.timeStamp}</Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1}>
      <Pressable cursor="pointer" onPress={() => closeRow(rowMap, data.item.key)}>
        <VStack>
          <Icon as={<Entypo name="dots-three-horizontal" />} />
          <Text>More</Text>
        </VStack>
      </Pressable>
      <Pressable cursor="pointer" onPress={() => deleteRow(rowMap, data.item.key)}>
        <VStack alignItems="center">
          <Icon as={<MaterialIcons name="delete" />} />
          <Text>Delete</Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Center flex={1}>
      <Box>
        <Button>
          <Text>Nuevo Proyecto</Text>
        </Button>

        <Text>Selecciona un Proyecto</Text>

        <Box>
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
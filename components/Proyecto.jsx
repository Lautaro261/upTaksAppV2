import { Heading } from "native-base";

const Proyecto = ({route}) => {
    console.log(route.params)
    return ( 
        <>
        <Heading>{route.params.nombre}</Heading>
        </>
     );
}
 
export default Proyecto;
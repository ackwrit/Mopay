import { StyleSheet } from "react-native";

export const stylemyfactureglobal = StyleSheet.create({
    container : {
        backgroundColor:"white",
        
        marginTop : 10,
        alignSelf :"stretch",
        width : "100%",
        borderRadius : 20,
        borderWidth : 1,
        borderColor : "black",
        paddingRight : 15,
        height : 80,
        paddingVertical : 10,
         borderLeftColor : "orange",
        borderLeftWidth : 15,
        justifyContent :"space-between"
        

    },
    header_card : {
        flexDirection : "row",
        justifyContent :"space-between",
        alignItems :"flex-start",
        marginLeft : 10,
        
       
    
    },
    pastille : {
       backgroundColor :"#FFAA66",
       padding : 5,
       borderRadius : 20,
       flexDirection :"row"
       
    },
    content_card:{
        flexDirection : "row",
        justifyContent :"space-between",
        alignItems :"flex-end",
        marginLeft : 10,
        
    }

});
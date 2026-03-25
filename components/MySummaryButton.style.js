import { StyleSheet } from "react-native";


export const stylesSummaryButton = StyleSheet.create({
    container : {
        backgroundColor :"#0A6FB8",
        height : 80,
        borderRadius : 20,
        borderColor : "black",
        borderWidth : 1,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5,
        flexDirection :"row",
        justifyContent :"space-between",
        alignItems: "center"
        
    },
    element_start : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems :"center"

    },
    element_cercle :{
        marginRight : 15,
        marginLeft : 5,
         width: 60,
        height: 60,
        borderRadius: 40, // moitié = cercle parfait
        backgroundColor: "#3CB54A",
        justifyContent: "center",
        alignItems: "center",
        borderColor : "black",
        borderWidth : 1
        

    },
    element_text : {
        color :"white",
        fontFamily :"Roboto",
        fontSize : 24,
        fontWeight : "medium"
    },

     element_cercle_right :{
        marginRight : 15,
        marginLeft : 5,
         width: 60,
        height: 60,
        borderRadius: 40, // moitié = cercle parfait
        backgroundColor: "#E8D41E",
        justifyContent: "center",
        alignItems: "center",
        borderColor : "black",
        borderWidth : 1
        

    },



});
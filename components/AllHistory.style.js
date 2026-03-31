import { StyleSheet } from "react-native";

export const styleAllHistory = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        marginTop : 80,
        alignItems :"center"
    },
    header: {
        flexDirection :"row",
        justifyContent : "space-between",
        alignItems :"center",
        width :"100%"

    },
    circle :{
        width : 50,
        height :50,
        backgroundColor :"#0A6FB8",
        justifyContent: "center",
        alignItems : "center",
        borderRadius : 60,
        borderColor :"black",
        borderWidth : 1

    },
    choice : {
        margin : 10,
        paddingHorizontal : 10,
        width : "100%",
        flexDirection :"row",
        justifyContent :"space-evenly",
        alignItems :"center",
        backgroundColor :"white",
        height : 40,
        borderRadius :20,
        borderColor :"black",
        borderWidth : 1,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity:  0.19,
        shadowRadius: 5.62,
        elevation: 6


    },
    separator : {
        height : "100%",
        borderColor : "#ccc",
        borderWidth : 1,
        

    },
    scroll : {
        margin : 5,
   
        flex : 1,
        width : "100%",
        padding : 10

    }

});
import { StyleSheet } from "react-native";

export const styleAllClient = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "space-between",
        alignItems :"center",
       



    },
    header : {
        marginTop : 70,
       
        width : "100%",
        padding : 10,
        justifyContent : "space-evenly",
        
    },

    banner : {
        flexDirection :"row",
        justifyContent : "space-between",
        alignItems : "center",
        marginBottom : 10,

    },
    search :{
        height : 40,
        width : "100%",
        backgroundColor :"white",
        borderRadius : 20,
        borderColor :"black",
        borderWidth : 1,
        marginBottom : 10
    },
    texte :{
        fontSize : 24,
        color :"black",
        fontWeight:"condensedBold"
    },
    icone : {
        fontSize : 25,
        fontWeight : "thin",
        color : "white",
    },
    cercle : {
        height : 50,
        width:50,
        backgroundColor :"#0A6FB8",
        justifyContent : "center",
        alignItems :"center",
        borderRadius : 60,
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
    scroll :{
        flex: 1,
        width : "100%",
        padding : 10
    }



});
import { StyleSheet } from "react-native";


export const styleSettingsButton = StyleSheet.create({

    container : {
        marginVertical : 10,
       paddingHorizontal : 5,
       backgroundColor :"white",
       borderColor :"black",
       borderWidth : 1,
       borderRadius : 20,
       flexDirection :"row",
       justifyContent : "space-between",
       alignItems :"center",
       height : 60,
       paddingHorizontal : 5,
       shadowColor: "#000000",
        shadowOffset: {
         width: 0,
        height: 6,
        },
        shadowOpacity:  0.21,
        shadowRadius: 6.65,
        elevation: 9

    },
    title : {
        fontSize : 16,
        fontWeight : "bold"

    },
    subtitle : {
        fontSize : 12,
        fontWeight : "light",
        color:"#64748B"

    },
    leading : {
        flexDirection : "row",
        justifyContent : "space-evenly",
        marginLeft : 10,
        alignItems :"center"

    },
    blocProfil : {
        marginLeft : 25,
        justifyContent :"space-between",
    }

});
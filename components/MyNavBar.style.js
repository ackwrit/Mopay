import { StyleSheet } from "react-native";

export const styleNav = StyleSheet.create({
    container : {
        backgroundColor : "white",
        flexDirection : "row",
        borderRadius : 20,
        width : "90%",
        marginBottom : 20,
        height : 50,
        borderColor :"black",
        borderWidth : 1,
        justifyContent : "space-evenly",
        alignItems :"center",
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10
    },
    navLabel : {
        alignItems :"center"
    }
});
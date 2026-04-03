import { StyleSheet } from "react-native";

export const styleNav = StyleSheet.create({
    container : {
        backgroundColor : "white",
        flexDirection : "row",
        borderRadius : 20,
        width : "100%",
        marginBottom : 20,
        height : 60,
        borderColor :"black",
        borderWidth : 1,
        justifyContent : "space-between",
        alignItems :"center",
        shadowColor: "#000000",
        paddingHorizontal: 10,
        shadowOffset: {
        width: 0,
        height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10
    },
    navLabel : {
        alignItems :"center",
        width: 70,
        justifyContent: "center",
    }
});
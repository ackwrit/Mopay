import { StyleSheet } from "react-native";

export const styleBoxhistory = StyleSheet.create({
    container : {
        flexDirection :"row",
        paddingVertical : 10,
        paddingHorizontal : 15,
        width : "100%",
        justifyContent :"space-between",
        alignItems :"center",
        backgroundColor :"white",
        borderColor :"black",
        borderWidth : 1,
        borderRadius : 20,
        marginTop :15 ,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity:  0.19,
        shadowRadius: 5.62,
        elevation: 6
    }
});
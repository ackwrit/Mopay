import { StyleSheet } from "react-native";

export const styleLabelHistory = StyleSheet.create({
    container : {
        flexDirection :"row",
        justifyContent :"space-between",
        margin : 10,
        padding : 10
    },
    nameText : {
        fontSize : 12,
        color : "black",
        fontWeight : "medium",
        

    },
    statusText:{
        color : "#64748B",
        fontWeight : "medium",
        fontSize : 12,


    },

     amoutText:{
        color : "#3CB54A",
        fontWeight : "medium",
        fontSize : 16,
        textAlign :"right"


    }

});
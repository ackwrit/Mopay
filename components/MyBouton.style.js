import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        borderRadius : 20,
        borderColor : "black",
        borderWidth : 1,
        height : 50,
        width : 250,
        justifyContent : "center",
        alignItems : "center",
        
        padding : 10,
        backgroundColor :"#3CB54A",
        elevation : 10,
        shadowRadius : 20,
        shadowColor : "grey",
        shadowOffset :  { width: 4, height: 4 },
        shadowOpacity : 0.4

    },

    texte : {
        fontSize : 24,
        fontFamily :"Roboto",
        fontWeight :"bold",
        color : "white"




    }

});

export {styles}
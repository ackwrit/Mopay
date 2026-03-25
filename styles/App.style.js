import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        backgroundColor : "#F7F9FB",
    
        alignItems : "center",
        height : "100%",
        width :"100%",
        padding :10

    },
    title : {
        fontSize: 24,
        color : "black",
        fontWeight :"bold",
        fontFamily :"Robot serif",
        marginBottom : 20,
    },
    subtitle : {
        color :"#64748B",
        fontFamily :"Robot serif",
        fontSize: 16,
        marginBottom :20,
        marginTop : 10

    },

    logo : {
          width: 200,
            height: undefined,
            aspectRatio: 1,
            resizeMode: "contain"
    },

    elementImage : {
           width: "100%",
    height: undefined,
    aspectRatio: 1.5,   // adapte le ratio de ton image
    justifyContent: "flex-start",
    marginBottom : 50,
    padding : 10
    
    
        
      
        
        
        
    },
    bloc_message : {
        justifyContent : "center",
        alignItems:"center"

    },


     bloc_interactif : {
        flex : 1,
        marginTop : 20,
        marginBottom : 20,
        justifyContent :"space-around",
        alignItems : "center"

        
     },
     splash_image : {
        height : 350,
        width : 350

     },

     splash_container : {
        flex : 1,
        padding : 20,
        
        alignItems :"center"
     },
       progressBar: {
        width: '80%',
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50',
  },




});
 export {styles}

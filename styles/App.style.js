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
            resizeMode: "contain",
            
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
  dashboardImageBackground : {
    flex : 1,
    justifyContent : 'space-between',
    alignItems :"center"
    
  },

   bloc_dashboard: {
    
   
    width : "100%",
    
 
    justifyContent : "space-around",
    paddingHorizontal : 10,
    fontFamily :'Roboto-condensed',
    fontWeight :'medium',
    fontSize : 16,
    color :"black",
    flex : 1,
    marginBottom : 10
    

  },
  history_dashboard: {
    flex : 2,
    margin : 10,
    width : "90%",
    backgroundColor : "#F7F9FB",
    borderRadius : 20,
    borderColor :"black",
    borderWidth : 1,
    padding : 10,
    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 3,
    },
    shadowOpacity:  0.18,
    shadowRadius: 4.59,
    elevation: 5
    
    

  },
  bottom_dashboard: {
    height : 90,
    

    
    backgroundColor :"blue",

  },

  typepaimeentContainer : {
    flexDirection :"row",
    justifyContent : "space-evenly",
    alignItems : "center"
  },

  header_bloc_history : {
    flexDirection :"row",
    alignItems :"baseline",
    justifyContent :"space-between"
  }





  dashboardImageBackground : {
    flex : 1,
    justifyContent : 'space-between',
    alignItems :"center"
    
  },

   bloc_dashboard: {
    
   
    width : "100%",
    
    backgroundColor : "red",
    justifyContent : "space-around",
    paddingHorizontal : 10,
    fontFamily :'Roboto-condensed',
    fontWeight :'medium',
    fontSize : 16,
    color :"black",
    flex : 1
    

  },
  history_dashboard: {
    flex : 2,
    backgroundColor : "blue",
    
    color :"red",

  },
  bottom_dashboard: {
    height : 90,
    

    
    backgroundColor :"blue",

  }





});
 export {styles}

import { View,Text, TouchableOpacity } from "react-native";
import { stylemyfactureglobal } from "./MyFactureGlobal.style";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getClients, getonlyclients } from "../services/database";

export function MyFactureGlobal({item}){
    const [idclient,setidclient] = useState();
    useEffect(()=>{
        recuperationClient();

    },[]);

    async function recuperationClient(){
       
        const tabClient = await getonlyclients(item.clientId);
        
        const parseClient = tabClient[0];
        


        setidclient(parseClient);
        
    }

   const formatDate = new Date(item.createdAt).toLocaleDateString("fr-FR",{
    day: "2-digit",
    month: "long",
    year: "numeric"

   });
   
    return (
        <View style={{
            backgroundColor:"white",
        
        marginTop : 10,
        alignSelf :"stretch",
        width : "100%",
        borderRadius : 20,
        borderWidth : 1,
        borderColor : "black",
        paddingRight : 15,
        height : 80,
        paddingVertical : 10,
         borderLeftColor : (item.isFinished ===0)?"orange":"green",
        borderLeftWidth : 15,
        justifyContent :"space-between"

        }}>
        <View style={stylemyfactureglobal.header_card}>
            <View>
            <Text>{(idclient)?idclient.name:"chargement..."}</Text>
            <Text>{formatDate}</Text>

            </View>
            <View style={{
                 backgroundColor :(item.isFinished ===0)?"#FFAA66":"green",
                padding : 5,
                borderRadius : 20,
                flexDirection :"row"

            }}>
                <Text>{(item.isFinished===0)?"En cours": "Terminé"}</Text>
                <FontAwesome name={(item.isFinished===0)?"pencil":"check"} size={16} style={{marginLeft : 5}}/>

            </View>
            
            
        </View>
        <View style={stylemyfactureglobal.content_card}>
            <Text>{item.amount} Ar</Text>
              <View style={{
                borderRadius : 10,
                backgroundColor : (item.isFinished === 0)?"orange":"green",
                height : 30,
                justifyContent :"center",
                alignItems :"center",
                width : "30%",
                borderWidth : 1,
                borderColor :"black",
                

            }}>
            <TouchableOpacity>

           
          
                 <Text style={{color:"white"}}>{(item.isFinished === 0) ? "MODIFIER":"CONSULTER"}</Text>

            
             </TouchableOpacity>
             </View>
           

        </View>
        </View>
    )
}
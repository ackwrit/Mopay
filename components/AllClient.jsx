import { ScrollView, View,Text, TouchableOpacity } from "react-native";
import { styleAllClient } from "./AllClient.style";
import { MyTextInput } from "./MyTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getClients } from "../services/database";
import { useCallback, useEffect, useState } from "react";
import { MyCardClient } from "./MyCardClient";

export function AllClient(){
    const [clients,setclients] = useState([]);
    useFocusEffect(
        useCallback(()=>{
              getAllClient();

        },[])

    );
  
    const nav = useNavigation();

    function addClient(){
        nav.navigate("addclient");
    }

    function getAllClient(){
        const data = getClients();
        setclients(data);
        console.log(data);
    }
    return(
        <View style={styleAllClient.container}>
            <View style={styleAllClient.header}>
                <View style={styleAllClient.banner}>
                    <Text style={styleAllClient.texte}>Clients</Text>
                    <TouchableOpacity onPress={addClient}>
                         <View style={styleAllClient.cercle}>
                            <FontAwesome name="plus" style={styleAllClient.icone}/>
                    </View>

                    </TouchableOpacity>
                   
                    

                </View>
                
                <MyTextInput text={"Rechercher un client ..."} icon={"search"}/>

            </View>
            <View style={styleAllClient.scroll}>
                <ScrollView >
                    {
                        clients.map((item,index)=>{
                            return <MyCardClient key={item.id || index} client={item}/>

                        })
                    }
                   

            </ScrollView>

            </View>

            
        </View>
        

    );
}
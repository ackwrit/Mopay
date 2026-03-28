import { ScrollView, View,Text, TouchableOpacity } from "react-native";
import { styleAllClient } from "./AllClient.style";
import { MyTextInput } from "./MyTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getClients } from "../services/database";
import { useCallback, useEffect, useState } from "react";
import { MyCardClient } from "./MyCardClient";

export function AllClient(){
    const [search,setSearch] = useState("");
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
    const filtreClient = clients.filter((item)=> (item.name.toLowerCase()).includes(search.toLowerCase()));

  

    
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
                
                <MyTextInput text={"Rechercher un client ..."} icon={"search"} onChanged={(value)=> setSearch(value)}/>

            </View>
            <View style={styleAllClient.scroll}>
                <ScrollView >
                    {
                        filtreClient.length === 0 ?(
                            <Text>Aucun client trouvé</Text>
                        )

                        : (filtreClient.map((item,index)=>{
                            return <MyCardClient key={item.id || index} client={item}/>

                        }))
                    }
                   

            </ScrollView>

            </View>

            
        </View>
        

    );
}
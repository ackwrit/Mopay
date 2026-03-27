import { ScrollView, View,Text, TouchableOpacity } from "react-native";
import { styleAllClient } from "./AllClient.style";
import { MyTextInput } from "./MyTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function AllClient(){
    const nav = useNavigation();

    function addClient(){
        nav.navigate("addclient");
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
                   

            </ScrollView>

            </View>

            
        </View>
        

    );
}
import { View , Text } from "react-native";
import { styleNav } from "./MyNavBar.style";
import { Ionicons } from "@expo/vector-icons";

export function MyNavBar(){
    return (
        <View style={styleNav.container}>
             <View style={styleNav.navLabel}>
            <Ionicons name="home" size={20}/>
            <Text>Accueil</Text>

        </View>
           <View style={styleNav.navLabel}>
            <Ionicons name="time" size={20}/>
            <Text>Historique</Text>

        </View>
           <View style={styleNav.navLabel}>
            <Ionicons name="person" size={20}/>
            <Text>Clients</Text>

        </View>
           <View style={styleNav.navLabel}>
            <Ionicons name="settings" size={20}/>
            <Text>Paramètres</Text>

        </View>
       

        </View>
       
    );
}
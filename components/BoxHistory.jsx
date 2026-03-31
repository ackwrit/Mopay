import { View ,Text} from "react-native";
import { styleBoxhistory } from "./BoxHistory.style";

export function BoxHistory({item}){
    return (
            <View style={styleBoxhistory.container}>
                <View>
                    <Text>client : {item.clientName}</Text>
                    <Text> +261 {item.phone}</Text>
                    
                    <Text style={{color:"green"}}>{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</Text>
                </View>
                <View>
                    <Text>{(item.status === "pending"?"En attente":"Payé")}</Text>
                </View>
                
            </View>
    );
}
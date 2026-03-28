import { View ,Text} from "react-native";
import { styleCardClient } from "./MyCardClient.style";

export function MyCardClient({client}){
    const initial = client.name ? client.name.charAt(0).toUpperCase() : "?";
    function getColor(name) {
    const colors = ["#FF6B6B", "#4ECDC4", "#556270", "#C7F464", "#C44D58", "#6A5ACD"];

  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }

  return colors[sum % colors.length];
}
    return(
        <View style={styleCardClient.container}>
            <View style={{
                backgroundColor:getColor(client.name),
                height:40,
                width:40,
                borderRadius:60,
                justifyContent:"center",
                alignItems :"center",
                marginRight : 10
                }}>
                <Text>{initial}</Text>
            </View>
            <View>
            <Text>{client.name}</Text>
            <Text>+261 {client.phone}</Text>

            </View>
            
        </View>

    );

}
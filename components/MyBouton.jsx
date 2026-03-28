import { TouchableOpacity ,Text, View} from "react-native";
import { styles } from "./MyBouton.style";
import { FontAwesome } from "@expo/vector-icons";

export function MyBouton({onPress, text,icon}){
    return (
        
            <TouchableOpacity style ={styles.container} onPress={onPress}>
                <View style={{flexDirection:"row"}}>
                    <FontAwesome name={icon===null?"":icon}/>
                    <Text style={styles.texte}>{text}</Text>

                </View>
            
        </TouchableOpacity>

        
        

    );

}
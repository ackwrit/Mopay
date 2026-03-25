import { TouchableOpacity ,Text, View} from "react-native";
import { styles } from "./MyBouton.style";

export function MyBouton({onPress, text}){
    return (
        
            <TouchableOpacity style ={styles.container} onPress={onPress}>
            <Text style={styles.texte}>{text}</Text>
        </TouchableOpacity>

        
        

    );

}
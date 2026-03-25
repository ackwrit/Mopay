import { Text, TouchableOpacity } from "react-native";

export function MyTextButton({color, texte ,onPress} ){
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{color:color}}> {texte}</Text>

        </TouchableOpacity>
        
    );
}
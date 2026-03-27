import { View ,Text, ImageBackground, TouchableOpacity} from "react-native";
import background from "../assets/background.png"
import { styles } from "../styles/App.style";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function AddClient(){
    const nav = useNavigation();
    function backDashboard(){
        nav.goBack();
    }
    return(
        <ImageBackground source={background} imageStyle={{opacity:0.4}} style={styles.ImageBackground}>
              <TouchableOpacity onPress={backDashboard}>
                <View style={styles.header_Addclient}>
                <FontAwesome name="chevron-left" size={24} />
                <Text style={{fontSize:24,fontWeight:"condensedBold",marginLeft:10}}>Clients</Text>
              </View>

              </TouchableOpacity>
              
              <View>
                <Text>Contenu</Text>
              </View>

        </ImageBackground>
        
    );
}
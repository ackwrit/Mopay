import { Image, ImageBackground, Text, View } from "react-native";
import backgroundImage from "../assets/background.png"
import logo from "../assets/logo.png"
import { styles } from "../styles/App.style";



export function Dashboard(){


    return (
        <ImageBackground style={styles.dashboardImageBackground} imageStyle={{opacity:0.4}}source={backgroundImage}>
            
                <Image style={styles.logo}source={logo}/>
            
            <View style={styles.bloc_dashboard}>
                <Text>Bonjour </Text>
                <Text>Valeur</Text>
                <Text>Logo design</Text>
            
            </View>
            <View  style={styles.history_dashboard}>
            <Text>Mini Historique</Text>
            </View>
            <View style={styles.bottom_dashboard}>
            <Text >Naviagtion bar bottom</Text>
            </View>

            
            
            

        </ImageBackground>
        
    );
}



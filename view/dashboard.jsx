import { Image, ImageBackground, Text, View } from "react-native";
import backgroundImage from "../assets/background.png"
import logo from "../assets/logo.png"
import { styles } from "../styles/App.style";
import { MySummaryButton } from "../components/MySummaryButton";
import { MyButtonTypePaiement } from "../components/MyButtonTypePaiement";
import { MyNavBar } from "../components/MyNavBar";



export function Dashboard(){


    return (
        <ImageBackground style={styles.dashboardImageBackground} imageStyle={{opacity:0.4}}source={backgroundImage}>
            
                <Image style={styles.logo}source={logo}/>
            
            <View style={styles.bloc_dashboard}>
                <Text>Bonjour </Text>
                <MySummaryButton/>
                <View style={styles.typepaimeentContainer}>
                    <MyButtonTypePaiement icone={"qr-code"}/>
                    <MyButtonTypePaiement icone={"wifi-outline"}/>
                </View>
            
            </View>
            <View  style={styles.history_dashboard}>
                <View style={styles.header_bloc_history}>
                    <Text style= {styles.title}>Activité récente</Text>
                    <Text style={styles.subtitle}>Voir tout</Text>

                </View>
            
            </View>
            <MyNavBar/>

            
            
            

        </ImageBackground>
        
    );
}



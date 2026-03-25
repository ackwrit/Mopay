import { View,Text,Image ,Animated} from "react-native";
import logo from "../assets/logo.png";
import image from "../assets/image.png";
import { styles } from "../styles/App.style";
import { useEffect ,useRef} from "react";




export function Mysplashscreen({navigation}){

     const progress = useRef(new Animated.Value(0)).current;
     const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation de la barre de progression sur 3 secondes
      Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: false,
    }).start(() => {
      // Quand la barre est terminée, fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // fade out rapide
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('register'); // navigation après fade
      });
    });
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

   
    return (
        <View style={styles.splash_container}>
            <Image source={logo} style={styles.logo}/>
            <Image source={image} style={styles.splash_image}/>
             <View style={styles.progressBar}>
        <Animated.View style={[styles.progress, { width: widthInterpolated }]} />
      </View>
        </View>

    );

}
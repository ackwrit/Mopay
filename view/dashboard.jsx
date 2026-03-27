import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import backgroundImage from "../assets/background.png"
import logo from "../assets/logo.png"
import { styles } from "../styles/App.style";
import { MySummaryButton } from "../components/MySummaryButton";
import { MyButtonTypePaiement } from "../components/MyButtonTypePaiement";
import { MyNavBar } from "../components/MyNavBar";
import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { MyUser } from "../model/MyUser";
import { getLastInvoices ,getClients} from "../services/database";
import { MyLabelhistory } from "../components/MyLabelhistory";





export function Dashboard(){
    const {myUser,setMyUser} = useUser();
    const [dataFacture,setdataFacture]= useState([]);
    const [mergeInvoice,setmergeInvoice]= useState([]);
    useEffect(()=>{
        getLocal();
    
        

    },[]);

    useEffect(()=>{
        const invoiceLocal =getData();
        const dataclientLocal = getClientLocal();
        console.log("facture :",invoiceLocal);
        
        console.log("client :",dataclientLocal);
    
         const clientsMap = Object.fromEntries(dataclientLocal.map(c => [c.id, c]));
        
         const mergedData = invoiceLocal.map(inv =>({
            ...inv,
            clientName : (clientsMap[inv.clientId])?.name ?? "client inconnu"

         }));
         setmergeInvoice(mergedData);
         console.log(mergedData);
        


    },[]);
    useEffect(()=>{
        console.log('le tableau est modifié');

    },[mergeInvoice])

    async function getLocal() {
       const value = await MyUser.getStorage();
       setMyUser(value);
    

        
    }
    function getData(){
        const parserdata = getLastInvoices();
        setdataFacture(parserdata);
        console.log("facture dans la fonction :",parserdata)
        return parserdata;
       
        
        
        
    }
    function getClientLocal(){
        const dataClient = getClients();
        return dataClient;

    }
    const limitedList = mergeInvoice.slice(0,10);
    


    return (
        <ImageBackground style={styles.dashboardImageBackground} imageStyle={{opacity:0.4}}source={backgroundImage}>
            
                <Image style={styles.logo}source={logo}/>
            
            <View style={styles.bloc_dashboard}>
                <Text style={{marginBottom:10 ,fontSize:15}}>Bonjour {myUser.fullName}</Text>
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
                <ScrollView>
                       {
                        limitedList.map((item,index)=>{
                            return (
                            <View key={item.id || index}>
                               <MyLabelhistory items={item}/>
                               <View style={{ height: 1, backgroundColor: "black"}} />
                            </View>
                            )
                        })
                    }

                </ScrollView>
              
            
            </View>
            <MyNavBar/>

            
            
            

        </ImageBackground>
        
    );
}



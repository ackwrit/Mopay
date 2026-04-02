import { Image,  ScrollView, Text, View } from "react-native";
import logo from "../assets/logo.png"
import { styles } from "../styles/App.style";
import { MySummaryButton } from "../components/MySummaryButton";
import { MyButtonTypePaiement } from "../components/MyButtonTypePaiement";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../view/UserContext";
import { MyUser } from "../model/MyUser";
import { getLastInvoices ,getClients} from "../services/database";
import { MyLabelhistory } from "./MyLabelhistory";
import { useFocusEffect, useNavigation } from "@react-navigation/native";



export function MyHome(){

        const {myUser,setMyUser} = useUser();
        const [dataFacture,setdataFacture]= useState([]);
        const [mergeInvoice,setmergeInvoice]= useState([]);
        const nav = useNavigation();
        const [sum,setsum] = useState(0);
        useEffect(()=>{
            getLocal();
        
            
    
        },[]);
        useFocusEffect(
              useCallback(()=>{
            const invoiceLocal =getData();
            const s = invoiceLocal.reduce((acc,invoice)=>{
                console.log(invoice.amount);
                return acc + invoice.amount;

            },0);
            console.log("somme calculé : ",s);
            setsum(s);
            const dataclientLocal = getClientLocal();
           
        
             const clientsMap = Object.fromEntries(dataclientLocal.map(c => [c.id, c]));
            
             const mergedData = invoiceLocal.map(inv =>({
                ...inv,
                clientName : (clientsMap[inv.clientId])?.name ?? "client inconnu"
    
             }));
             setmergeInvoice(mergedData);
             console.log(mergedData);


            
    
    
        },[])

        );



    

       
    
      
    
    
        async function getLocal() {
           const value = await MyUser.getStorage();
           setMyUser(value);
        
    
            
        }
        function getData(){
            const parserdata = getLastInvoices();
            setdataFacture(parserdata);
           
            return parserdata;
           
            
            
            
        }
        function getClientLocal(){
            const dataClient = getClients();
            return dataClient;
    
        }
        const limitedList = mergeInvoice.slice(0,10);


        function navigationInvoice(){
            nav.navigate("addinvoice");

        }
        function navigationHistory(){
            nav.navigate("allhistory");

        }


    return (
    <View style={{flex:1,  alignItems:"center"}}>
            <Image style={styles.logo}source={logo}/>
            
            <View style={styles.bloc_dashboard}>
                <Text style={{marginBottom:10 ,fontSize:15}}>Bonjour {myUser.fullName ?? ""}</Text>
                <MySummaryButton sum = {sum} onPressedFact={navigationInvoice} onPressedHis={navigationHistory}/>
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

    </View>
    );
}
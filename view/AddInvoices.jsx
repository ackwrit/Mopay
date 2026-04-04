import { View ,Text, ImageBackground, TouchableOpacity, ScrollView,Modal, TextInput} from "react-native";
import { styles } from "../styles/App.style";
import background from '../assets/background.png'
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { addArticle, addInvoice, getArticles, getClients, updateArticle, updateInvoice } from "../services/database";
import { useCallback, useEffect, useState } from "react";
import { MyCardClient } from "../components/MyCardClient";
import { MyTextButton } from "../components/MyTextButton";
import {MyBouton} from "../components/MyBouton";
import {MyTextInput} from "../components/MyTextInput"
import { useUser } from "./UserContext";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { addArticleSupabase, addInvoiceSupabase } from "../services/userService";



export function AddInvoices(){
      
    const nav = useNavigation();
    const [selectClient,setselectedClient]= useState();
    const [listclient,setlistclient] = useState([]);
    const [open,setOpen] = useState(false);
    const [modalVisible,setModalVissible] = useState(false);
    const [listeArticle,setlisteArticle] = useState([]);
    const [somme,setSomme] = useState();
    const remise = 1.7;
    const [percentRemise,setPercentRemise]=useState(0);
    const [subsumTotalFacture,setsubsumTotalFacture]=useState(0);
     const [sumTotalFacture,setsumTotalFacture]=useState(0);
    const [name,setname] =useState();
    const [prix,setprix] = useState(0);
    const {myUser,setMyUser} = useUser();
    const [invoiceId,setInvoiceId] = useState();
    const [passage,setPassage] = useState(true);
   


    const [quantite,setquantite] =useState(1);
  
    
    
    
    
        useEffect(()=>{
        const clientsDB = getClients();
        setlistclient(clientsDB);

        if(checkConnexion){
             if(clientsDB && clientsDB.length > 0){
           const premierClient = clientsDB[0];
           setselectedClient(premierClient);

           // Créer la facture maintenant que le client est défini
           if(passage){
            const invoiceIdTemp = addInvoice(myUser.id, premierClient.id, 0, "pending", 0);
           setInvoiceId(invoiceIdTemp);
           setPassage(true);
            console.log("Facture créée avec id avec temp:", invoiceIdTemp);

           }
           
           
          
        }
        else {
            Alert.alert(
                "Aucun client",
                "Vous n'avez enregistrer aucun client, merci d'ajouter un client",
                [
                    {
                        text :"Ok",
                        onPress : ()=> {nav.navigate("addclient")}
                    }
                ]
            )
        }

        }
        else {
            Alert.alert(
                "Aucune connexion",
                "Vous devez accéder à un réseau internet pour créer une facture",
                [
                    {
                        text : "ok",
                        onPress : ()=>{nav.goBack()}
                        
                    }
                ]
            )

        }
        
      

       

        },[passage])

    

    useEffect(()=>{
        getAllArticles();
    },[])

    function back(){
        nav.goBack();

    }



    function selectionClient(client){
        setOpen(false);
        setselectedClient(client)


    }
    async function checkConnexion(){
    const netState = await NetInfo.fetch();
    if(netState.isConnected && netState.isInternetReachable){
            return true;
    
    }
    else {
    return false
    }
    
    }

    async function validation(){
        



         const netState = await NetInfo.fetch();
        
        
        
        const idArticle = addArticle(myUser.id,name,quantite,prix,invoiceId)
        setModalVissible(false);
        //intégrer dans la base supabase
        console.log("réseau",netState);
        if (netState.isConnected && netState.isInternetReachable === true){
            updateArticle(idArticle,{"isFinished":1})
            addArticleSupabase(idArticle,myUser.id,prix,name,quantite,invoiceId);

        }

      

        getAllArticles();
    }

    function getAllArticles(){
        
        const value = getArticles(invoiceId);
        
        setlisteArticle(value);
       
            const total = value.reduce((acc, article) => acc + (article.amount * article.quantite), 0);
            setsubsumTotalFacture(total);
            const calculRemise = Math.round(total * remise / 100);
            setPercentRemise(calculRemise);
            const globalSum = total - calculRemise;
            setsumTotalFacture(globalSum);
    }

    async function createInvoice(){
        const netState = await NetInfo.fetch();
        
        
        console.log(subsumTotalFacture);
        console.log()
       
        
       
        
        updateInvoice(invoiceId,{"clientId":selectClient.id,"amount":subsumTotalFacture,"isFinished":0});
        if(netState.isConnected && netState.isInternetReachable === true){
            updateInvoice(invoiceId,{"isFinished":1});
            addInvoiceSupabase(invoiceId,myUser.id,selectClient.id,subsumTotalFacture,"pending")

        }
        nav.navigate("dashboard");

    }
 

    

    return (
        //modal

        <ImageBackground source={background} imageStyle={{opacity:0.4}} style={{flex:1,padding:10}}>
            <Modal visible={modalVisible} animationType="slide" >
                  <ImageBackground source={background} style={{flex:1,alignItems:"center",padding:10,justifyContent:"center"}} imageStyle={{opacity:0.4}}>
                    <View style={{marginTop:70}}>
                        <Text style={styles.title}>Ajouter un article ou service</Text>

                    </View>
                    <View style={{width:"100%"}}>
                        <MyTextInput text={"Entrer le nom"}  value={name} onChanged={setname}/>

                    </View>
                    <View style={{marginTop:10, flexDirection:"row", justifyContent:"space-between",width:"100%"}}>
                         <View style={{
                        padding:10,
                        width : "40%",
                        borderRadius:20,
                        backgroundColor:"white",
                        borderColor :"black",
                        borderWidth :1
                        }}>
                        <TextInput keyboardType="numeric" placeholder="Entrer le prix" onChangeText={(item)=>{
                            const number = parseInt(item) || 0; 
                            setprix(number);
                            setSomme(number * quantite); 
                            }}/>
                        
                    </View>

                     <View style={{
                        padding:10,
                        width : "40%",
                        borderRadius:20,
                        backgroundColor:"white",
                        borderColor :"black",
                        borderWidth :1
                        }}>
                        <TextInput keyboardType="numeric" placeholder="Entrer la quantité" onChangeText={(item)=>{
                            const number = parseInt(item) || 0;
                            setquantite(number);
                            setSomme(prix * number);
                            }}/>
                        
                    </View>

                    </View>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems :"center",
                        width:"100%",
                        marginTop:20,
                        backgroundColor:"white",
                        padding : 10,
                        marginBottom : 20,
                        borderColor :"black",
                        borderWidth :1,
                        borderRadius:20,

                        }}>
                        <Text>Total</Text>
                       <Text>{somme} Ar</Text>

                    </View>
                  
                    
                    

                       
                       
                       
                       
                <MyBouton text={"Valider"} onPress={validation}/>

                  </ImageBackground>
             

            </Modal>
            

            <TouchableOpacity onPress={back}>
                 <View style={styles.header_Addinvoice}>
                <FontAwesome name="angle-left" size={30} style={{marginRight:5}}/>
                <Text style={styles.title}>Factures</Text>
            </View>

            </TouchableOpacity>
             <TouchableOpacity onPress={()=>{setOpen(!open)}}>
           
            <View style={styles.containerAddInvoice}>
               
                    <View>
                    <Text style={{fontWeight:"bold"}}>CLIENTS</Text>
                    <Text style={{marginTop:5}}>{selectClient?.name ?? "Aucun client"}</Text>
                    <Text style={{color:"grey"}}>+261 {selectClient?.phone ?? ""}</Text>
                    

                </View>
                <FontAwesome name= {open ?"angle-down" : "angle-right"} size={30}/>   
            </View>
            </TouchableOpacity>
            {open && (
                <View style={{
                    margin:5,
                    backgroundColor:"#f0f0f0",
                    borderRadius:20,
                    borderWidth: 1,
                    height : 500,
                    borderColor :"black",
                    padding : 10,
                    shadowColor: "#000000",
                    shadowOffset: {
                    width: 0,
                    height: 3,
                    },
                    shadowOpacity:  0.18,
                    shadowRadius: 4.59,
                    elevation: 5,

                    }}>
                    <ScrollView>
                    {
                        listclient.map((item,index)=>{
                            return <TouchableOpacity key={item.id || index} onPress={()=>{selectionClient(item)}}>
                                 <MyCardClient client={item}/>

                            </TouchableOpacity>
                           
                        })
                    }
                    </ScrollView>
                </View>
            )}

            {
                !open && (
                    <View style={{
                        flex:1,
                        backgroundColor:"#F7F9FB", 
                        margin:10,
                        borderRadius : 20,
                        borderWidth : 1,
                        borderColor :"black",
                        padding : 10
                        }}>
                <View style={{alignItems:"center",marginVertical:5}}>

                    <Text style={styles.title}>Article/Service</Text>

                </View>
                <View style={{height:"40%",padding:10,marginBottom:5}}>
                    <ScrollView>
                        {
                            listeArticle.map((item,index)=>{
                                return <View key={item.id|| index} style={
                                    {
                                        flexDirection :"row",
                                        justifyContent :"space-between",
                                        alignItems :"center",
                                        backgroundColor :"white",
                                        margin : 5,
                                        paddingHorizontal : 5,
                                       
                                        borderRadius : 15,
                                        borderColor :"black",
                                        borderWidth : 1,
                                        height : 60
                                        
                                    }
                                }>
                                    <Text>{item.name}</Text>
                                    <Text>{item.amount * item.quantite} Ar</Text>
                                </View>

                            })
                        }

                    </ScrollView>
                    
                </View>
                <MyTextButton color={"blue"} texte={"+ ajouter article/service"} onPress={()=>setModalVissible(true)}/>
                <View style={{
                    marginTop:5,
                    backgroundColor:"white",
                    height:"20%",
                    justifyContent:"space-around",
                    padding:10,
                    borderRadius : 20,
                    borderWidth : 1,
                    borderColor :"black"

                    }}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{color:"grey"}}>Sous total</Text>
                        <Text>{subsumTotalFacture} Ar</Text>

                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{color:"grey"}}>Frais de service</Text>
                        <Text>{percentRemise} Ar</Text>

                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>Total à payer</Text>
                        <Text>{subsumTotalFacture} Ar</Text>

                    </View>
                    
                    
                    
                </View>
                <View style={{width :"100%",alignItems:"center",marginTop:10}}>
                    <MyBouton text={"Créer la facture"} onPress={createInvoice}/>

                </View>
                <View style={{
                    width :"100%",
                    alignItems:"center",
                    marginTop:5,
                    backgroundColor:"#3CB54A",
                    height:35,
                    justifyContent :"center",
                    flexDirection :"row",
                    borderRadius : 20,
                    borderColor :"black",
                    borderWidth : 1
                    }}>
                        <FontAwesome name="check-circle" size={20} color={"white"}/>
                        

                    
                    <Text style={{marginLeft:5,color:"white"}}>Recevez {sumTotalFacture} Ar sur votre compte mobile</Text>
                    
                </View>

                

                
                
                
                    </View>

                )
            }

             

            


            
        </ImageBackground>
    );
}
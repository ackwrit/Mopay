import {supabase} from './supabase';


export async function getUser(id){
    return await supabase.from('USERS').select("*").eq("id",id);


}

export async function addClientSupabase(userId,clientID,name,phone) {
    const date = new Date();
    const {data,error} = await supabase.from("CLIENTS").insert([
        {
            id :clientID,
            userID : userId,
            name : name,
            phone : phone,
            created_at:date

        }
    ]);
    if(error){
        console.log(error);
    }else {
        console.log("reussis")
    }
    
}

export async function addArticleSupabase(idArticle,userId,amount,name,quantite,idFacture){
    const {data,error} = await supabase.from("ARTICLES").insert([
        {
            
            id :idArticle,
            userID : userId,
            name : name,
            amount : amount,
            quantite:quantite,
            idFacture : idFacture

        }
        

    ]);
    if(error ){
        console.log(error);
    } else {
        console.log("reussit");
    }

}

export async function addInvoiceSupabase(idFacture,userId,clientId,amount,status){
    const date = new Date();


   
        
    const {data,error} = await supabase.from("FACTURES").insert([
        {
            
            id :idFacture,
            userId : userId,
            clientId : clientId,
            amount : amount,
            status:status,
            createdAt : date

        }
        

    ]);
    if(error ){
        console.log(error);
    } else {
        console.log("reussit");
    }

}

export async function updateUserSupabase(idUser,fields){
    console.log("champs fields",fields)
    
   
    
    const {data,error}= await supabase.from("USERS").update(
        fields
    ).eq("id",idUser); 
    if(error){
        console.log(error);
    }else {
        console.log("réussit")
    }   

}

      
      
      
      
      
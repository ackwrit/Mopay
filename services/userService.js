import {supabase} from './supabase';


export async function getUser(id){
    return await supabase.from('USERS').select("*").eq("id",id);


}

export async function addClientSupabase(userId,clientID,name,phone) {
    date = new Date();
    await supabase.from("USERS").insert([
        {
            id :clientID,
            userID : userId,
            name : name,
            phone : phone,
            created_at:date

        }
    ])
    
}

      
      
      
      
      
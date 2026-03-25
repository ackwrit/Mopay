import {supabase} from './supabase';


export async function getUser(id){
    return await supabase.from('USERS').select("*").eq("id",id);


}

      
      
      
      
      
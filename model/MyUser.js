
import { supabase } from "../services/supabase";




export class MyUser {
    constructor({
    id = null,
    mail,
    fullName = null,
    phone = null,
    createdAt = null,
    

    }){
        this.id = id;
        this.mail = mail;
        this.fullName = fullName;
        this.phone = phone;
        this.createdAt = createdAt;
      

    }
    async register(password){
        const {data,error} = await supabase.auth.signUp({
            email : this.mail,
            password : password
        });
     
          if(error) throw error;
         
          //recuperation uuid
          const id = data.user.id;
          const token = data.session.access_token;

          const {error: insertEror} = await supabase.from("USERS").insert(
            [
                {
                    id: id,
                    mail: this.mail,
                    phone : this.phone,
                    full_name:this.fullName,
                    created_at: new Date(),
                    user_token : token


                }
            ]
          );
          if(insertEror) throw insertEror

    }

    async connect(emailTapped,passwordTapped){
        try {
        const {data, error} = await supabase.auth.signInWithPassword({email:emailTapped,password:passwordTapped});
        if(error) throw error;
         console.log(JSON.stringify(data, null, 2));
         
        } catch (e){
            console.log("erreur" + e);
        }
    }

}
import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';



let db = SQLite.openDatabaseSync('Mopay.db'); 



//initialisation de la base
export const initDB =  ()=> {
    console.log(db);
      
    try {
        db.execSync(`PRAGMA foreign_keys = ON;`);
        db.execSync(
            // Table clients
        `CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        userId TEXT,
        name TEXT,
        phone TEXT,
        token TEXT,
        created_at TEXT
      );`);
      db.execSync(
          `CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        userId TEXT,
        clientId TEXT,
        amount REAL,
        status TEXT,
        createdAt TEXT,
        isFinished INTEGER DEFAULT 0,
        FOREIGN KEY(clientId) REFERENCES clients(id) ON DELETE CASCADE
      );`
     

      );
       db.execSync(
        `CREATE TABLE IF NOT EXISTS articles(
          id TEXT PRIMARY KEY,
          userId TEXT,
          name TEXT,
          amount REAL,
          quantite INTEGER,
          idFacture TEXT,
          FOREIGN KEY(idFacture) REFERENCES invoices(id) ON DELETE CASCADE 
        
        );`
        
      );
     
        


    }catch(erreur){
         console.log("Erreur critique DB :", erreur);
    }
   
     
  
};

// Ajouter un client
export const addClient = (userId, name, phone) => {
  const clientId = uuid.v4();
  const date = new Date();
  db.execSync(
    `INSERT INTO clients (id, userId, name, phone,created_at) VALUES ('${clientId}', '${userId}', '${name}', '${phone}','${date}');`

  );
 
  return clientId;
};
export const addArticle =(userId,name,quantite,amount,idFacture)=>{
  const articleId = uuid.v4();
  db.execSync(
    `INSERT INTO articles (id, userId, name, amount,quantite,idFacture) VALUES ('${articleId}', '${userId}', '${name}', '${amount}','${quantite}','${idFacture}');`

  );




}


  export const getArticles =(idFacture)=>{
    return db.getAllSync(`SELECT * FROM articles where idFacture ='${idFacture}'`);

  } 

// Ajouter une facture
export const addInvoice = (userId, clientId, amount, status = 'pending',isFinished = 0) => {
  const invoiceId = uuid.v4();
  const createdAt = new Date().toISOString();
  db.execSync(
    `INSERT INTO invoices (id, userId, clientId, amount, status, createdAt,isFinished) VALUES ('${invoiceId}', '${userId}', '${clientId}', '${amount}', '${status}', '${createdAt}' ,'${isFinished}');`
  );

 
  return invoiceId;
};

// Lire les 100 dernières factures d’un utilisateur
export const getLastInvoices = () => {
  
  
   return db.getAllSync('SELECT * FROM invoices ORDER BY createdAt DESC');
   


};

// Lire tous les clients d’un utilisateur
export const getClients = () => {
  return db.getAllSync("SELECT * FROM clients");
  
};

// Supprimer une facture
export const deleteInvoice = (invoiceId) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM invoices WHERE id = ?',
      [invoiceId]
    );
  });
};

// Supprimer un client
export const deleteClient = (clientId) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM clients WHERE id = ?',
      [clientId]
    );
  });
};

export const updateInvoice = (invoiceId, fieldsToUpdate) => {
    // fieldsToUpdate = { status: "finished", amount: 1200 }
    const updates = Object.entries(fieldsToUpdate)
        .map(([key, value]) => `${key} = '${value}'`) // attention aux nombres vs string
        .join(", ");

    db.execSync(`UPDATE invoices SET ${updates} WHERE id = '${invoiceId}';`);
};

export default db;

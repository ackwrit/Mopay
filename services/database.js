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
        token TEXT
      );`);
      db.execSync(
          `CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        userId TEXT,
        clientId TEXT,
        amount REAL,
        status TEXT,
        createdAt TEXT,
        FOREIGN KEY(clientId) REFERENCES clients(id) ON DELETE CASCADE
      );`

      );
     
        


    }catch(erreur){
         console.log("Erreur critique DB :", erreur);
    }
   
     
  
};

// Ajouter un client
export const addClient = (userId, name, phone) => {
  const clientId = uuid.v4();
  db.execSync(
    `INSERT INTO clients (id, userId, name, phone) VALUES ('${clientId}', '${userId}', '${name}', '${phone}');`

  );
 
  return clientId;
};

// Ajouter une facture
export const addInvoice = (userId, clientId, amount, status = 'pending') => {
  const invoiceId = uuid.v4();
  const createdAt = new Date().toISOString();
  db.execSync(
    `INSERT INTO invoices (id, userId, clientId, amount, status, createdAt) VALUES ('${invoiceId}', '${userId}', '${clientId}', '${amount}', '${status}', '${createdAt}');`
  );

 
  return invoiceId;
};

// Lire les 100 dernières factures d’un utilisateur
export const getLastInvoices = () => {
  
  
   return db.getAllSync('SELECT * FROM invoices ORDER BY createdAt DESC LIMIT 100');
   


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

export default db;

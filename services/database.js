import * as SQlite from 'expo-sqlite';
import uuid from 'react-native-uuid';



let db; 

//initialisation de la base
export const initDB = async ()=> {
    if(!db){
        db = await SQlite.openDatabaseAsync('Mopay.db'); 
    }
    return new Promise((resolve,reject)=> {
             db.transaction(tx => {
    // Table clients
     tx.executeSql(
      `CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        userId TEXT,
        name TEXT,
        phone TEXT,
        token TEXT
      );`
    );

    // Table factures
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        userId TEXT,
        clientId TEXT,
        amount REAL,
        status TEXT,
        createdAt TEXT
        FOREIGN KEY(clientId) REFERENCES clients(id) ON DELETE CASCADE
      );`
    );
  },
  err => reject(err),
  ()=> resolve(true)
);

    })
  
};

// Ajouter un client
export const addClient = (userId, name, phone) => {
  const clientId = uuid.v4();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO clients (id, userId, name, phone) VALUES (?, ?, ?, ?)',
      [clientId, userId, name, phone]
    );
  });
  return clientId;
};

// Ajouter une facture
export const addInvoice = (userId, clientId, amount, status = 'pending') => {
  const invoiceId = uuid.v4();
  const createdAt = new Date().toISOString();

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO invoices (id, userId, clientId, amount, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      [invoiceId, userId, clientId, amount, status, createdAt]
    );
  });
  return invoiceId;
};

// Lire les 100 dernières factures d’un utilisateur
export const getLastInvoices = (userId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM invoices WHERE userId = ? ORDER BY createdAt DESC LIMIT 100',
      [userId],
      (_, { rows }) => {
        callback(rows._array);
      }
    );
  });
};

// Lire tous les clients d’un utilisateur
export const getClients = (userId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM clients WHERE userId = ?',
      [userId],
      (_, { rows }) => {
        callback(rows._array);
      }
    );
  });
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
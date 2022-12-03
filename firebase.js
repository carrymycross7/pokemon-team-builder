const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require('./creds.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// async function getTypes(db) {
//     const typesCol = collection(db, 'types');
//     const typeSnapshot = await getDocs(typesCol);
//     const typesList = typeSnapshot.docs.map((doc) => doc);
//
//     return typesList;
// }

// let list = await getTypes(db)

module.exports = {db};

const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//firebase setup
const serviceAccount = require('./firebaseAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

//parser
app.use(bodyParser.json());
app.use(cors());

const db = admin.firestore();

app.get('/', (req, res) => { res.send('hello world!') })

//test endpoint

app.get('/users', async (req, res) => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    const users = [];
    snapshot.forEach(doc => {
      users.push(doc.data());
    });
    res.json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users: ' + error);
  }
});

// Endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    const { email, password, name, lastname } = req.body;
    const user = await admin.auth().createUser({ email, password });

    usersRef.doc(user.uid).set({
      name: name,
      email: email,
      lastname: lastname
      // other fields...
    });

    // usersRef.add({
    //   // userId: user.uid,
    //   name: name
    //   // other fields...
    // });

    res.json({ uid: user.uid });
  } catch (error) {
    res.status(500).send('Error registering user: ' + error);
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ uid: decodedToken.uid });
  } catch (error) {
    res.status(500).send('Error verifying ID token: ' + error);
  }
});





app.listen(3000, () => { console.log('server started on port 3000') })


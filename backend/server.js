const express = require('express'); //express
const cors = require('cors'); //cors
const { Pool } = require('pg'); // pour Postgresql
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
console.log("JWT chargé :", jwt !== undefined)
const db = require('./db');

const USER = [
    {id : 1, nom : "Chamsdine"},
    {id : 2, nom : "Antonin"},
    {id : 3, nom : "Sirdi"},
]

// Middleware pour traiter les données JSON dans les requêtes POST
app.use(express.json());
// Middleware pour autoriser les requêtes venant d'un autre port (ton frontend)
app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));

app.get('/users', async(req,res) =>{

try{
  const result = await db.query('SELECT * FROM users');
  res.json(result.rows);
}
 catch (err) {
        console.error('Erreur lors de la tentative de connexion', err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
})

app.post('/login', async(req,res) =>
  {
    
    const username = req.body.username;
    const password = req.body.password;
    
    

    if(!username || !password)
      {
        return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe sont requis' });
      }
    try{
      const result = await db.query('SELECT * FROM users WHERE username = $1',[username]);

      
    
      if (result.rows.length === 0) {
            // Si aucun utilisateur trouvé
            return res.status(401).json({ message: 'Identifiant ou Mot de passe incorrect' });
        }

        const user = result.rows[0];  // Récupère l'utilisateur trouvé dans la base de données
        console.log ("user envoyé: ", {username});
        console.log ("user de base: ", user.username);
        console.log ("Mot de passe envoyé: ", `"${password}"`);
        console.log ("Mot de passe de base: ", `"${user.passwords}"`);

        // Vérifier si le mot de passe correspond à celui stocké
        if (user.passwords === password) {
            // Si le mot de passe est correct
            return res.status(200).json({ message: 'Connexion réussie' });
        } else {
            // Si le mot de passe est incorrect
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

    } catch (err) {
        console.error('Erreur lors de la tentative de connexion', err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
  });

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur backend lancé à http://localhost:${port}`);
});
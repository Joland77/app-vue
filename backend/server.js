const express = require('express');
const cors = require('cors'); 
const { Pool } = require('pg'); // pour Postgresql (la base de donnée)
const jwt = require('jsonwebtoken'); // pour le token de connexion que je dois générer
const app = express();
const port = 3000;
console.log("JWT chargé :", jwt !== undefined)
const db = require('./db');

const secretKey = 'ak87djozihdJoland';


// Transforme les données qu'on recoit en Json
app.use(express.json());
// Pour que mon frontend soit connectée
app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));

function authMiddleware(req,res,next )
{
    const Authorize = req.headers.authorization; // on stock authorize du header
    if(!Authorize)
      {
        return res.status(401).json({message : "Token manquant"});
      }
    const tokenV = Authorize.split(" ")[1]; 
    // ca c'est pour split bearer et le token vu que c'est Bearer + "" + token on split sur l'espace
    try
    {
      const token = jwt.verify(tokenV, secretKey);
      req.user = token; 
      next(); 
    }
    catch (error)
    {
      return res.status(401).json({message : "echec de la vérification du token"});
    }

  }

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

//Route pour se connecter
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
            // Si tout est bon on se connecte donc on créer un token comme suit (fonction pour créer le token)
            
            const CreateToken = (data,secretKey, options = {expiresIn: '1h'}) =>
            {
                try {
                const token = jwt.sign(data, secretKey, options)
                return token
              }
              catch(error){
                console.log("erreur :", error.message)
                return null
              }
            }
            // là c'est pour créer un token avec l'id et le username dans "data"
            const tokenuser = 
            {
              id : user.id,
              username : user.username
            };
            const token = CreateToken(tokenuser, secretKey);
            

            return res.status(200).json({ 
              message: 'Connexion réussie', 
              token : token,
            });
        } else {
            // Si le mot de passe est incorrect
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

    } catch (err) {
        console.error('Erreur lors de la tentative de connexion', err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
  });

//Route pour récuperer infos user
  app.get('/data', authMiddleware, async(req,res) =>
  {
    const userid = req.user.id;
    try
    {
      const result = await db.query("SELECT  users.id, username, id_users, id_filmuser, title, publication_date, realisateur FROM users JOIN users_films ON users_films.id_users = users.id JOIN films ON users_films.id_filmuser = films.id WHERE users.id = $1", [userid]);
      if(result.rows.length === 0)
        {
          const result2 = await db.query("SELECT username FROM users WHERE users.id =$1", [userid])
          return res.status(200).json({username : result2.rows[0].username, movies : []})
        }
      const username = result.rows[0].username;
      const movies = result.rows.map(row => ({
        id: row.filmuser,
        title: row.title,
        date: row.publication_date,
        realisateur: row.realisateur
      }));

      return res.status(200).json({username, movies})
    }
    catch(error)
    {
      res.status(500).json({message : "Récupération info utilisateur impossible"});
    }
  }
  );

// Route pour s'inscrire
app.post('/inscription', async(req,res) =>
  {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const dateofbirth = req.body.date_of_birth;
    let emailcheck = false;
    let usernamecheck = false;
    let i = 0;
try 
      {
      const result = await db.query('INSERT INTO users (username, email, passwords, date_of_birth) VALUES ($1,$2,$3,$4);', [username,email,password,dateofbirth]);
      // const result = userRepository.create(username, password...)
      // user.Repository.update(infos)
      return res.status(201).json({message: "Utilisateur inscrit !"})
      }
      catch(error)    
      {
        console.error("erreur lors de l'insertion dans la base de donnée ",error);
        if(error.code === '23505')
          {
            if(error.constraint === 'users_email_key')
            {
              emailcheck = true;
              return res.status(400).json({emailcheck,usernamecheck,message:"email déjà utilisé"})
            }
            if(error.constraint === 'users_username_key')
            {
              usernamecheck = true;
              return res.status(400).json({emailcheck,usernamecheck,message:"username déjà utilisé"})
            }
          }
        return res.status(500).json({message : "erreur lors de l'inscription"});
      }
  })

app.get('/films', async(req,res) =>
  {
    try
    {
      result = await db.query('SELECT * FROM films ORDER BY title');
      return res.status(200).json(result.rows);
    }
    catch(error)
    {
      return res.status(500).json({message: "erreur lors du chargement des films"});
    }
  })

  app.get('/films/:slug', async(req,res) =>
  {
    const slug = req.params.slug
    try
    {
      result = db.query('SELECT * FROM films where slug = $1', [slug]);

      if (result.rows.length === 0)
        {
          return res.status(404).json({message : "film non trouvée"});
        }

      return res.status(200).json(result.rows);
    }
    catch(error)
    {
      return res.status(500).json({message: "erreur lors du chargement des films"});
    }
  })

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur backend lancé à http://localhost:${port}`);
});
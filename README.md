Installation et Configuration
Téléchargez le projet
Clonez le dépôt GitHub sur votre machine locale :

bash
Copier le code
git clone https://github.com/username/music-playlist-manager.git
cd music-playlist-manager
Installez les dépendances
Ouvrez un terminal à la racine du projet et exécutez :

bash
Copier le code
npm install
Démarrez le projet en mode développement
Utilisez la commande suivante pour démarrer le serveur :

bash
Copier le code
npm run start:dev
Générez des musiques
Puisque l'API Spotify n'est pas utilisée dans ce projet, vous devrez générer manuellement les musiques à l'aide de l'OpenAPI intégré.

Rendez-vous sur http://localhost:3000/api pour accéder à la documentation Swagger.
Créez un utilisateur et connectez-vous

Créez un utilisateur via l'endpoint dédié dans Swagger.
Connectez-vous pour obtenir un jeton JWT.
Générez des musiques

Une fois connecté, utilisez l'endpoint approprié pour générer des musiques.
Important :
Toutes les requêtes API nécessitent une authentification via le jeton JWT. Assurez-vous d’être connecté avant d’effectuer des appels API.

# Projet de 2ème année réalisé sur 4 mois (Janvier 2019 à Avril 2019) , avec Astrid SOUMOY, Jonathan BORDELEAU, Lucas JAULENT, Guillaume L'ECUYER & Pablo CHAUSSÉ-COSSIO, consistant à concevoir une application Angular illustrant un jeu WEB des 7 différences ("Spot the difference" en Anglais). Il y aurait 2 modes de jeu (un solo ou en multijoueur sur un même réseau) dont une recherche des différences en 2D et une autre dans un environnement 3D (Utilisé avec ThreeJS).

# Description : Implémenter une Application Angular avec une architecture Client et Serveur suivant le principe MEAN. L'objecitf étant de pouvoir jouer/créer des jeux WEB par le biais d'une interface centrée utilisateur.

# Instructions pour lancer l'application : 
- Avoir installer NodeJS et Angular.
- Se rendre dans le dossier 'client' et entrer la commande console npm install
- Se rendre dans le dossier 'server' et entrer la commande console npm install
- Une fois les deux installations 'client' et 'server' terminées, entrer la commande npm start pour les 2 dossiers en conservant les fenetres console ouvertes.
-> Une page avec l'URL http://localhost:4200 va s'ouvrir dans votre navigateur par défaut, vous pouvez maintenant utiliser l'application.

# Utilisation : 
## 1. Une fois sur la page d'accueil vous pouvez vous connecter et jouer aux jeux proposés par défaut (en 2D ou 3D, en solo ou en Multijoueur). Une fois dans l'interface du jeu, vous y trouverez un système de messagerie avec lequel vous pouvez communiquer (fonctionnant avec des WebSockets). De plus, vous serez notifié dès qu'un joueur se connecte/déconnecte de l'application et également lorsqu'un des deux joueurs trouve une différence. 
##  2. Si vous ne souhaitez pas jouer, vous pouvez créer votre propre jeu avec vos propres images (elles doivent contenir au moins 7 différences). Ou bien vous pouvez choisir de construire un univers en 3D. Vous pourrez choisir un univers composé de figures géométriques (Spheres, Cubes, Pyramides, etc) ou bien avec des personnages de la célèbre saga Pokemon (thème choisi par l'équipe). Vous pourrez choisir le nombre d'objet/pokemons que vous souhaitez avoir dans votre scène d'exploration (Entre 10 et 200 inclus), les types de differences (changement de couleur des objets, objet ajouté ou encore objet supprimé d'une scéne à l'autre).

# Codé entièrement en TypeScript utilisant le principe MEAN, utilisant les technologies suivantes : 
# - Angular. 
# - NodeJS. 
# - Express. 
# - MongoDB/Mongoose.
# - ThreeJS. 
# - WebSocket. 

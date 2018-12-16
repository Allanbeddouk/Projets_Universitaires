/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#ifndef GRAPHE_H
#define GRAPHE_H

#include"Arc.h"
#include<utility>

using namespace std;
//Enum qui permettent le choix de la categorie et du vehicule au besoin
enum Categorie {faibleRisque, moyenRisque, hautRisque };
enum Vehicule {LI_ion, NI_NH};


class Graphe
{
public :
    /*
     * Description : Constructeur par parametres de la classe Graphe
     * Parametres : le fichier a partir duquels on va extraire les informations du graphe qu'on souhaite construire
     * Retour : aucun
     */
    Graphe(fstream& fichier);
    
    /*
     * Description : Destructeur de la classe Graphe
     * Parametres : aucun
     * Retour : aucun
     */
    ~Graphe();
    
    //getters
    
    /*
     * Description : Permet de recuperer la valeur de l'attrubut sommets_ de la classe Graphe
     * Parametres : aucun
     * Retour : attribut sommets_(vector<Sommet>)
     */
    vector<Sommet> getSommets();
    
    /*
     * Description : Permet de recuperer la valeur de l'attrubut arcs_ de la classe Graphe
     * Parametres : aucun
     * Retour : attribut arcs_(vector<Arc>)
     */
    vector<Arc> getArcs();
    
    /*
     * Description : A partir d'un nom de fichier passe en parametres, on extrait d'une part les sommets puis les arcs avec une fonction pour chaque extraction
     * Parametres : Nom du fichier (fstream&)
     * Retour : aucun
     */
    void creerGraphe(fstream& fichier);
    
    
    //Extraire les donnees a partir du fichier .txt
    
    /*
     * Description : A partir d'un nom de fichier passe en parametres, on extrait  les sommets de ce fichier
     * Parametres : Nom du fichier (fstream&)
     * Retour : le vecteur contenant toutes les informations recueillies dans le fichier (vector<Sommet>)
     */
    vector<Sommet> extraireSommets(fstream& fichier);
    
    /*
     * Description : A partir d'un nom de fichier passe en parametres, on extrait les arcs de ce fichier
     * Parametres : Nom du fichier (fstream&) et le vecteur de Sommet recuperes au debut du fichier
     * Retour : le vecteur contenant toutes les informations recueillies dans le fichier (vector<Arc>)
     */
    vector<Arc> extraireArcs(fstream& fichier, const vector<Sommet>& points);

    
    /*
     * Description : affiche le graphe selon le format fourni dans l'enonce
     * Parametres : aucun
     * Retour : aucun
     */
    void lireGraphe();
    
    
    //Methodes utiles pour la classe
    
    /*
     * Description : permet d'obtenir les voisins d'un sommet
     * Parametres : le sommet pour lequel on veut obtenir les voisins (Sommet)
     * Retour : tous les voisins du sommet passe par parametres (vector<Sommet>)
     */
    vector<Sommet> getVoisins(const Sommet& s);
    
    /*
     * Description : permet d'obtenir la distance entre deux sommets adjacents
     * Parametres : les deux sommets pour lesquels on veut obtenir la distance (Sommet)
     * Retour : retourne la distance entre les deux sommets passes en parametres (int)
     */
    int getDistanceSommets(const Sommet& s1, const Sommet& s2);
    
    /*
     * Description : permet de calculer la distance pour un chemin donne
     * Parametres : le vecteur contenant le chemin en question (dans le sens inverse)
     * Retour : le temps pour effectuer le chemin passe en parametres (unsigned)
     */
    unsigned calculerTempsChemin(const vector<Sommet>& chemins);
    
    
    //methodes relatives pour le choix du type de vehicule
    
    /*
     * Description : methode recursive, qui affiche le type de vehicule adapte par rapport au trajet
     * Parametres : Par defaut, on ne force pas une valeur unique du vehicule, cest a dire que le vehicule le plus adapte sera retenu.
     * Retour : aucun (mais affiche le resultat du type de vehicule et de l'etat de la batterie)
     */
     void afficherTypeDeVehicule(Vehicule vehicule, const vector<Sommet>& chemins, const Categorie& categorie,  unsigned temps, const bool imposerNI_NH=false, const bool imposerLI_ion=false);
    
    /*
     * Description : methode utilisee exclusivement dans la methode fficherTypeDeVehicule, qui nous permet de localiser la station la plus proche a l'aide d'un chemin passe en parametre
     * Parametres : chemin (vetcor<Sommet>)
     * Retour : le nouveau vecteur avec la station la plus proche en derniere position (vector<Sommet>)
     */
    vector<Sommet> stationsPlusProches(const vector<Sommet>& v);
    
    /*
     * Description : methode utilisee exclusivement dans la methode fficherTypeDeVehicule, qui nous permet de simuler un trajet vers une station et de savoir si il est possible de l'effectuer
     * Parametres : La station vers laquelle on veut aller, le chemin principal (car on verifie egalement qu'on peut se rendre vers l'arrivee apres la station), et les categories de vehicules et de personnes
     * Retour : une paire avec en first le booleen indiquant si on peut se rendre a la station (true) ou non (false) et la distance que ca prendrait pour le faire
     */
    pair<bool,unsigned> testAllerAUneStation(const Sommet& station, const Vehicule& vehicule, const Categorie& categorie, vector<Sommet> chemins);
    
    
    /*
     * Description : reinitialise les variables globales permettant de gerer l'etat des batteries
     * Parametres : aucun
     * Retour : aucun
     */
       void remiseAZeroVehicule();
   
    
    /*
     * Description : methode qui calcule le plus court chemin entre deux sommets, en se basant sur l'algorithme de Dijkstra.
     n.b : Nous avons code l'algorithme avec une methode que celle indiquee dans le cours, l'algorithme s'execute de la meme facon que si nous le faisions sur papier
     * Parametres : categorie du passager, sommet de depart et d'arrive
     * Retour : le chemin obtenu, ordonne de facon inverse dans le vecteur (vector<Sommet>)
     */
    vector<Sommet> plusCourtChemin(const Categorie& categorie, const Sommet& depart, const Sommet& arrive);
    
    /*
     * Description :methode qui permet de determiner tous les chemins possibles que l'on peut effectuer a partir d'un point et en fonction des contraintes passees en parametres
     * Parametres : categorie du passager, type de vehicule et sommet de depart
     * Retour : aucun (Affiche toutes les combinaisons)
     */
    void extraireSousGraphe(Vehicule vehicule, Categorie categorie, Sommet depart);
    
    
    
    
    //fonctions d'affichage
    
    /*
     * Description : affiche le plus court chemin selon le format de l'enonce
     * Parametres : chemins, en ordre inverse (vector<Sommet>)
     * Retour : aucun
     */
    void afficherPlusCourtChemin(const vector<Sommet>& v);
    
    /*
     * Description : affiche le plus court chemin selon le format de et fait egalement appel a l'affichage du type de vehicule. (fonction d'affichage correspondant a l'option b du menu)
     * Parametres : categorie du passager, sommet de depart et d'arrive
     * Retour : aucun
     */
    void printDetailsChemins(const Categorie& categorie, const Sommet& depart, const Sommet& arrive);
    

private :
    //attribut qui permet de contenir tous les sommets du graphe
   vector<Sommet> sommets_;
    //attribut qui permet de contenir un unique exemplaire de tous les arcs du graphe
    vector<Arc> arcs_;
};

#endif // !GRAPHE_H


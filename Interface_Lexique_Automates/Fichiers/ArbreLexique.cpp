/*
Fichier : ArbreLexique.cpp
Auteurs : Allan Beddouk, Robin Canton-Lamousse et David Dratwa 
Date denriere modif : 29 Novembre 2018
*/
#include "ArbreLexique.h"

/* 
Methode : constructeur 
IN : nom du fichier a utiliser pour creer l'arbre
OUT : /
But : Construire l'arbre
*/
ArbreLexique::ArbreLexique(const string& nomFichier)
{
	caractere_.setValeurCaractere(' ');
	fstream fichier(nomFichier, ios::in);
    string mot;
    while (!fichier.eof())
    {
        getline(fichier, mot);
        caractere_.ajouterMot(mot, 0);
    }
}


/*
Methode : getOccurences
IN : le mot represente les lettres le prefixe qu'on recherche,
le vecteur contiendra les mots sortis par la fonction 
OUT : le vecteur 
But : charger dans le vecteur les occurences trouvees a partir du prefixe passe en parametre
*/
vector<string>* ArbreLexique::getOccurences(const string& mot)
{
	return caractere_.getLexique(mot, 0);
}

/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#ifndef SOMMET_H
#define SOMMET_H


#include<iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <vector>
using namespace std;

class Sommet {
public :  

	//Constructeurs
    
    /*
     * Description : Constructeur par defaut de la classe Sommet :
                     initialise numero_ a 0 et station_ a false
     * Parametres : aucun
     * Retour : aucun
     */
	Sommet();
    
    /*
     * Description : Constructeur par parametres de la classe Sommet
     * Parametres : numero et station avec lequel on veut construire l'objet
     * Retour : aucun
     */
	Sommet(const int& numero, const bool& station);
    
    /*
     * Description : Destructeur de la classe Sommet
     * Parametres : aucun
     * Retour : aucun
     */
    ~Sommet();

	//getters
    
    /*
     * Description : Permet de recuperer la valeur de l'attrubut numero_ de la classe Sommet
     * Parametres : aucun
     * Retour : attribut numero_(unsigned)
     */
	int getNumero() const;
    
    /*
     * Description : Permet de recuperer la valeur de l'attrubut station_ de la classe Sommet
     * Parametres : aucun
     * Retour : attribut station_(bool)
     */
	bool aUneStation() const;
    
    
    //setters
    
    /*
     * Description : Permet de changer la valeur de l'attrubut numero_ de la classe Sommet
     * Parametres : nouvel attribut numero (unsigned)
     * Retour : aucun
     */
    void setNumero(const int& numero);
    
    /*
     * Description : Permet de changer la valeur de l'attrubut station_ de la classe Sommet
     * Parametres : nouvel attribut station (bool)
     * Retour : aucun
     */
    void setStation(const bool& station);
    
    //surcharges d'operateurs
    
    /*
     * Description : surcharge l'operateur '==' en fonction des numeros de sommets de la classe Sommet
     * Parametres : le sommet avec lequel on compare
     * Retour : le resultat de la comparaison des deux sommets
     */
    bool operator==(const Sommet& a);
    
    /*
     * Description : surcharge l'operateur '!=' en fonction des numeros de sommets de la classe Sommet
     * Parametres : le sommet avec lequel on compare
     * Retour : le resultat de la comparaison des deux sommets
     */
    bool operator!=(const Sommet& a);
    
    
private :
    //Numero du sommet () que l'on considere comme son nom
	int numero_;
    //Cela nous indique si le sommet possede une station (true) ou (false) dans le cas contraire
	bool station_;	
};




#endif // !SOMMET_H


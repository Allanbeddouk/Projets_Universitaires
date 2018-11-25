/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#ifndef ARC_H
#define ARC_H

#include"Sommet.h"

class Arc {
public:
    
    /*
     * Description : Constructeur par parametres de la classe Arc
     * Parametres : les deux sommets qui formeront l'arc et la distance qui les separe avec lesquels on veut construire l'objet
     * Retour : aucun
     */
    Arc(const Sommet& sommetA, const Sommet& sommetB, const int& distance);
    
    /*
     * Description : Destructeur de la classe Arc
     * Parametres : aucun
     * Retour : aucun
     */
    ~Arc();

	//getters
    
    /*
     * Description : Permet de recuperer la valeur de l'attrubut sommetA_ de la classe Arc
     * Parametres : aucun
     * Retour : attribut sommetA_(Sommet)
     */
	Sommet getSommetA() const;
    
    /*
     * Description : Permet de recuperer la valeur de l'attrubut sommetB_ de la classe Arc
     * Parametres : aucun
     * Retour : attribut sommetB_(Sommet)
     */
	Sommet getSommetB() const;
    
    /*
     * Description : Permet de recuperer la valeur de l'attrubut distance_ de la classe Arc
     * Parametres : aucun
     * Retour : attribut distance_(int)
     */
	int getDistance() const;
    
    //Surcharge d'operateurs
    
    /*
     * Description : surcharge l'operateur '<' en fonction des distances des arcs de la classe Arc
     * Parametres : le sommet avec lequel on compare
     * Retour : le resultat de la comparaison des deux distances
     */
    bool operator< (const Arc& s) const;	
    
private: 
	Sommet sommetA_; 
	Sommet sommetB_; 
	int distance_; 
};
#endif // !ARC_H

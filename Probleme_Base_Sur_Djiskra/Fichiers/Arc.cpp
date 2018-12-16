/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#include "Arc.h"


//Constructeurs

/*
 * Description : Constructeur par parametres de la classe Arc
 * Parametres : les deux sommets qui formeront l'arc et la distance qui les separe avec lesquels on veut construire l'objet
 * Retour : aucun
 */
Arc::Arc(const Sommet& sommetA, const Sommet& sommetB, const int& distance)
{
	sommetA_ = sommetA; 
	sommetB_ = sommetB; 
	distance_ = distance; 
}

/*
 * Description : Destructeur de la classe Arc
 * Parametres : aucun
 * Retour : aucun
 */
Arc::~Arc()
{
}


//getters

/*
 * Description : Permet de recuperer la valeur de l'attrubut sommetA_ de la classe Arc
 * Parametres : aucun
 * Retour : attribut sommetA_(Sommet)
 */
Sommet Arc::getSommetA() const
{
	return sommetA_; 
}

/*
 * Description : Permet de recuperer la valeur de l'attrubut sommetB_ de la classe Arc
 * Parametres : aucun
 * Retour : attribut sommetB_(Sommet)
 */
Sommet Arc::getSommetB() const
{
	return sommetB_;
}

/*
 * Description : Permet de recuperer la valeur de l'attrubut distance_ de la classe Arc
 * Parametres : aucun
 * Retour : attribut distance_(int)
 */
int Arc::getDistance() const
{
	return distance_; 
}

/*
 * Description : surcharge l'operateur '<' en fonction des distances des arcs de la classe Arc
 * Parametres : le sommet avec lequel on compare
 * Retour : le resultat de la comparaison des deux distances
 */
bool Arc::operator< (const Arc& s) const
{
    return getDistance()<s.getDistance();
    
}

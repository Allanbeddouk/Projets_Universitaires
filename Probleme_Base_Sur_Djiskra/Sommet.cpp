/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#include "Sommet.h"

/*
 * Description : Constructeur par defaut de la classe Sommet :
 initialise numero_ a 0 et station_ a false
 * Parametres : aucun
 * Retour : aucun
 */
Sommet::Sommet() :numero_(0), station_(false)
{
}

/*
 * Description : Constructeur par parametres de la classe Sommet :
 * Parametres : numero et station avec lequel on veut construire l'objet
 * Retour : aucun
 */
Sommet::Sommet(const int& numero, const bool& station) : numero_(numero), station_(station)
{
}

/*
 * Description : Destructeur de la classe Sommet :
 * Parametres : aucun
 * Retour : aucun
 */
Sommet::~Sommet()
{
}

//getters
/*
 * Description : Permet de recuperer la valeur de l'attrubut numero_ de la classe Sommet :
 * Parametres : aucun
 * Retour : attribut numero_(unsigned)
 */
int Sommet::getNumero() const
{
	return numero_;
}

/*
 * Description : Permet de recuperer la valeur de l'attrubut station_ de la classe Sommet :
 * Parametres : aucun
 * Retour : attribut station_(bool)
 */
bool Sommet::aUneStation() const
{
	return station_; 
}

//setters

/*
 * Description : Permet de changer la valeur de l'attrubut numero_ de la classe Sommet :
 * Parametres : nouvel attribut numero (unsigned)
 * Retour : aucun
 */
void Sommet::setNumero(const int& numero)
{
    numero_=numero;
}

/*
 * Description : Permet de changer la valeur de l'attrubut station_ de la classe Sommet :
 * Parametres : nouvel attribut station (bool)
 * Retour : aucun
 */
void Sommet::setStation(const bool& station)
{
    station_=station;
}


/*
 * Description : surcharge l'operateur '==' en fonction des numeros de sommets de la classe Sommet
 * Parametres : le sommet avec lequel on compare
 * Retour : le resultat de la comparaison des deux sommets
 */
bool Sommet::operator==(const Sommet& a)
{
    return getNumero()==a.getNumero();
}

/*
 * Description : surcharge l'operateur '!=' en fonction des numeros de sommets de la classe Sommet
 * Parametres : le sommet avec lequel on compare
 * Retour : le resultat de la comparaison des deux sommets
 */
bool Sommet::operator!=(const Sommet& a)
{
    return getNumero()!=a.getNumero();
}


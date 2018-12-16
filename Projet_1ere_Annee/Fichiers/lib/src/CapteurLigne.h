#define F_CPU 8000000UL
#include <avr/io.h>
#include <avr/delay.h>


/*
        BRANCHEMENTS PREALABLES : 

        Faire attention de mettre le fil qui permet de Cal(fil blanc sans dessin dessus). sur le bit 7 (qui correspond au numero 8 de la carte)

*/


class CapteurLigne
{
public:

    /*
     * Description : Constructeur par defaut 
     * Parametres : 
     * Retour : retourne vrai si aucun capteur n'est active
     */
    CapteurLigne();

    
    /*
     * Description : fonction qui verifie si le robot est HorsLigne 
     * Parametres : aucun
     * Retour : retourne vrai si aucun capteur n'est active
     */
    bool horsLigne() const;


    /*
     * Description : fonction qui verifie si le capteur a l'extreme gauche est active (U1) 
     * Parametres : aucun
     * Retour : retourne vrai si le capteur est active
     */
    bool etatExtremeGauche() const;
    

    /*
     * Description : fonction qui verifie si le capteur a gauche est active (U2) 
     * Parametres : aucun
     * Retour : retourne vrai si le capteur est active
     */
    bool etatGauche() const;


    /*
     * Description : fonction qui verifie si le capteur central est active (U3) 
     * Parametres : aucun
     * Retour : retourne vrai si le capteur est active
     */
    bool etatCentre() const;


    /*
     * Description : fonction qui verifie si le capteur a droite est active (U4)
     * Parametres : aucun
     * Retour : retourne vrai si le capteur est active
     */
    bool etatDroite() const;


    /*
     * Description : fonction qui verifie si le capteur a l'extreme droite est active (U5) 
     * Parametres : aucun
     * Retour : retourne vrai si le capteur est active
     */
    bool etatExtremeDroite() const;


    /*
     * Description : fonction qui verifie que les capteurs detectent une ligne pleine 
     * Parametres : aucun
     * Retour : retourne vrai si la ligne captee est detectee
     */
    bool lignePleine() const;


    /*
     * Description : fonction qui verifie que les capteurs detectent une ligne a droite  
     * Parametres : aucun
     * Retour : retourne vrai si la ligne de droite est detectee
     */
    bool ligneADroite() const;


    /*
     * Description : fonction qui verifie que les capteurs detectent une ligne a gauche
     * Parametres : aucun
     * Retour : retourne vrai si la ligne de gauche est detectee
     */
    bool ligneAGauche() const;

    /*
     * Description : fonction qui verifie si c'est uniquement que le capteur d'extreme gauche qui est active 
     * Parametres : aucun
     * Retour : retourne vrai si uniquement le capteur d'extreme gauche est active
     */
    bool extremeGaucheUnique() const;


    /*
     * Description : fonction qui verifie si c'est uniquement que le capteur d'extreme droite qui est active 
     * Parametres : aucun
     * Retour : retourne vrai si uniquement le capteur d'extreme droite est active
     */
    bool extremeDroiteUnique() const;

};
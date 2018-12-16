
 //
//  MouvementRobot.h
//  INF1900
//
//  Created by Allan BEDDOUK, Kevin CILIENTO, David  DRATWA ET Roman ZHORNYTSKIY 2018-10-23.
//  Copyright © 2018 rights reserved.
//

#ifndef MouvementRobot_h
#define MouvementRobot_h
#include "Roue.h"
#include "CapteurLigne.h"
#include <util/delay.h>
#include "outils.h"

class MouvementRobot
{
    public:
    
    
    /*
     Constructeur par defaut :
     Cree un objet MouvementRobot en mettant son attribut estEnMouvement_ a "false"
     */
    MouvementRobot();

    /****************************Pour avancer********************************/

    /*
     * Description : fonction qui fait avancer le robot
     * Parametres : intensite choisie (intensite)
     * Retour : aucun
     */
    void avancer(const uint8_t& operande);

    
    /*
     * Description : fonction qui permet la propulsion des moteurs pour faciliter le demarrage du robot vers l'avant
     * Parametres : aucun
     * Retour : aucun
     */
    void propulsionAv();


    /*
     * Description : fonction qui permet la propulsion des moteurs pour faciliter le demarrage de la roue gauche vers l'avant
     * Parametres : aucun
     * Retour : aucun
     */
    void propulsionDroiteAv();


    /*
     * Description : fonction qui permet la propulsion des moteurs pour faciliter le demarrage de la roue gauche vers l'avant
     * Parametres : aucun
     * Retour : aucun
     */
    void propulsionGaucheAv();


    /*
     * Description : fonction qui permet d'ajuster la trajectoire du robot lorsqu'il avance vers l'avant en fonction des capteurs
     * Parametres : aucun
     * Retour : aucun
     */
    void ajusterTrajectoireAv();
    
    
    
    /****************************Pour reculer********************************/
    
    /*
     * Description : fonction qui fait reculer le robot
     * Parametres : intensite choisie (intensite)
     * Retour : aucun
     */
    void reculer(const uint8_t& operande);

    /*
     * Description : fonction qui permet la propulsion des moteurs pour faciliter le demarrage du robot vers l'avarriereant
     * Parametres : aucun
     * Retour : aucun
     */
    void propulsionAr();


    /*
     * Description : fonction qui permet la propulsion des moteurs pour faciliter le demarrage de la roue gauche vers l'arriere
     * Parametres : aucun
     * Retour : aucun
     */
    void propulsionDroiteAr();


    /*
     * Description : fonction qui permet la propulsion des moteurs pour faciliter le demarrage de la roue gauche vers l'arriere
     * Parametres : aucun
     * Retour : aucun
     */
    void propulsionGaucheAr();


    /*
     * Description : fonction qui permet d'ajuster la trajectoire du robot lorsqu'il avance vers l'arriere en fonction des capteurs
     * Parametres : aucun
     * Retour : aucun
     */
    void ajusterTrajectoireAr();

    
    /****************************Autres methodes de la classe********************************/

/*
     * Description : fonction qui arrete le robot
     * Parametres : aucun
     * Retour : aucun
     */
    void arreter();
    
    
    /*
    * Description : fonction qui ajuste la trajectore du robot a gauche
    * Parametres : aucun 
    * Retour : aucun
    */
    void ajusterGauche();


    /*
    * Description : fonction qui ajuste la trajectore du robot a droite
    * Parametres : aucun 
    * Retour : aucun
    */
    void ajusterDroite();
    

    /*
     * Description : fonction qui fait tourner le robot a gauche 
     * Parametres : aucun
     * Retour : aucun
     */
    void tournerAGauche();
    

    /*
     * Description : fonction qui fait tourner le robot a droite 
     * Parametres : aucun
     * Retour : aucun
     */
    void tournerADroite();



    
    /****************************Attributs de la classe********************************/
    
    
    /*
     Objet qui permet le controle de la roue gauche du robot
     */
    Roue roueGauche_;
    
    /*
     Objet qui permet le controle de la roue droite du robot
     */
    Roue roueDroite_;
    
    /*Attribut qui permet de connaitre la vitesse du robot*/
    uint8_t vitesseRobot_;


    /*Attribut qui represente le capteur de ligne du robot*/

    CapteurLigne capteur_;
};
#endif /* MouvementRobot_h */

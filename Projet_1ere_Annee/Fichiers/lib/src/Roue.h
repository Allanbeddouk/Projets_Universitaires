//
//  Roue.h
//  INF1900
//
//  Created by Allan BEDDOUK, Kevin CILIENTO, David  DRATWA ET Roman ZHORNYTSKIY 2018-10-23.
//  Copyright © 2018 rights reserved.
//

#ifndef Roue_h
#define Roue_h

#include <avr/io.h>


enum Intensite
{
    NULLE,
    FAIBLE,
    MOYENNE,
    FORTE,
    MAXIMALE
};

enum Extremite
{
    gauche,
    droite
};


class Roue
{
    public :
    /*
     Constructeur par defaut :
        Cree un objet roue en mettant son attribut estEnMouvement_ a "false" et intensite_ a "NULLE"
     */
        Roue(Extremite extremite);
    
        //Methodes
    
  /*
   * Description : fonction qui fait avancer la roue
   * Parametres : intensite choisie (intensite)
   * Retour : aucun
   */
        void avancerRoue(uint8_t operande);
    
    
    
    /*
     * Description : fonction qui fait reculer la roue
     * Parametres : intensite choisie (intensite)
     * Retour : aucun
     */
    void reculerRoue(uint8_t operande);
    
    /*
     * Description : fonction qui arrete la roue
     * Parametres : aucun
     * Retour : aucun
     */
        void arreterRoue();
    
    
    
    /*
     * Description : fonction qui permet d'ajuster la frequence de l'onde PMW
     * Parametres : ratio qui est proportionnelle a la vitesse a laquelle on veut faire tourner une roue
     * Retour : aucun
     */
        void ajustementPWM();
    
    
    
        //Attribut(s)
    
    
    
    /*
     Attribut qui permet de savoir quand la roue est en mouvement (true) ou non (false)
     */
        bool estEnMouvement_;
    
    /*
     Attribut qui permet de choisir l'intensite qu'on veut mettre pour une roue (NULLE, FAIBLE, MOYENNE, FORTE, MAXIMALE)
     */
        Intensite intensite_;
    
    
    
    /*
     Attribut qui permet de choisir l'extremite qu'on veut mettre selon la roue (gauche ou droite)
     */
        Extremite extremite_;

    };
#endif 

//
//  Roue.cpp
//  INF1900
//
//  Created by Allan BEDDOUK, Kevin CILIENTO, David  DRATWA ET Roman ZHORNYTSKIY 2018-10-23.
//  Copyright © 2018 rights reserved.
//
#include "Roue.h"



/*
 Constructeur par defaut :
 Cree un objet roue en mettant son attribut estEnMouvement_ a "false" et intensite_ a "NULLE"
 */
Roue:: Roue(Extremite extremite) : estEnMouvement_(false), intensite_(NULLE)
{
    extremite_=extremite;
}


/*
 * Description : fonction qui demarre la roue
 * Parametres : intensite choisie (intensite)
 * Retour : aucun
 */
void Roue::avancerRoue(uint8_t operande)
{
    ajustementPWM();
    
    switch (extremite_)
    {
        case gauche :
            PORTD&=0<<6; //mise a 0 du bit numero 6 pour le bit de direction (pour permettre d'avancer)
            OCR1A=operande;
            break;
        case droite :
            PORTD&=0<<7; //mise a 0 du bit numero 7 pour le bit de direction (pour permettre d'avancer)
            OCR1B=operande;
            break;
    }
    
    Intensite intensite=NULLE;

    if(operande>0 && operande<=64)
        intensite=FAIBLE;

    else if(operande>64 && operande<=128)
        intensite=MOYENNE;

    else if(operande>128 && operande<=192)
        intensite=FORTE;
        
    else if(operande>192 && operande<=256)
        intensite=MAXIMALE;

    intensite_=intensite;
    estEnMouvement_=true;
}



void Roue::reculerRoue(uint8_t operande)
{
    ajustementPWM();
    
    switch (extremite_)
    {
        case gauche :
            PORTD|=1<<6; //mise a 1 du bit numero 6 pour le bit de direction (pour permettre de reculer)
            OCR1A=operande;
            break;
        case droite :
            PORTD|=1<<7; //mise a 1 du bit numero 7 pour le bit de direction (pour permettre de reculer)
            OCR1B=operande;
            break;
    }
    
    Intensite intensite=NULLE;
    
    if(operande>0 && operande<=64)
        intensite=FAIBLE;
    
    else if(operande>64 && operande<=128)
        intensite=MOYENNE;
    
    else if(operande>128 && operande<=192)
        intensite=FORTE;
    
    else if(operande>192 && operande<=256)
        intensite=MAXIMALE;
    
    intensite_=intensite;
    estEnMouvement_=true;
}


/*
 * Description : fonction qui arrete la roue
 * Parametres : aucun
 * Retour : aucun
 */
void Roue::arreterRoue()
{
    if(estEnMouvement_)
    {
        switch (extremite_)
        {
            case gauche :
                OCR1A=0;
                break;
            case droite :
                OCR1B=0;
                break;
        }
        intensite_=NULLE;
        estEnMouvement_=false;
    }
}

/*
 * Description : fonction qui permet d'ajuster la frequence de l'onde PMW
 * Parametres : ratio qui est proportionnelle a la vitesse a laquelle on veut faire tourner une roue
 * Retour : aucun
 */
void Roue::ajustementPWM ()
{
    // mise à un des sorties OC1A et OC1B sur comparaison
    
    // réussie en mode PWM 8 bits, phase correcte

    // division d'horloge par 8 - implique une frequence de PWM fixe
    
    TCCR1A = _BV(COM1A1) | _BV(COM1B1) | _BV(WGM10); //0b11110001 ;
    
    TCCR1B = _BV(CS11);
    
    TCCR1C = 0;
}

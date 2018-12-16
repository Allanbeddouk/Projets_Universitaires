//
//  MouvementRobot.cpp
//  INF1900
//
//  Created by Allan BEDDOUK, Kevin CILIENTO, David  DRATWA ET Roman ZHORNYTSKIY 2018-10-23.
//  Copyright © 2018 rights reserved.
//

#define F_CPU 8000000UL
#include "MouvementRobot.h"


MouvementRobot:: MouvementRobot() : roueGauche_(Roue(gauche)), roueDroite_(Roue(droite)), vitesseRobot_(0), capteur_()
{
}


void MouvementRobot:: avancer(const uint8_t& operande)
{
    propulsionAv();
    roueGauche_.avancerRoue(operande);
    roueDroite_.avancerRoue(operande);
    vitesseRobot_=operande;
}


void MouvementRobot::propulsionAv()
{
    roueGauche_.avancerRoue(255);
    roueDroite_.avancerRoue(255);
    _delay_ms(80);
}


void MouvementRobot:: propulsionDroiteAv()
{
     roueDroite_.avancerRoue(255);
    _delay_ms(80);
}


void MouvementRobot:: propulsionGaucheAv()
{
     roueGauche_.avancerRoue(255);
    _delay_ms(80);
}


void MouvementRobot:: ajusterTrajectoireAv()
{
    if( ( capteur_.etatGauche()  ||  capteur_.etatExtremeGauche() ) && !capteur_.etatExtremeDroite() )
    {
        ajusterGauche();
        return;
    }
    
    else if(  ( capteur_.etatDroite() || capteur_.etatExtremeDroite() ) &&  !capteur_.etatExtremeGauche() )
    {
        ajusterDroite();
        return;
    }
    else 
        return;
}


void MouvementRobot:: reculer(const uint8_t& operande)
{
    //propulsion des roues vers l'arriere
    roueGauche_.reculerRoue(operande);
    roueDroite_.reculerRoue(operande);
    vitesseRobot_=operande;
}


void MouvementRobot:: propulsionAr()
{
    roueGauche_.reculerRoue(255);
    roueDroite_.reculerRoue(255);
    _delay_ms(80);
}


void MouvementRobot:: propulsionDroiteAr()
{
    roueDroite_.reculerRoue(255);
    _delay_ms(80);
}

   
void MouvementRobot:: propulsionGaucheAr()
{
    roueGauche_.reculerRoue(255);
    _delay_ms(80);
}


void MouvementRobot:: ajusterTrajectoireAr()
{
    if( ( capteur_.etatGauche()  ||  capteur_.etatExtremeGauche() ) && !capteur_.etatExtremeDroite() )
    {
        roueDroite_.arreterRoue();
        _delay_ms(50);
        roueDroite_.reculerRoue(vitesseRobot_);
        return;
    }
    
    else if( ( capteur_.etatDroite() || capteur_.etatExtremeDroite() ) &&  !capteur_.etatExtremeGauche())
    {
        roueGauche_.arreterRoue();
        _delay_ms(50);
        roueGauche_.reculerRoue(vitesseRobot_);
        return;
    }
    else 
        return;
};

void MouvementRobot:: arreter()
{
    roueDroite_.arreterRoue();
    roueGauche_.arreterRoue();
    vitesseRobot_=0;
}


void MouvementRobot:: ajusterGauche()
{
    roueGauche_.arreterRoue();
    _delay_ms(60);
    roueGauche_.avancerRoue(vitesseRobot_);
}


void MouvementRobot:: ajusterDroite()
{
    roueDroite_.arreterRoue();
    _delay_ms(60);
    roueDroite_.avancerRoue(vitesseRobot_);
}


void MouvementRobot:: tournerAGauche()
{
    roueGauche_.arreterRoue();
    
    propulsionDroiteAv();
    roueDroite_.avancerRoue(130);
        
}


void MouvementRobot:: tournerADroite()
{
    roueDroite_.arreterRoue();

    propulsionGaucheAv();
    roueGauche_.avancerRoue(130);
}





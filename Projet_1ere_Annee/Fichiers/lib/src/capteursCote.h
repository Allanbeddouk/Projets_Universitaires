#ifndef CAPTEURSCOTE_H
#define CAPTEURSCOTE_H

#define F_CPU 8000000UL
#include <can.h>
#include <stdlib.h>
#include <avr/io.h>
#include<Sonorite.h>
#include<util/delay.h>

//#include "lcm_so1602dtr_m_fw.h"
//#include "customprocs.h"


class CapteursCote {

public:

	CapteursCote();
	void lireDistanceDroite();
	void lireDistanceGauche();

	uint16_t calculerLongeurMurDroite();
	uint16_t calculerLongeurMurGauche();

	void ajustementPositif(); 
	void ajustementNegatif(); 

	void calculerLongueurTotale(); 

	//getters
	uint16_t getLongueurGauche() const; 
	uint16_t getLongueurDroite() const; 

	uint16_t* getTabDroite();
	uint16_t* getTabGauche();

	uint16_t getPositionD() const;
	uint16_t getPositionG() const;

	
private:

	//droit
	
   	uint16_t distanceDroitePrecedante_;
   	uint16_t distanceDroiteActuelle_;
	
   	uint16_t distanceTotalDroite_;
	uint16_t tabDistancesDroite_[250];
	

	
	uint16_t positionD_;

	//gauche
	
	uint16_t distanceGauchePrecedente_;
    uint16_t distanceGaucheActuelle_;
	
	uint16_t distanceTotalGauche_;
	uint16_t tabDistancesGauche_[250];
	
	
	uint16_t positionG_;

	//autre
   	static const uint16_t CONSTANTE_ = 29761;
   	can convertisseur_;
	bool estADroite_; 
};








#endif 

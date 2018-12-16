#include "capteursCote.h"
#include <math.h>


CapteursCote::CapteursCote()
{
	positionD_ = 0;
	positionG_ = 0;
	estADroite_ = false; 
	distanceTotalGauche_=0;
	distanceTotalDroite_=0;
}

void CapteursCote::lireDistanceDroite()
{
	if(positionD_ >=300)
		return;

	uint8_t valeur = convertisseur_.lecture(PA6)>>2;


	distanceDroiteActuelle_ = CONSTANTE_/pow(valeur,1.106);

	if (distanceDroiteActuelle_ < 70){ 
		distanceDroiteActuelle_ = estADroite_ ? 230 : 70 ; 
		tabDistancesDroite_[positionD_] =distanceDroiteActuelle_; 
		positionD_++;
		return; 
	}

	if (distanceDroiteActuelle_ > 780){
		distanceDroiteActuelle_ = estADroite_ ? 940 : 780; 
		tabDistancesDroite_[positionD_] = distanceDroiteActuelle_; 
		positionD_++;
		return; 
	}
		tabDistancesDroite_[positionD_] = estADroite_ ? distanceDroiteActuelle_ + 160 : distanceDroiteActuelle_;

	
	
	positionD_++;
}



void CapteursCote::lireDistanceGauche()
{
	if(positionG_ >=300)
		return;

	uint8_t valeur= convertisseur_.lecture(PA7)>>2;

	

	distanceGaucheActuelle_ = CONSTANTE_/pow(valeur,1.106);

	if (distanceGaucheActuelle_ < 70){ 
		distanceGaucheActuelle_ = estADroite_ ? 70 : 230 ; 
		tabDistancesGauche_[positionG_] =distanceGaucheActuelle_; 
		positionG_++;
		return; 
	}

	if (distanceGaucheActuelle_ > 780){
		distanceGaucheActuelle_ = estADroite_ ? 780 : 940; 
		tabDistancesGauche_[positionG_] =distanceGaucheActuelle_; 
		positionG_++;
		return; 
	}

		tabDistancesGauche_[positionG_] = estADroite_ ? distanceGaucheActuelle_ : distanceGaucheActuelle_ + 160;

	positionG_++;
}




/*
*Methode : calculerLongueurTotale
*But : calculer la longueur totale des murs de droite et gauche 
*IN: /
*OUT: /
*/

void CapteursCote::calculerLongueurTotale() 
{
	//calcul du mur de droite 
	uint16_t distancePassee = 0;
	uint16_t distanceActuelle = 0;
	uint16_t hauteur = 1200/positionD_;
	uint16_t profondeur = 0;

	for (uint8_t i = 0; i < positionD_-1; i++) {
		distancePassee = tabDistancesDroite_[i]; 
		distanceActuelle = tabDistancesDroite_[i+1]; 
		profondeur = abs(distanceActuelle - distancePassee);
		distanceTotalDroite_ += sqrt(pow(hauteur, 2) + pow(profondeur, 2));
	}

	//calcul du mur de gauche

	
	for (uint8_t i = 0; i < positionG_-1; i++) {
		distancePassee = tabDistancesGauche_[i];
		distanceActuelle = tabDistancesGauche_[i+1];
		profondeur = abs(distanceActuelle - distancePassee);
		distanceTotalGauche_ += sqrt(pow(hauteur, 2) + pow(profondeur, 2));
		
	}

	distanceTotalGauche_/=10;
	distanceTotalDroite_/=10;


}

//getters des distances
uint16_t CapteursCote::getLongueurGauche() const {

	return distanceTotalGauche_; 
}

uint16_t CapteursCote::getLongueurDroite() const {
	return distanceTotalDroite_;
}




void CapteursCote::ajustementPositif() { 
	estADroite_ = true; 
}

void CapteursCote::ajustementNegatif() { 
	estADroite_ = false; 
}


uint16_t* CapteursCote::getTabDroite(){
	return tabDistancesDroite_;
}

uint16_t* CapteursCote::getTabGauche(){
	return tabDistancesGauche_;
}

uint16_t CapteursCote::getPositionD() const{
	return positionD_;
}

uint16_t CapteursCote::getPositionG() const{
	return positionG_;
}




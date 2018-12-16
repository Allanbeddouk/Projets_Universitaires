#ifndef AFFICHAGE_UART_H
#define AFFICHAGE_UART_H

#include "affichageUART.h"
const uint8_t TAILLE_TERMINAL=95;



void afficherMapMur(uint16_t distanceG, uint16_t distanceD){
	// Cote Gauche

	uint8_t nbEspaces = (distanceG/6.22); 
	uint8_t nbAcom = TAILLE_TERMINAL - nbEspaces; 
	
	for (int j = 0; j < nbAcom; j++) {
		transmissionUART('@');
	}
	for (int j = 0; j < nbEspaces; j++) {
		transmissionUART(' ');
	}
	transmissionUART('|'); transmissionUART('|'); // Bande centrale
	
	//Cote droit
	nbEspaces = (distanceD/6.22);
	nbAcom = TAILLE_TERMINAL- nbEspaces;
	for (int j = 0; j < nbEspaces; j++) {
		transmissionUART(' ');
	}
	for (int j = 0; j < nbAcom; j++) {
		transmissionUART('@');
	}
	transmissionUART('\n'); 
}


#endif

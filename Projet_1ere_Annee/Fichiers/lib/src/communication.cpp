/*
  * Fichier : commmunication.cpp 
  * Auteurs : 
  * Version : 1.0
  * Date premiere version : 23 octobre 2018
  * Description : Ce fichier contient toutes les fonctions necessaires a la bonne 
  * communication de donnees entre la puce, la memoire ROM, la memoire flash et l'ordinateur. 
  * Il est accompagné des fichiers memoire_24.h et .cpp. 
 */

#include"communication.h"
#include "memoire_24.h"

/*
  * fonction : initialisationUART 
  * Description : initialise les registres (format 8 bits avec 1 bit d'arret)
  * IN : /
  * OUT : /
*/

void initialisationUART() {
    UBRR0H = 0;
	UBRR0L = 0xCF;
	UCSR0A = 0;
    UCSR0B |= _BV(RXEN0) /*pemet la reception*/| _BV(TXEN0); /*permet la transmission*/
	/*Format de trames : 8bits, un bit stop, parite non asynchrone*/
}
 
/*
  * Fonction : transmissionUART
  * Description :  permet de transmettre la donnee au buffer
  * IN : data, type uint8_t 
  * OUT : /
*/
/*Code provient du docAtmel p.174*/
void transmissionUART(uint8_t data)
{
	/* Attendre que le buffer soit vide */
    while (!(UCSR0A & (1 << UDRE0))); /*Compare le registre courant a sa valeur, dans le cas ou il serait vide*/
    
	/* Mettre la donnee a transmettre dans le buffer*/
	UDR0 = data;
}


/*
  * Fonction : transmissionPC
  * Description : Transmet les valeurs au pc, permettant alors de les afficher sur le terminal
  * IN : data, type : uint8_t* 
  * OUT : /
*/
void transmissionPC(uint8_t* data) {
	for (uint8_t j = 0; j < 100; j++)
		for (uint8_t i = 0; i < sizeof(data) / sizeof(uint8_t); i++)
			transmissionUART(data[i]);
}

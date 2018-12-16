/*
 *Fichier  : communication.h
 * Code developpe par Allan Beddouk, Kevin Ciliento, Roman Zhornytskiy et David Dratwa. Copyright � 2018
 * Version : 1.0
 * Date premier version : 23 octobre 2018
 * Description :
 * Contient les en-tetes de fonctions de Communication.cpp
 */

#include <avr/io.h>
#define F_CPU 8000000
#include <util/delay.h>
/*
  * fonction : initialisationUART 
  * Description : initialise les registres (format 8 bits avec 1 bit d'arret)
  * IN : /
  * OUT : /
*/
 void initialisationUART();
 /*
  * Fonction : transmissionUART
  * Description :  permet de transmettre la donnee au buffer
  * IN : data, type uint8_t 
  * OUT : /
*/
 void transmissionUART(uint8_t data); 

 /*
  * Fonction : transmissionPC
  * Description : Transmet les valeurs au pc, permettant alors de les afficher sur le terminal
  * IN : data, type : uint8_t* 
  * OUT : /
*/
void transmissionPC(uint8_t* data);

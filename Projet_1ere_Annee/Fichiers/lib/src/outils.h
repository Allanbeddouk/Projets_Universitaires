/****************************************************************************
* Fichier:outils.h 
* Auteurs: Allan Deddouk, Kevin Ciliento, David Dratwa, Roman Zhornytskiy
* Date de cr�ation: 16 octobre 2018
* Modifications: n/a
* Description: Ce fichier est contient des fonctions g�n�rales.
****************************************************************************/

#include <avr/io.h>
#define F_CPU 8000000
#include <util/delay.h>

#define IN 0x00		//Met le port en entr�e
#define OUT 0xFF	//Met le port en sortie
#define EVER (;;)	//Parametres boucle infinie
#define PUSHED (PIND & 0X04)
bool antiRebond();

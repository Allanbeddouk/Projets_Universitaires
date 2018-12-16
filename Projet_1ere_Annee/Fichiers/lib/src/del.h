/*
 * Fichier  : del.h
 * Code developpe par Allan Beddouk, Kevin Ciliento, Roman Zhornytskiy et David Dratwa. Copyright � 2018
 * Version : 1.0
 * Date premier version : 20 octobre 2018
 * Description :
 * Le code suivant defini l'interface d'une del utilisee sur la carte mere fournie dans le cadre
 * du cours INF1900 (Polytechnique Montreal).
 * Son bon fonctionnement n�cessite que la del soit branchee sur le PORT B (pin 1 et 2)
 * et que son port soit defini en sortie.
*/
#define F_CPU 8000000
#include <avr/io.h>
#include <util/delay.h>
//#include <outils.h>
#include "MouvementRobot.h"


#ifndef DEL_H
#define DEL_H
#define VERT 0x02
#define ROUGE 0x01
#define ETEINT 0x00



	/*
	Represente l'etat courant de la del
	*/

	enum Etat {Vert, Rouge, Ambre, Eteint};

	class Del {
	public : 
		/*
		Constucteur par defaut de la del (assigne la del a eteint)
		*/
		Del();

		/*
		Constructeur par parametres de la del (l'etat ambre ne sera pas pris en compte) 
		*/ 
		Del(Etat etat);

		/*
		Methode d'acces a l'attribut etat_ (type Etat) 
		*/
		Etat getEtat() const; 

		/*
		allumer la del dans une couleur (passee en parametre) durant un temps indefini (jusqu'a ce qu'elle soit eteinte), ne prend pas en compte la couleur ambre
		*/
		void allumer(Etat etat); 

		/*
		allume la del durant un temps defini en secondes
		*/
		void allumer(Etat etat, uint8_t temps); 

		/*
		eteint la del 
		*/
		void eteindre(); 
		
		bool estAllume_;

	private : 
		Etat etat_; 

	};


#endif // !DEL_H

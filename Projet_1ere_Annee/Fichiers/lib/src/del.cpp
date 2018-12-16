/*
 * Fichier : del.cpp
 * Code developpe par Allan Beddouk, Kevin Ciliento, Roman Zhornytskiy et David Dratwa. Copyright © 2018
 * Version : 1.0
 * Date premier version : 20 octobre 2018
 * Description : implementation de la classe Del
*/



#include "del.h"



/*
* Methode : del
* Description : Constructeur par defaut (eteint) 
* IN : /
* OUT : /
*/
Del::Del() :estAllume_(false){
	PORTB = ETEINT; 
	etat_ = Eteint;
}

/*
* Methode : del
* Description : Constructeur par parametre 
* IN : etat, type : Etat (enum)
* OUT : /
*/
Del::Del(Etat etat) {
	switch (etat)
	{
	case Vert:
		etat_ = Vert; 
		PORTB = VERT;
		estAllume_=true;
		break;
	case Rouge:
		etat_ = Rouge; 
		PORTB = ROUGE; 
		estAllume_=true;
		break;
	case Ambre:
		etat_ = Eteint;
		break;
	case Eteint:
		etat_ = Eteint;
		break;
	}
}

/*
* Methode : getEtat
* Description : retourne l'etat courant de la del 
* IN : /
* OUT : etat_, type : Etat (enum) 
*/
Etat Del::getEtat() const {
	return etat_; 
}

/*
* Methode : allumer
* Description : Allume la del pour un temps indefini 
* IN : etat, type : Etat (enum)
* OUT : /
*/
void Del::allumer(Etat etat) {
	switch (etat)
	{
	case Vert:
		etat_ = Vert;
		PORTB = VERT;
		estAllume_=true;
		break;
	case Rouge:
		etat_ = Rouge;
		PORTB = ROUGE;
		estAllume_=true;
		break;
	case Ambre:
		etat_ = Eteint;
		PORTB = ETEINT;
		break;
	case Eteint:
		etat_ = Eteint;
		PORTB = ETEINT;
		break;
	}
}


/*
* Methode : allumer
* Description :Permet d'allumer la del durant un temps defini en secondes.
* Une fois le temps ecoule, la del se rallume dans la couleur definie avant l'appel de cette methode. 
* IN : 
* etat, type : Etat (enum)
* temps, type : double
* OUT : /
*/
void Del::allumer(Etat etat, uint8_t temps) {
	
	Etat temp=Eteint;
	switch (etat)
	{
	case Vert:
		temp = etat_;
		etat_ = Vert;
		PORTB = VERT;
	   for(int i=0;i<temps;i++){
	   	_delay_ms(1000);
	   }
		allumer(temp);
		break;
	case Rouge:
		 temp = etat_; 
		etat_ = Rouge; 
		PORTB = ROUGE;
		 for(int i=0;i<temps;i++){
	   	_delay_ms(1000);
	   }
		allumer(temp); 
		break;
	case Ambre:
		 temp = etat_;
		etat_ = Ambre;
		for (int i = 0; i < 100 * temps; i++) {
			PORTB = VERT; 
			_delay_ms(5); 
			PORTB = ROUGE; 
			_delay_ms(5); 
		}
		allumer(temp);
		break;
	case Eteint:
		 temp = etat_; 
		etat_ = Eteint; 
		PORTB = ETEINT; 
		 for(int i=0;i<temps;i++){
	   	_delay_ms(1000);
	   }
		allumer(temp);
		break;
	}
}

/*
* Methode : eteindre
* Description : Eteint la del
* IN : /
* OUT : /
*/
void Del::eteindre(){
	PORTB = ETEINT;
	etat_ = Eteint; 
}

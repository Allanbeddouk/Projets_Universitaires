/****************************************************************************
* Fichier:		timer.h
* Auteurs: 		Allan Beddouk, Kevin Ciliento, David Dratwa, Roman Zhornytskiy
* Date:			15 novembre 2018
* Description:	Implementation de la classe Timer
****************************************************************************/
#define FREQUENCE_PAR_SECONDE 7812
#define TEMPS_CENTRE_ROTATION 0 

#ifndef TIMER_H
#define TIMER_H



#include <avr/io.h>
#include <avr/interrupt.h>
class Timer {
public:

	/*CONSTRUCTEURS*/
	Timer(); 
	Timer(const uint16_t& temps); //Permet d'initialiser le Timer a un certain temps

	/*METHODES D'ACCES*/
	uint16_t getMinuterie() const;
	uint16_t getTemps() const;
	uint8_t getIteration() const;

	/*METHODES DE MODIFICATION*/
	void partirMinuterie();
	void partirChronometre();
	void arreterTimer(); 
	void resetTimer();
	
	/*OPERATEURS*/
	void operator()(const uint16_t& temps); 
	void operator--(int); 
	void operator++(int); 

		/*METHODE DE CALCUL*/
	uint16_t convertirTemps( const uint16_t& temps) ; 
	uint16_t convertirMinuterie(const uint16_t& minuterie); 
	void setOverFlow(); 
private:



	/*ATTRIBUTS*/
	uint16_t temps_;	 //temps en ms 
	uint16_t iterationOverFlow_;//Indique le nombre de fois que le timer doit overFlow
	uint16_t minuterie_; //temps convertit en bit
	bool etatTimer_;	//Indique si le timer est actif
	bool etatOverFlow_;	//Indique si on s'attend a un overflow (TCNT2 == 255) dans la sequence du Timer

};
#endif // TIMER_H


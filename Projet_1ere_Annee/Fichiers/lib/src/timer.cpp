/****************************************************************************
* Fichier:		timer.cpp
* Auteurs: 		Allan Beddouk, Kevin Ciliento, David Dratwa, Roman Zhornytskiy
* Date:			15 novembre 2018
* Description:	Definition de la classe Timer
****************************************************************************/
#include "timer.h"


/****************************************************************************
* Fonction:		Timer::Timer()
* Description:	Constructeur par defaut
				1. Compteur/Timer et valeur de comparaison @ 0
				2. Mode CTC 
				3. Sans WaveformGenerator (deja � 0)
				4. Prescaleur @ 0 car il n'est pas tout de suite parti
				5. Fonction set les attributs lié à l'overflow
* Param�tres:	- aucun
* Retour:		- aucun
****************************************************************************/
Timer::Timer()
{
	cli();
	/*INITIALISATION DES REGISTRES*/
	TCNT2 =0; //Point 1. description
	TCCR2A |= _BV(WGM21); //Mode CTC 
	TCCR2B &= ~(_BV(CS22)|_BV(CS21)|_BV(CS20)); //Point 4. description
	TIMSK2 |= _BV(OCIE2A) ;
	/*INITIALISATION DES ATTRIBUTS*/
	resetTimer();
	sei();
}

//Permet d'initialiser les attributs selon la durée MAIS n'active PAS le timer
Timer::Timer(const uint16_t & temps)
{
	/*INITIALISATION DES REGISTRES*/
	/*INITIALISATION DES REGISTRES*/
	TCNT2 =0; //Point 1. description
	TCCR2A |= _BV(WGM21); //Mode CTC 
	TCCR2B &= ~(_BV(CS22)|_BV(CS21)|_BV(CS20)); //Point 4. description
	TIMSK2 |= _BV(OCIE2A); 
	/*INITIALISATION DES ATTRIBUTS*/
	temps_= temps;
	//minuterie_ = convertirTemps(temps);
	etatTimer_ = false;
	setOverFlow();
	sei();
}

//Retourne le temps converti en bit
uint16_t Timer::getMinuterie() const
{
	return minuterie_;
}

//Retourne le temps en ms
uint16_t Timer::getTemps() const
{
	return temps_;
}

uint8_t Timer::getIteration() const
{
	return iterationOverFlow_;
}

//Permet de partir le compteur
void Timer::partirMinuterie()
{
	if(etatTimer_==true)
		return;

	else
	{
		TCCR2B |= _BV(CS22)|_BV(CS21)|_BV(CS20);
		etatTimer_ = true;
	}

}

//Part la minuterie avec la valeur de OCR2A au maximum
void Timer::partirChronometre()
{
	partirMinuterie();
	OCR2A=255;
}

//Arrête le timer
void Timer::arreterTimer()
{
	if(etatTimer_== false)
		return;

	else
	{
		TCCR2B &= ~(_BV(CS22)|_BV(CS21)|_BV(CS20));
		etatTimer_ = false;
	}
}

//Met le timer à son état inital
void Timer::resetTimer()
{
	minuterie_ = temps_ = 0;
	etatTimer_ = false;
	setOverFlow(); 
}

//Met la minuterie avec une duree en ms
void Timer::operator()(const uint16_t & temps)
{
	temps_ = temps; // temps en ms
	minuterie_ = convertirTemps(temps); // "temps" en bit 
	setOverFlow();
	partirMinuterie();
}

//Permet de décrémenté la valeur de l'overFlow
void Timer::operator--(int)
{
	iterationOverFlow_--;
}

//Permet d'incrémenté la valeur de l'overflow de l'objet
void Timer::operator++(int)
{
	iterationOverFlow_++;
}

//Converti le temps en minuterie (bits)
uint16_t Timer::convertirTemps( const uint16_t& temps) 
{
	return ((FREQUENCE_PAR_SECONDE * temps) / 1000); //Retourne la valeur en bit pour un temps donné
}

//Converti la minuterie en temps (ms)
uint16_t Timer::convertirMinuterie(const uint16_t& minuterie)
{
	return (1000*(minuterie/FREQUENCE_PAR_SECONDE)); //Retourne la valeur de temps pour une valeur en bit donné
}

//Initialise les variables liées à l'overFlow
void Timer::setOverFlow()
{
	if (temps_ <= 32){
		OCR2A = 80; // Valeur fixe si le temps < 32 ms => 10ms par operation
		etatOverFlow_= false;
		iterationOverFlow_ = 0;
	}
	

	else if((temps_ > 32)){ 
		OCR2A = 255;
		etatOverFlow_=true;
		iterationOverFlow_= temps_/32;
	}
}

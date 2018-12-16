/****************************************************************************
 * Fichier:			sonorite.cpp
 * Auteurs: 		Allan Beddouk, Kevin Ciliento, David Dratwa,
 *					Roman Zhornytskiy
 * Date:			30 Octobre 2018
 * Modifications:	6 Novembre 2018
 * Description:		Impl�mentation de la classe Sonorite
 ****************************************************************************/
#include "Sonorite.h"

 /****************************************************************************
 * Fonction:	Sonorite::Sonorite()
 * Description: Constructeur par d�faut.
				1. Mets les registres du TIMER0 en mode:
					1.1. Compare Output mode (OC0A)
						+Toggle OC0A on Compare Match (PWM en mode CTC)

					1.2. Mode CTC

					1.3. 256 bits presclaler 
						+ Plus grand domaine de notes 
				2. Operations sur le PORTB :
						2.1 : Mettre le PORTB en sortie pour OC0A

						2.2 : "Ground" la broche 3 (PB2)
 * Addition :	Utilis� avec la PORT PB3 (broche 4 du PORTB) page de r�f :
				p.(91-106) Atmel
 * Param�tres:	- aucun
 * Retour:		- aucun
 ****************************************************************************/
Sonorite::Sonorite() {

	DDRB	= OUT;			//Point 2.1 description
	PORTB	&= ~_BV(PB2);	// Point 2.2 description

	TCCR0A	|= _BV(COM0A0)	
			| _BV(WGM01);	//Point 1.2. descriptionPoint 1.1. description

	TCCR0B	|= _BV(CS02);	//Point 1.3. description

	/*VALEUR PAR D�FAUT DES ATTRIBUTS*/
	OCR0A_ = 0;
	operandeMidi_ = 0;
	arreter(); 
	frequenceCPU_ = F_CPU;
	
}

/****************************************************************************
* Fonction:		Sonorite::getOCR0A() const
* Description:	Méthode d'accès de l'attribut OCR0A_
* Paramètres:	- aucun
* Retour:		- uint8_t : OCR0A_
****************************************************************************/
uint8_t Sonorite::getOCR0A() const
{
	return OCR0A_;
}

/****************************************************************************
* Fonction:		Sonorite::getOperandeMidi() const
* Description:	Méthode d'accès de l'attribut operandeMidi_
* Paramètres:	- aucun
* Retour:		- uint8_t : operandeMidi_
****************************************************************************/
uint8_t Sonorite::getOperandeMidi() const
{
	return operandeMidi_;
}

/****************************************************************************
* Fonction:		Sonorite::getDiviseurHorloge() const
* Description:	Méthode d'accès de l'attribut diviseurHorloge_
* Paramètres:	- aucun
* Retour:		- uint16_t : diviseurHorloge_
****************************************************************************/
uint16_t Sonorite::getDiviseurHorloge() const
{
	return diviseurHorloge_;
}

/****************************************************************************
* Fonction:		Sonorite::getFrequenceCPU_() const
* Description:	Méthode d'accès de l'attribut frequenceCPU_
* Paramètres:	- aucun
* Retour:		- uint16_t : frequenceCPU_
****************************************************************************/
uint16_t Sonorite::getFrequenceCPU_() const
{
	return frequenceCPU_;
}

/****************************************************************************
* Fonction:		Sonorite::getFrequenceCPU_() const
* Description:	Méthode de modification de l'attribut OCR0A_ et operandeMidi_
				1. Permet, en fonction de la note, de "set" le registre OCR0A
				2. Si la note n'est pas dans le domaine couvert :
					2.1. Si l'attribut a sa valeur inital, ne pas faire de son
					2.2. Si 2.1 FAUX, jouer la dernière note inscrite
* Paramètres:	- const uint8_t & : midi	[IN]
* Retour:		- aucun
****************************************************************************/
void Sonorite::setOCR0A(const uint8_t & midi)
{
	setOperandeMidi(midi);
	if(midi<=34 && midi>=11){
		setDiviseurHorloge(1024);
		OCR0A_ = valeur1024OCR0A[midi-11];
		OCR0A = OCR0A_;
	}

	else if(midi <= 85 && midi >= 35){
		setDiviseurHorloge(256);
		OCR0A_ = valeurStandardOCR0A[midi - 35];
		OCR0A = OCR0A_;
	}
		

	else if (midi <= 109 && midi >= 86){
		setDiviseurHorloge(64);
		OCR0A_ = valeur64OCR0A[midi - 86];
		OCR0A = OCR0A_;
	}
		

	else if (midi <= 128 && midi >= 110){
		setDiviseurHorloge(8);
		OCR0A_ = valeur8OCR0A[midi - 110];
		}
	else if(midi<=11 && midi >= 128 )
		{
			if(OCR0A_==0){ // Valeur de base de l'attribut
				Sonorite::arreter(); // Arrête le Timer/Counter 0
			}
			else 
				OCR0A = OCR0A_; // Garder la même note
		}
}

/****************************************************************************
* Fonction:		Sonorite::setOperandeMidi(const uint8_t & midi)
* Description:	Méthode de modification de l'attribut operandeMidi_
* Paramètres:	- const uint8_t & midi [IN]
* Retour:		- aucun
****************************************************************************/
void Sonorite::setOperandeMidi(const uint8_t & midi)
{
	operandeMidi_ = midi;
}
/****************************************************************************
* Fonction:		Sonorite::setDiviseurHorloge(const uint16_t & diviseurHorloge)
* Description:	Méthode de modification de l'attribut diviseurHorloge_
*					+ Change le prescaleur du TIMER0
* Paramètres:	- const uint16_t & : diviseurHorloge [IN]
* Retour:		- aucun
****************************************************************************/
void Sonorite::setDiviseurHorloge(const uint16_t & diviseurHorloge)
{
	//Reset des registres de clock (les trois
	//bits les moins significatifs sont les registres de clk
	TCCR0B &= 0b11111000;

	if (diviseurHorloge == 8 ){// Midi : 110-128
		TCCR0B |= _BV(CS01);
	}
	else if (diviseurHorloge == 64) { //Midi :  86-109
		TCCR0B |= _BV(CS01) | _BV(CS00);
	}
	else if (diviseurHorloge == 256) { //Midi :  35-85, clk par defaut
		TCCR0B |= _BV(CS02);
	}
	else if (diviseurHorloge == 1024) { //Midi :  11-34, 
		TCCR0B |= _BV(CS02) | _BV(CS00);
	}
	else if (diviseurHorloge == 0) { // on fait arreter le Timer/Counter 0 
		TCCR0B &= 0b11111000;
		TCNT0=0;
	}
	diviseurHorloge_ = diviseurHorloge;
}

/****************************************************************************
* Fonction:		Sonorite::arreter()
* Description:	Arrête le compteur en lui retirant sa source de clock
* Paramètres:	- aucun
* Retour:		- aucun
****************************************************************************/
void Sonorite::arreter()
{
	setDiviseurHorloge(0);
}


void Sonorite:: jouerMusiqueRocky()
{
	setOCR0A(65);   
	_delay_ms(150);     
	arreter();
	_delay_ms(30);
	setOCR0A(68);   
	_delay_ms(300);     
	arreter();
	_delay_ms(30);
	setOCR0A(70);   
	_delay_ms(1000);     
	arreter(); 
	_delay_ms(100);

	setOCR0A(60);   
	_delay_ms(150);     
	arreter();
	_delay_ms(30);
	setOCR0A(63);   
	_delay_ms(300);     
	arreter();
	_delay_ms(30);
	setOCR0A(60);   
	_delay_ms(1000);     
	arreter(); 
	_delay_ms(100);


	setOCR0A(65);  
	_delay_ms(150);    
	arreter();
	_delay_ms(30);
	setOCR0A(68);   
	_delay_ms(300);     
	arreter();
	_delay_ms(30);
	setOCR0A(70);   
	_delay_ms(1270);     
	arreter(); 
	
}

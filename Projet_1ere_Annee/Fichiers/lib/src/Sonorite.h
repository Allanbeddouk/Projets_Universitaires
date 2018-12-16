/****************************************************************************
 * Fichier:			sonorite.h
 * Auteurs: 		Allan Beddouk, Kevin Ciliento, David Dratwa, Roman Zhornytskiy
 * Date:			30 Octobre 2018
 * Description:	D�finition de la classe Sonorite
 ****************************************************************************/
#pragma once
#define F_CPU 8000000UL
#include <avr/io.h>
#include <util/delay.h>
#define OUT 0xFF

// Pour la future implémentation d'une mélodie
enum Duree { ronde, blanche, noire, croche,	doubleCroche };



class Sonorite{
public:
	/*VALEURS OCR0A*/
/*****************************************************************************
* Le tableau repr�sentes les valeurs de OCR0A en fonction de deux formules :
* Soit	: f_n = 440 * 2^((midi-69)/12)
* Et	: f_OCR0A = f_clk/(2*N(1+OCR0A))
* Puisque la fréquence sortant de PB3 (OR0A) est la même que celle d'une note\
* Midi, alors f_n = f_OCR0A. À partir de cette information on peut facilement\
* isoler OCR0A pour formuler un fonction qui dépend de la note Midi, soit :
* OCR0A =	f_clk/[2 * N * f_ref * 2 ^ ((midi-note_ref)/(nbDemi_ton/octave))]
*  où : => f_clk	= 8 MHz
*		=> N		= prescaler
*		=> f_ref	= Généralement midi 69 donc : 440Hz
*		=> midi		= Note variable de [0 , 128]
*		=> note_ref = Généralement 69
*		=> nbDemi_ton/octave = Il y a 12 demi-tons par octave
*****************************************************************************/
	//Notes Midi 110-128
	uint8_t valeur8OCR0A[20]{
	105,	99,		94,		88,		83,
	79,		74,		70,		66,		62 ,
	59,		55 ,	52,		49,		46 ,
	44,		41,		39,		37
	};
	//Notes Midi 86-109
	uint8_t valeur64OCR0A[24]{
	52,		49,		46,		44,		41,		39,
	37,		35,		33,		31,		29,		27,
	26,		24,		23,		21,		20,		19,
	18,		17,		16,		15,		14,		13
	};
	//Notes Midi 35-85
	uint8_t valeurStandardOCR0A[51] = {
	252,	238,	224,	212,
	200,	189,	178,	168,	158,	149,
	141,	133,	126,	118,	112,	105,
	99,		94,		88,		83,		79,		74,
	70,		66,		62,		59,		55,		52,
	49,		46,		44,		41,		39,		37,
	35,		33,		31,		29,		27,		26,
	24,		23,		21,		20,		19,		18,
	17,		16,		15,		14,		13
	};
	//Notes Midi de 11-34
	uint8_t valeur1024OCR0A[24]{ 
		252,	238,	224,	212,	200,	189,
		178,	168,	158,	149,	141,	133,
		126,	118,	112,	105,	99,		94 ,
		88,		83 ,	79 ,	74 ,	70 ,	66
	};
	/*CONSTRUCTEUR*/
	Sonorite();

	/*M�THODES D'ACC�S*/
	uint8_t getOCR0A() const;
	uint8_t getOperandeMidi() const;
	uint16_t getDiviseurHorloge() const;
	uint16_t getFrequenceCPU_() const;

	/*M�THODES DE MODIFICATIONS*/
	void setOCR0A(const uint8_t& midi);
	void setOperandeMidi(const uint8_t& midi);
	void setDiviseurHorloge(const uint16_t& diviseurHorloge);
	void arreter();
	void jouerMusiqueRocky();
	
private:
	/*ATTRIBUTS*/
	//Ils sont surtout utile si on veut faire un débug afin d'afficher 
	//facilement les valeurs 
	uint8_t OCR0A_;
	uint8_t	operandeMidi_;
	uint16_t diviseurHorloge_;	//16 bits car 1 prescaler à 1024
	uint32_t frequenceCPU_;		//32 bits car f_clk = 8 000 000
	uint8_t duree_;				
	
};
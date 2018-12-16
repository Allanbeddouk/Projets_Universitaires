/*
Fichier : Caractere.h
Auteurs : Allan Beddouk, Robin Canton-Lamousse et David Dratwa
Date denriere modif : 29 Novembre 2018
*/

#pragma once

#ifndef CARACTERE_H
#define CARACTERE_H

#include<vector>
#include <string>

using namespace std; 

class Caractere {
public:  
	//construct 
    Caractere(char valeurCaractere = ' ') : valeurCaractere_(valeurCaractere), estFinal_(false) {};

	//get et set 
	void setValeurCaractere(char valeurCaractere);
	vector<Caractere*>& getCaracteres() { return caracteres_; };
	char getValeurCaractere() const;
	void setFinal() ; 
	bool getEstFinal() const; 

	//methodes en plus 

	
	bool contientChar(char valeurCaractere) const;
	void ajouterMot(const string& mot, int index); 
	int positionChar(char valeurCaractere) const;
	vector<string>* getLexique(const string& mot, int index, vector<string>* lexique= new vector<string>() ) ;

	vector<string>* ajouterMotDerives(const string& mot, vector<string>* vect); 

private : 
	bool estFinal_; 
	char valeurCaractere_;
	vector<Caractere*> caracteres_;
};

#endif // !NODE_H

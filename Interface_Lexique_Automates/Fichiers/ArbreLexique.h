/*
Fichier :ArbreLexique.h
Auteurs : Allan Beddouk, Robin Canton-Lamousse et David Dratwa
Date denriere modif : 29 Novembre 2018
*/

#pragma once

#ifndef ARBRELEXIQUE_H
#define ARBRELEXIQUE_H

#include "Caractere.h"

#include <fstream>

using namespace std; 

class ArbreLexique {
public:

	//constructeur 
	ArbreLexique(const string& nomFichier); 

	vector<string>* getOccurences(const string& mot);


private:
	Caractere caractere_;
};

#endif // !TREE_H


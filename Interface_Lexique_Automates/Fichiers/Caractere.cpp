/*
Fichier : Caractere.cpp
Auteurs : Allan Beddouk, Robin Canton-Lamousse et David Dratwa
Date denriere modif : 29 Novembre 2018
*/

#include "Caractere.h"

//get et set 
void Caractere::setValeurCaractere(char valeurCaractere)
{
	valeurCaractere_ = valeurCaractere;
}

char Caractere::getValeurCaractere() const
{
	return valeurCaractere_;
}

void Caractere::setFinal()
{
	estFinal_ = true; 
}

bool Caractere::getEstFinal() const
{
	return estFinal_; 
}

//methodes en plus 
/*
Methode :contientChar 
IN : un char 
OUT : un boolean
But : retourne true si le char passe en parametre est dans son vecteur de caracteres
*/
bool Caractere::contientChar(char valeurCaractere) const
{
	bool trouve = false; 
	for (int i = 0; i < caracteres_.size(); i++)
    {
		if (caracteres_[i]->valeurCaractere_ == valeurCaractere)
			trouve = true; 
	}
	return trouve; 
}

/*
Methode : positionChar
IN :char
OUT : int 
But : retourne la position du caractere  dans le vecteur de caracteres
*/
int Caractere::positionChar(char valeurCaractere) const
{
	int position = -1; 
	for (int i = 0; i < caracteres_.size(); i++)
    {
		if (caracteres_[i]->getValeurCaractere() == valeurCaractere)
			position = i; 
	}
	return position; 
}



/*
Methode : ajouterMot 
IN : un string (le mot a ajouter )
OUT : /
But : Permet d'ajouter un mot et de l'ajouter dans l'arbre de caracteres
caractere par caractere (en commencant par le caractere 
position a la position 'index' du mot)
*/
void Caractere::ajouterMot(const string& mot, int index)
{
	bool continuer = true; 
	if (!this->contientChar(mot[index]) && index +1  <= mot.size())
    {
		caracteres_.push_back(new Caractere(mot[index]));
		ajouterMot(mot, index); 
		continuer = false; 

	}
	else if (this->contientChar(mot[index]) && index+1 <= mot.size() && continuer)
    {
		int position = this->positionChar(mot[index]); 
		caracteres_[position]->ajouterMot(mot, index+1);
	}
	if (index == mot.size())
		setFinal(); 
}

/*
Methode :getLexique 
IN : string mot : les premieres lettres des mots qu'on recherche,
int index : la position du premier caractere que nous voulons prendre en compte dans
le mot, 
vector<string>* lexique : le vecteur qui contiendra les mots en questions 
OUT : vector<string>* 
But : Charger les mots ayant le meme prefixe que le parametre mot
*/
vector<string>* Caractere::getLexique(const string& mot, int index, vector<string>* lexique)
{
	string motLexique; 

	if (contientChar(mot[index]))
    {
		int position = positionChar(mot[index]); 
		if (index + 1 == mot.size())
        {
			motLexique = mot;
			motLexique.pop_back(); 
			lexique = caracteres_[position]->ajouterMotDerives(motLexique, lexique);
			return lexique; 
		}
		else
        {
			motLexique += valeurCaractere_;
			caracteres_[position]->getLexique(mot, index + 1, lexique);
		}
	}
	
	return lexique; 
}

/*
Methode : ajouterMotDerive 
IN : string mot, vector<string>
OUT : vector<string>* 
But : Complete la methode getLexique en ajoutant les mots dans le vecteur 
passe en param 
*/

vector<string>* Caractere::ajouterMotDerives(const string& mot, vector<string>* vect)
{
	string motLexique = mot;  
	string temp = mot; 
	motLexique += getValeurCaractere();
	if (caracteres_.size() == 0 && estFinal_)
		vect->push_back(motLexique);
	else if (estFinal_ && caracteres_.size() != 0)
    {
		vect->push_back(motLexique);
		for (int i = 0; i < caracteres_.size(); i++)
			vect = caracteres_[i]->ajouterMotDerives(motLexique, vect);
	}
	else
    {
		for (int i = 0; i < caracteres_.size(); i++)
			vect = caracteres_[i]->ajouterMotDerives(motLexique, vect);  
	}

	return vect; 
}

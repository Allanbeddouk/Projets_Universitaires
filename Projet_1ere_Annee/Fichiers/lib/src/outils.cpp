/****************************************************************************
* Fichier:outils.cpp 
* Auteurs: Allan Deddouk, Kevin Ciliento, David Dratwa, Roman Zhornytskiy
* Date de cr�ation: 16 octobre 2018
* Modifications: n/a
* Description: Ce fichier est contient des fonctions g�n�rales.
****************************************************************************/

#include "outils.h"


bool antiRebond()
{
	if (PUSHED)
	{
		_delay_ms(10.0);
		if (PUSHED)
			return true;
	}
	return false;
}




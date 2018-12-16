/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#pragma once
#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <vector>

#include "Graphe.h"
/*
 * Description : Fonction qui cree un graphe et qui ouvre le menu principal
 * Parametres : aucun
 * Retour : aucun
 */
void initialiserProgramme(); 


/*
 * Description : Fonction qui gere le menu principal, avec 3 sous menus A, B et C en fonction de l'option choisie par l'utilisateur
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les options du menu)
 */
void menuPrincipal(Graphe* graphe); 


/*
 * Description : Fonction qui gere le sous menu A
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les sous-options du menu)
 */
void menuA(Graphe* graphe);

/*
 * Description : Fonction qui gere le sous menu B
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les sous-options du menu)
 */
void menuB(Graphe* graphe);

/*
 * Description : Fonction qui gere le sous menu C
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les sous-options du menu)
 */
void menuC(Graphe* graphe);

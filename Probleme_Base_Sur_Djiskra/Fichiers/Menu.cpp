/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#include "Menu.h"
#include <exception>


/*
 * Description : Fonction qui cree un graphe et qui ouvre le menu principal
 * Parametres : aucun
 * Retour : aucun
*/
void initialiserProgramme() {
	cout << "*****************Bienvenue*****************" << endl; 
	Graphe* graphe = nullptr;
	menuPrincipal(graphe); 
}

/*
 * Description : Fonction qui gere le menu principal, avec 3 sous menus A, B et C en fonction de l'option choisie par l'utilisateur
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les options du menu)
*/
void menuPrincipal(Graphe* graphe) {
	cout << endl << "Que voulez-vous faire ? " << endl; 
	cout << "\t a. Mettre a jour la carte" << endl; 
	cout << "\t b. Determiner le plus court chemin securitaire" << endl; 
	cout << "\t c. Extraire un sous-graphe" << endl; 
	cout << "\t d. Quitter" << endl; 

	while (true) {
		string entree;
		cout << "Entrer votre choix : "; 
		cin >> entree;

		if (entree.size() != 1) {
            cout << "Attention :: Veuillez entrer un seul caractere" << endl;
		}

		else if (
			entree[0] != 'a' && entree[0] != 'b' && entree[0] != 'c'
			&& entree[0] != 'd' && entree[0] != 'A' && entree[0] != 'B'
			&& entree[0] != 'C' && entree[0] != 'D') {
            cout << "Attention :: l'option que vous avez choisi n'existe pas, veuillez recommencer : " << endl;
		}
		else {
	
				if (entree[0] == 'a' || entree[0] == 'A') {
					menuA(graphe);
				}
				else if ((entree[0] == 'b' || entree[0] == 'B') && graphe != nullptr) {
					
						menuB(graphe);
						menuPrincipal(graphe);
				}
				else if ((entree[0] == 'c' || entree[0] == 'C') && graphe != nullptr) {
					menuC(graphe);
					menuPrincipal(graphe);
				}
				else if (entree[0] == 'd' || entree[0] == 'D') { 
					exit(0);
				}
				else {
					cout << "Le graphe n'existe pas, charger une carte pour continuer" << endl; 
					menuPrincipal(graphe); 
				}
		}
	}
}

/*
 * Description : Fonction qui gere le sous menu A
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les sous-options du menu)
*/
void menuA(Graphe* graphe) {

	//Debut du menu pour l'ecriture d'un graphe
	bool choix = false; 

	cout << "Voulez-vous ouvrir le fichier 'centresLocaux.txt' ou un autre ? Oui (o) ou Non (n) :   ";
	while (true) {
		string reponse;
		cin >> reponse;
		if (reponse.size() != 1) {
			cout << "Entrez simplement un des caracteres suivant : o ou n "; 
		}
		else if (reponse[0] != 'n' && reponse[0] != 'o' && reponse[0] != 'N' && reponse[0] != 'O') {
			cout << "Entrez simplement un des caracteres suivant : o ou n :   ";
		}else if (reponse[0] == 'O' || reponse[0] == 'o') {
			choix = true; 
			break; 
		}
		else if (reponse[0] == 'N' || reponse[0] == 'n') {
			choix = false; 
			break; 
		}
	}

	if (choix) {
		fstream fichier("/Users/allan/C++_Projects/TP1_LOG2810/TP1_LOG2810/centresLocaux.txt", ios::in | ios::out);
		if (!fichier)
			cout << "Le fichier n'a pas ete ouvert" << endl; 
		else 
			graphe = new Graphe(fichier); 
	}
	else {

		cout << endl << "Veuillez entrer le chemin vers le fichier que vous souhaitez utiliser :    " << endl;

		while (true) {
			string nom;
			cin >> nom;
			fstream fichier(nom, ios::in | ios::out);
			if (fichier) {
				graphe = new Graphe(fichier);
				break;
			}
			else {
				cout << "Erreur lors de l'ouverture du fichier, veuillez verifier / entrer de nouveau votre chemin " << endl;
			}
		}
		cout << endl << "Le fichier a ete ouver avec succes ! " << endl;
	}

	bool choix2 = false; 
	cout << "Voulez-vous afficher le graphe ? Oui (o) ou Non (n) :  ";
	while (true) {
		string reponse;
		cin >> reponse;
		if (reponse.size() != 1) {
			cout << "Entrez simplement un des caracteres suivant : o ou n.  " << endl;
		}
		else if (reponse[0] != 'n' && reponse[0] != 'o' && reponse[0] != 'N' && reponse[0] != 'O') {
			cout << "Entrez simplement un des caracteres suivant : o ou n." << endl;
		}
		else if (reponse[0] == 'O' || reponse[0] == 'o') {
			choix2 = true;
			break;
		}
		else if (reponse[0] == 'N' || reponse[0] == 'n') {
			choix2 = false;
			break;
		}
	}
	if (choix2) {
		graphe->lireGraphe(); 
	}
	menuPrincipal(graphe);
    
}

/*
 * Description : Fonction qui gere le sous menu B
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les sous-options du menu)
*/
void menuB(Graphe* graphe) {
	/*Debut de la methode pour le menu de determination de chemin securitaire. */

	//Entrees des noeuds 
	cout << "Il faut 2 noeuds pour determiner le chemin. " << endl; 
	int noeud1; 
	int noeud2; 
	
	while (true)
	{
		cout << "\t Entrez le premier noeud : ";
		cin >> noeud1; 
		if (cin.fail()) {
			cin.clear(); 
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			cout << "Erreur : non entier" << endl; 
		}
		else if (!cin.fail() && (noeud1 <= 0 || (noeud1-1) >= graphe->getSommets().size())) {
			cout << "Erreur : le noeud n'existe pas. " << endl;
		}
		else {
			break; 
		}
	}
	
	while (true)
	{
		cout << "\t Entrez le deuxieme noeud : ";
		cin >> noeud2;
		if (cin.fail()) {
			cin.clear();
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			cout << "Erreur : non entier" << endl;
		}
		else if (!cin.fail() && (noeud2 <= 0 || (noeud2-1) >= graphe->getSommets().size())) {
			cout << "Erreur : le noeud n'existe pas. " << endl;
		}
		else {
			break;
		}
	}
	//Entree du type de patient et appel de la methode appropriee pour le graphe
	cout << "Afin de determiner le chemin le plus securitaire, il est important de preciser le type de patient qu'il transporte" << endl;
	cout << "Type de patients  : " << endl;
	cout << "\ta. Faible risque" << endl;
	cout << "\tb. Moyen risque" << endl;
	cout << "\tc. Haut risque" << endl;
	while (true) {
		cout << "Entrer votre choix : ";
		string choix;
		cin >> choix;
		if (choix.size() != 1)
			cout << "Veuillez entrer un seul caractere" << endl; 
		else if (choix[0] != 'a' && choix[0] != 'b' && choix[0] != 'c'
			&& choix[0] != 'C' && choix[0] != 'A' && choix[0] != 'B') {
			cout << "Le caractere que vous avez entrer n'est pas un choix valide" << endl; 
		}
		else if (choix[0] == 'a' || choix[0] == 'A') {
			graphe->printDetailsChemins(faibleRisque, graphe->getSommets()[noeud1-1], graphe->getSommets()[noeud2 - 1]);
			break; 
		}
		else if (choix[0] == 'b' || choix[0] == 'B') {
			graphe->printDetailsChemins(moyenRisque, graphe->getSommets()[noeud1 - 1], graphe->getSommets()[noeud2 - 1]);
			break; 
		}
		else if (choix[0] == 'c' || choix[0] == 'C') {
			graphe->printDetailsChemins(hautRisque, graphe->getSommets()[noeud1 - 1], graphe->getSommets()[noeud2 - 1]);
			break; 
		}
	}
}

/*
 * Description : Fonction qui gere le sous menu C
 * Parametres : Le graphe sur lequel on travail (Graphe*)
 * Retour : aucun (Mais affiche les sous-options du menu)
*/
void menuC(Graphe* graphe) {
	cout << "On affichera a partir d'un sommet, tous les sommets vers lesquels il peut se rendre, et s'il le peut, on donnera les etapes a suivre, sinon un message de refus " <<endl
		<<"Il faudra determiner un point de depart ,un type de batterie, et un type de patient. " << endl; 
	int noeud1;
	//Entree du noeud 
	while (true)
	{
		cout << "\t Entrez le noeud : ";
		cin >> noeud1; 
		if (cin.fail()) {
			cin.clear(); 
			cin.ignore(numeric_limits<streamsize>::max(), '\n');
			cout << "Erreur : non entier" << endl; 

		}
		else if (!cin.fail() && (noeud1 <= 0 || (noeud1-1) >= graphe->getSommets().size())) {
			cout << "Erreur : le noeud n'existe pas. " << endl; 
 		}
		else {
			break; 
		}
	}
	

	//entree du type de batterie 
	cout << "Choisissez la batterie entre : " << endl; 
	cout << "\ta. NI-NH" << endl; 
	cout << "\tb. LI-ion" << endl; 
	string batterie; 
	while (true) {
		cout << "Entrer votre choix : "; 
		cin >> batterie; 

		if (batterie.size() != 1) {
			cout << "Veuillez entrer un seul caractere" << endl;
		}
		else if (batterie[0] != 'a' && batterie[0] != 'A' && batterie[0] != 'b' && batterie[0] != 'B') {
			cout << "Erreur : l'option que vous avez choisi n'existe pas, veuillez recommencer : " << endl; 
		}
		else {
			break; 
		}
	}
	//Entree du type de patient et appel de la methode appropriee pour le graphe
	cout << "Afin de determiner le chemin le plus securitaire, il est important de preciser le type de patient transporte" << endl;
	cout << "Type de patients (en fonction du risque) : " << endl;
	cout << "\ta. Faible" << endl;
	cout << "\tb. Moyen" << endl;
	cout << "\tc. Haut" << endl;
	string choix;

	while (true) {
		cout << "Entrez votre choix : ";
		cin >> choix;
		if (choix.size() != 1)
			cout << "Veuillez entrer un seul caractere" << endl;
		else if (choix[0] != 'a' && choix[0] != 'b' && choix[0] != 'c'
			&& choix[0] != 'C' && choix[0] != 'A' && choix[0] != 'B') {
			cout << "Le caractere que vous avez entrer n'est pas un choix valide" << endl;
		}
		else if ((choix[0] == 'a' || choix[0] == 'A') && (batterie[0] == 'a' || batterie[0] == 'A')) {
			graphe->extraireSousGraphe(NI_NH, faibleRisque, graphe->getSommets()[noeud1-1]); 
			break;
		}
		else if ((choix[0] == 'a' || choix[0] == 'A') && (batterie[0] == 'b' || batterie[0] == 'B')) {
			graphe->extraireSousGraphe(LI_ion, faibleRisque, graphe->getSommets()[noeud1 - 1]);
			break;
		}
		else if ((choix[0] == 'b' || choix[0] == 'B') && (batterie[0] == 'a' || batterie[0] == 'A')) {
			graphe->extraireSousGraphe(NI_NH, moyenRisque, graphe->getSommets()[noeud1 - 1]);
			break;
		}
		else if ((choix[0] == 'b' || choix[0] == 'B') && (batterie[0] == 'b' || batterie[0] == 'B')) {
			graphe->extraireSousGraphe(LI_ion, moyenRisque, graphe->getSommets()[noeud1 - 1]);
			break;
		}
		else if ((choix[0] == 'c' || choix[0] == 'C') && (batterie[0] == 'a' || batterie[0] == 'A')) {
			graphe->extraireSousGraphe(NI_NH, hautRisque, graphe->getSommets()[noeud1 - 1]);
			break;
		}
		else if ((choix[0] == 'c' || choix[0] == 'C') && (batterie[0] == 'b' || batterie[0] == 'B')) {
			graphe->extraireSousGraphe(LI_ion, hautRisque, graphe->getSommets()[noeud1 - 1]);
			break;
		}
		
	}
	
}

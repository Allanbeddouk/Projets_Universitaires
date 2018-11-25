/*
 * According to: Travaux Pratiques dans le cous INF2810 coordonnés par Foutse Khomh
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE & David DRATWA
 * @created: 2018-10-10
 */
#include"Graphe.h"

//Variables globales que l'on va modifier lorsqu'on calculera les differents niveaux
float batterieNI_NH=100,
      batterieLI_ion=100;


/*
 * Description : Constructeur par parametres de la classe Graphe
 * Parametres : le fichier a partir duquels on va extraire les informations du graphe qu'on souhaite construire
 * Retour : aucun
 */
Graphe::Graphe(fstream& fichier)
{
    creerGraphe(fichier);
}

/*
 * Description : Destructeur de la classe Graphe
 * Parametres : aucun
 * Retour : aucun
 */
Graphe::~Graphe()
{
}

/*
 * Description : Permet de recuperer la valeur de l'attrubut sommets_ de la classe Graphe
 * Parametres : aucun
 * Retour : attribut sommets_(vector<Sommet>)
 */
vector<Sommet> Graphe::getSommets()
{
    return sommets_;
}

/*
 * Description : Permet de recuperer la valeur de l'attrubut arcs_ de la classe Graphe
 * Parametres : aucun
 * Retour : attribut arcs_(vector<Arc>)
 */
vector<Arc> Graphe::getArcs()
{
    return arcs_;
}

/*
 * Description : A partir d'un nom de fichier passe en parametres, on extrait d'une part les sommets puis les arcs avec une fonction pour chaque extraction
 * Parametres : Nom du fichier (fstream&)
 * Retour : aucun
 */
void Graphe::creerGraphe(fstream& fichier)
{
    sommets_=extraireSommets(fichier);
    arcs_=extraireArcs(fichier,sommets_);
}

/*
 * Description : A partir d'un nom de fichier passe en parametres, on extrait  les sommets de ce fichier
 * Parametres : Nom du fichier (fstream&)
 * Retour : le vecteur contenant toutes les informations recueillies dans le fichier (vector<Sommet>)
 */
vector<Sommet> Graphe::extraireSommets(fstream& fichier)
{
    vector<Sommet> vect;
    string ligne, numero, station, split;
    
    getline(fichier, ligne);
    
    do
    {
        split=ligne.substr(ligne.size()-3,2); //permet de recuperer les derniers caracteres qu'on peut retrouver sur MacOS ou encore Linux
        if(split!="\r")
        {
            ligne.erase(ligne.size()-1,1);
        }
        Sommet s=Sommet();
        //On recupere le numero du sommet et le modifie dans s
        numero=ligne.substr(0,ligne.find(",",0));
        s.setNumero(atoi(numero.c_str()));
        //On recupere la station du sommet et le modifie dans s
        station=ligne.substr(ligne.find(",",0)+1,1);
        s.setStation(atoi(station.c_str()));
        
        vect.push_back(s); //On met ensuite le sommet dans le vecteur
        getline(fichier, ligne);
    }
    while (ligne!="" && ligne!="\r");
    
    return vect;
}

/*
 * Description : A partir d'un nom de fichier passe en parametres, on extrait les arcs de ce fichier
 * Parametres : Nom du fichier (fstream&) et le vecteur de Sommet recuperes au debut du fichier
 * Retour : le vecteur contenant toutes les informations recueillies dans le fichier (vector<Arc>)
 */
vector<Arc> Graphe::extraireArcs(fstream& fichier, const vector<Sommet>& points)
{
    vector<Arc> arcs;
    string temp;
    int indexSommetA=0;
    int indexSommetB=0;
    int distance = 0;
    
    
    while (!fichier.eof())
    {
        
        getline(fichier, temp, ',');
        indexSommetA = atoi(temp.c_str());
        
        getline(fichier, temp, ',');
        indexSommetB = atoi(temp.c_str());
        
        getline(fichier, temp);
        distance = atoi(temp.c_str());
        
        Arc arc(points[indexSommetA - 1], points[indexSommetB - 1], distance);
        arcs.push_back(arc);
        
    }
    return arcs;
}

/*
 * Description : affiche le graphe selon le format fourni dans l'enonce
 * Parametres : aucun
 * Retour : aucun
 */
void Graphe:: lireGraphe()
{
    string chaine;
    for(unsigned i=0;i<sommets_.size();++i)
    {
        cout<<'('<<sommets_[i].getNumero()<<" ( ";
        
        for(unsigned j=0;j<arcs_.size();++j)
        {
            if(arcs_[j].getSommetA()==sommets_[i])
            {
                cout<<"("<<arcs_[j].getSommetB().getNumero()<<", "<<arcs_[j].getDistance()<<"), ";
            }
            
            else if(arcs_[j].getSommetB()==sommets_[i])
            {
                cout<<"("<<arcs_[j].getSommetA().getNumero()<<", "<<arcs_[j].getDistance()<<"), ";
            }
        }
        cout<<") )"<<endl;
    }
}

/*
 * Description : permet d'obtenir les voisins d'un sommet
 * Parametres : le sommet pour lequel on veut obtenir les voisins (Sommet)
 * Retour : tous les voisins du sommet passe par parametres (vector<Sommet>)
 */
vector<Sommet> Graphe::getVoisins(const Sommet& s)
{
    vector<Sommet> v;
    
    for(unsigned i=0;i<arcs_.size();++i)
    {
        if(arcs_[i].getSommetA()==s)
        {
            v.push_back(arcs_[i].getSommetB());
        }
        
        else if(arcs_[i].getSommetB()==s)
        {
            v.push_back(arcs_[i].getSommetA());
        }
    }
    
    return v;
}

/*
 * Description : permet d'obtenir la distance entre deux sommets adjacents
 * Parametres : les deux sommets pour lesquels on veut obtenir la distance (Sommet)
 * Retour : retourne la distance entre les deux sommets passes en parametres (int)
 */
int Graphe::getDistanceSommets(const Sommet& s1, const Sommet& s2)
{
    int distance=0;
    for(unsigned j=0;j<arcs_.size();++j)
    {
        if(arcs_[j].getSommetA()==s1 && arcs_[j].getSommetB()==s2)
        {
            distance=arcs_[j].getDistance();
        }
        
        else if(arcs_[j].getSommetA()==s2 && arcs_[j].getSommetB()==s1)
        {
            distance=arcs_[j].getDistance();
        }
    }
    return distance;
}

/*
 * Description : permet de calculer la distance pour un chemin donne
 * Parametres : le vecteur contenant le chemin en question (dans le sens inverse)
 * Retour : le temps pour effectuer le chemin passe en parametres (unsigned)
 */
unsigned Graphe::calculerTempsChemin(const vector<Sommet>& chemins)
{
    unsigned tempsTotal=0;
    //On parcourt le chemin en partant de la fin, car l'ordre du chemin est inverse
    for(int i=chemins.size()-2;i>=0;--i)
        tempsTotal+=getDistanceSommets(chemins[i+1],chemins[i]);
    
    return tempsTotal;
}


/*
 * Description : methode utilisee exclusivement dans la methode fficherTypeDeVehicule, qui nous permet de localiser la station la plus proche a l'aide d'un chemin passe en parametre
 * Parametres : chemin (vetcor<Sommet>)
 * Retour : le nouveau vecteur avec la station la plus proche en derniere position (vector<Sommet>)
 */
vector<Sommet> Graphe::stationsPlusProches(const vector<Sommet>& chemins)
{
    vector<Sommet> stations=chemins;
    for(int i=chemins.size()-1;i>=0;--i)
    {
        if(chemins[i].aUneStation() && i==chemins.size()-1) // on verifie si au depart il y a une station, dans ce cas, on ne la considere pas comme la plus proche
        {
            stations.pop_back();
        }
        
        else
            if(chemins[i].aUneStation()) //des que qu'un sommet possede une station on met fin a la methode et on retourne le reste du chemin
                return stations;
            else
                stations.pop_back(); //on retire les sommets sans stations
    }
    
    //cest le cas ou il n'y a pas de stations sur le chemins, dans ce cas on retourne un vecteur de taille 0
    if(stations.size()==0)
       stations.push_back(Sommet());
    
    return stations;
}


/*
 * Description : methode utilisee exclusivement dans la methode fficherTypeDeVehicule, qui nous permet de simuler un trajet vers une station et de savoir si il est possible de l'effectuer
 * Parametres : La station vers laquelle on veut aller, le chemin principal (car on verifie egalement qu'on peut se rendre vers l'arrivee apres la station), et les categories de vehicules et de personnes
 * Retour : une paire avec en first le booleen indiquant si on peut se rendre a la station (true) ou non (false) et la distance que ca prendrait pour le faire
 */
pair<bool,unsigned> Graphe::testAllerAUneStation(const Sommet& station, const Vehicule& vehicule, const Categorie& categorie,  vector<Sommet> chemins)
{
    //Fonctions lambdas qui verifie si on peut aller au bout du chemin, en retournant la paire qui nous permettra de ensuite de return pour la methode qui l'englobe
    auto arriveAuBout = [&] (vector<Sommet> v) ->pair<bool, unsigned>
    {
        unsigned temps=calculerTempsChemin(v);
        
        if(temps==0)
            return make_pair(false,0);
        
        float batterieNI_NH2=100,
        batterieLI_ion2=100;
        
        if(vehicule==NI_NH)
        {
            switch (categorie)
            {
                case faibleRisque:
                    batterieNI_NH2-=0.06*100*temps/60.0;
                    break;
                    
                case moyenRisque:
                    batterieNI_NH2-=0.12*100*temps/60.0;
                    break;
                    
                case hautRisque :
                    batterieNI_NH2-=0.48*100*temps/60.0;
                    break;
            }
            
            return batterieNI_NH2<20 ?  make_pair(false,temps) : make_pair(true,temps);
        }
        
        else
        {
            switch(categorie)
            {
                case faibleRisque:
                    batterieLI_ion2-=0.05*100*temps/60.0;
                    break;
                    
                case moyenRisque:
                    batterieLI_ion2-=0.10*100*temps/60.0;
                    break;
                    
                case hautRisque :
                    batterieLI_ion2-=0.30*100*temps/60.0;
                    break;
            }
            
            return batterieLI_ion2<20 ? make_pair(false,temps) : make_pair(true,temps);
        }
        
    };
    
    
    vector<Sommet> cheminDepartStation; //le chemin pour arriver du depart vers la station
    
    //Des qu'une station est trouvee dans l'itineraire on ecrase l'ancien, et on le replace par celui qui reprensentera le nouveau principal vers la station
    for(int i=chemins.size()-1;i>=0;--i)
        if(chemins[i]!=station)
            cheminDepartStation.push_back(chemins[i]);
        else
        {
            cheminDepartStation.push_back(chemins[i]);
            break;
        }
    

    return arriveAuBout(cheminDepartStation) ;
}


/*
 * Description : methode recursive, qui affiche le type de vehicule adapte par rapport au trajet
 * Parametres : Par defaut, on ne force pas une valeur unique du vehicule, cest a dire que le vehicule le plus adapte sera retenu.
 * Retour : aucun (mais affiche le resultat du type de vehicule et de l'etat de la batterie)
 */
void Graphe::afficherTypeDeVehicule(Vehicule vehicule, const vector<Sommet>& chemins, const Categorie& categorie,  unsigned temps, const bool imposerNI_NH, const bool imposerLI_ion)
{
    //si la size du chemin est de 1 cela signifie que le chemin ne comporte que 1 sommet, cest a dire celui ou le vehicule est deja situe
    if(chemins.size()==1)
    {
        cout<<"Le vehicule se trouve deja a ce sommet"<<endl;
        return ;
    }
    
    //declaration de temps pour chacune des batteries, qui sera utile lors des appels recursifs
    unsigned tempsNI_NH=temps, tempsLI_ion=temps;
    temps=calculerTempsChemin(chemins);
    
    
    //fonction lambda qui permet de recharger la batterie (remettre son etat a 100% et rajouter le temps de charge de 120min)
    auto rechargerBatterie=[&temps, &tempsNI_NH, &tempsLI_ion ] (Vehicule v) ->void
    {
        if(v==NI_NH)
        {
            batterieNI_NH=100;
            tempsNI_NH=temps+120;
        }
        else
        {
            batterieLI_ion=100;
            tempsLI_ion=temps+120;
        }
    };
    
    //En fonction de la categorie de passager l'autonomie est affectee differement
    switch (categorie)
    {
        case faibleRisque:
            batterieNI_NH-=0.06*100*temps/60.0;
            break;
            
        case moyenRisque:
            batterieNI_NH-=0.12*100*temps/60.0;
            break;
            
        case hautRisque :
            batterieNI_NH-=0.48*100*temps/60.0;
            break;
    }
    
    
//declaration de vecteurs, qui sera utilise par la suite pour stocker le nouvel itineraire vers une station de recharge
    vector<Sommet> stations=chemins;
    
//cas ou le vehicule avec la batterie NI_NH tiendrait jusqu'au bout du chemin et on verifie egalement que l'utilisateur est bien choisi le vehicule NI_NH
    if(batterieNI_NH>20 && vehicule==NI_NH && !imposerLI_ion)
    {
        cout<<"Le transport peut s'effectuer avec le vehicule NI-NH"<< endl <<"A l'arrivee, l'etat de batterie du vehicule sera de "<<batterieNI_NH<<" %"<<endl;
        cout<<"Le chemin prendra "<< tempsNI_NH <<" minutes pour etre effectue, voici son itineraire :"<<endl;
        remiseAZeroVehicule();
        return ;
    }
    //cas ou le vehicule avec la batterie NI_NH ne serait pas suffisante et ou il faudrait peut etre la recharger a la station la plus proche (si possible)
    else
    {
        stations=stationsPlusProches(chemins);
        pair<bool, unsigned > temp=testAllerAUneStation(stations.back(), NI_NH, categorie, chemins);
        
        if(batterieNI_NH<=20 && vehicule==NI_NH && stations.size()!=1 &&  temp.first )
        {
            tempsNI_NH+= temp.second;
            rechargerBatterie(NI_NH);
            afficherTypeDeVehicule(NI_NH, stations, categorie, tempsNI_NH,imposerNI_NH,imposerLI_ion);
            return ;
        }
        
        //cas ou le vehicule avec la batterie NI_NH ne suffit pas, on verifie, de la meme maniere que precedemement si cest possible avec le vehicule possedant la batterie LI-ion
        else
        {
            //En fonction de la categorie de passager l'autonomie est affectee differement
            switch(categorie)
            {
                case faibleRisque:
                    batterieLI_ion-=0.05*100*temps/60.0;
                    break;
                    
                case moyenRisque:
                    batterieLI_ion-=0.10*100*temps/60.0;
                    break;
                    
                case hautRisque :
                    batterieLI_ion-=0.30*100*temps/60.0;
                    break;
            }
            
            //cas ou le vehicule avec la batterie LI-ion tiendrait jusqu'au bout du chemin et on verifie egalement que l'utilisateur est bien choisi le vehicule LI_ion
            if(batterieLI_ion>20 && !imposerNI_NH)
            {
                cout<<"Le transport doit s'effectuer avec le vehicule LI-ion"<< endl <<"A l'arrivee, l'etat de batterie du vehicule sera de "<<batterieLI_ion<<" %"<<endl;
                cout<<"Le chemin prendra "<< tempsLI_ion <<" minutes pour etre effectue, voici son itineraire :"<<endl;
                remiseAZeroVehicule();
                return ;
            }
            
            else
            { //cas ou le vehicule avec la batterie LI-ion ne serait pas suffisante et ou il faudrait peut etre la recharger a la station la plus proche (si possible)
                stations=chemins;
                stations=stationsPlusProches(chemins);
                pair<bool, unsigned > temp=testAllerAUneStation(stations.back(), LI_ion, categorie, chemins);
                
                if(batterieLI_ion<=20 && stationsPlusProches(stations).size()!=1 && temp.first ) //&& stations.back()!=chemins.back() )
                {
                   tempsLI_ion+= temp.second;
                rechargerBatterie(LI_ion);
                afficherTypeDeVehicule(LI_ion, stations, categorie, tempsLI_ion,imposerNI_NH,imposerLI_ion);
                return ;
                }
                
                else
                {// cas ou le trajet ne peut etre effectues selon les parametres rentres dans la fonction
                    cout<<"Nous sommes desole, mais pour des raisons de securite, nous ne pouvons pas accepter ce transport"<<endl;
                    remiseAZeroVehicule();
                    return ;
                }
            }
        }
    }
    
    
    
}

/*
 * Description : reinitialise les variables globales permettant de gerer l'etat des batteries
 * Parametres : aucun
 * Retour : aucun
 */
void Graphe::remiseAZeroVehicule()
{
    batterieLI_ion=batterieNI_NH=100;
    
}


/*
 * Description : methode qui calcule le plus court chemin entre deux sommets, en se basant sur l'algorithme de Dijkstra.
 n.b : Nous avons code l'algorithme avec une methode que celle indiquee dans le cours, l'algorithme s'execute de la meme facon que si nous le faisions sur papier
 * Parametres : categorie du passager, sommet de depart et d'arrive
 * Retour : le chemin obtenu, ordonne de facon inverse dans le vecteur (vector<Sommet>)
 */
vector<Sommet> Graphe::plusCourtChemin(const Categorie& categorie, const Sommet& depart, const Sommet& arrive)
{
    //initialisation du tableau que l'on va utiliser pour developper l'algorithme de Djiskra.
    //Chaque sommet de numero n se trouve a l'index n-1 dans le tableau
    //Chaque element du vecteur contient lui meme un vecteur de pair avec en first le sommet qui est lié a l'index et en second la distance entre les deux
    
    vector< vector< pair<Sommet, unsigned> > > tableau(sommets_.size());
    
    for(unsigned q=0;q<tableau.size();++q)
        tableau[q].resize(sommets_.size()+1);
    
    //Tableau qui nous indique si on a deja visite un sommet ('false' par defaut quand il n'est pas encore visite et 'true' lorsque qu'on le visite)
    vector<bool> visite(tableau.size());
    
    //insertion du sommet "depart"
    tableau[0][depart.getNumero()-1]=make_pair(depart, 0);
    visite[depart.getNumero()-1]=true;
    
    
    
    
    //Declaration de variables qui vont êtres utiles lorsqu'on utilisera l'algorithme
    vector<Sommet> voisinsTemp;
    Sommet temp=depart;
    pair<Sommet,unsigned> min; //paire pour calculer le minimum a chaque etape
    pair<Sommet,unsigned> paire;
    
    //cette boucle represente le nombre d'etape que l'on effectue pour executer l'algorithme (nb de sommets-1)
    for(unsigned i=0; i<tableau.size()-1;++i)
    {
        voisinsTemp=getVoisins(temp);
        //dans cette boucle on note les distances relatives entre le sommet sur lequel on etudie (temp) et ses voisins. On insere ainsi une paire avec en first le sommet temp et second la distance cumulee obtenue a chaque iteration
        for(unsigned j=0;j<voisinsTemp.size();++j)
        {
            paire=make_pair( temp, getDistanceSommets(temp,voisinsTemp[j])+tableau[i][temp.getNumero()-1].second);
            if(!visite[voisinsTemp[j].getNumero()-1])
            {
                tableau[i][voisinsTemp[j].getNumero()-1]=paire;
                
            }
        }
        //creation d'une paire avec une distance tres grande (voulue), pour pouvoir avoir un minimum par la suitre
        min=make_pair(temp, 20000);
        unsigned indexMin=0;
        
        //boucle qui parcourt toutes les colonnes du tableau (qui representent un sommet a chaque fois, en verifiant qu'il n'a pas ete deja visite). On met ainsi a jour le min, et son index indexMin
        for(unsigned a=0;a<=i;++a)
        {
            for(unsigned b=0;b<tableau[a].size();++b)
            {
                if(tableau[a][b].second<min.second && tableau[a][b].first.getNumero()!=0 && tableau[a][b].second!=0 && !visite[b])
                {
                    indexMin=b;
                    min=tableau[a][b];
                    
                }
            }
        }
        
 
        
        //push la paire minimum dans le tableau en derniere position de la colonne correspondante
        tableau[i+1][indexMin]=min;
        visite[indexMin]=true; //on ne repassera plus jamais par la
        //le sommet qu'on etudie desormais est ce minimum
        temp=sommets_[indexMin];
    }
    
    unsigned indexDernierElement=0;
    
    //Fonction lambda qui calcul l'index du dernier element d'une colonne, qui correspond a la distance la plus courte avec le point de depart et le sommet en question
    auto calculerIndexDernierElement = [&indexDernierElement](vector< vector< pair<Sommet, unsigned> > > tableau, Sommet s)->void
    {
        for(int i=tableau.size()-1;i>=0;--i)
        {
            if(tableau[i][s.getNumero()-1].second!=0)
            {
                indexDernierElement=i;
                return;
            }
        }
    };
    
    
    vector<Sommet> chemins;
    chemins.push_back(arrive); //on initialise le chemin pour que le premier element soit le point d'arrive et le dernier le point de depart (ordre inverse)
    
    //retrouve l'itineraire a partir des informations contenues dans le tableau
    temp=arrive;
    while(temp!=depart)
    {
        calculerIndexDernierElement(tableau,temp);
        temp=tableau[indexDernierElement][temp.getNumero()-1].first;
        chemins.push_back(temp);
    }
    
    return chemins;
}



/*
 * Description :methode qui permet de determiner tous les chemins possibles que l'on peut effectuer a partir d'un point et en fonction des contraintes passees en parametres
 * Parametres : categorie du passager, type de vehicule et sommet de depart
 * Retour : aucun (Affiche toutes les combinaisons)
 */
void Graphe::extraireSousGraphe(Vehicule vehicule, Categorie categorie, Sommet depart)
{
    cout<< "A partir des informations passees en parametres, en partant du sommet "<<depart.getNumero()<<" on peut acceder à : "<<endl;
    vector<Sommet> temp;
    //verifie quelle valeur imposer pour la fonction afficherTypeDeVehicule
    bool imposerNI_NH=false, imposerLI_ion=false;
    vehicule==NI_NH ? imposerNI_NH=true : imposerLI_ion=true;
    
    
    
    for(unsigned i=0;i<sommets_.size();++i)
    {
        temp=plusCourtChemin(categorie, depart, sommets_[i]);
        unsigned temps=calculerTempsChemin(temp);
        cout<<"Sommet "<<sommets_[i].getNumero() <<endl<< "Voici, comment y acceder : "<<endl;
        afficherTypeDeVehicule(vehicule, temp, categorie, temps,imposerNI_NH,imposerLI_ion);
        batterieNI_NH=batterieLI_ion=100;
        cout<<endl<<endl;
    }
    
}


/*
 * Description : affiche le plus court chemin selon le format de l'enonce
 * Parametres : chemins, en ordre inverse (vector<Sommet>)
 * Retour : aucun
 */
void Graphe::afficherPlusCourtChemin(const vector<Sommet>& chemins)
{
    string chaine;
    for(int i=chemins.size()-1;i>=0;--i)
    {
        chaine+=to_string(chemins[i].getNumero())+"->";
    }
    
    cout<<chaine.erase(chaine.size()-2)<<endl;
}


/*
 * Description : affiche le plus court chemin selon le format de et fait egalement appel a l'affichage du type de vehicule. (fonction d'affichage correspondant a l'option b du menu)
 * Parametres : categorie du passager, sommet de depart et d'arrive
 * Retour : aucun
 */
void Graphe::printDetailsChemins(const Categorie& categorie, const Sommet& depart, const Sommet& arrive)
{
    vector<Sommet> sommets=plusCourtChemin(categorie, depart, arrive);
    
    afficherTypeDeVehicule(NI_NH, sommets, categorie, calculerTempsChemin(sommets));
    
    afficherPlusCourtChemin(sommets);
    
}

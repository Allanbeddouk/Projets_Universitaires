/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#include <QAction>
#include <QMenu>
#include <QMenuBar>
#include <QStyle>
#include <QKeySequence>
#include <QDebug>
#include <QPushButton>
#include <QMessageBox>
#include <QRadioButton>
#include <QButtonGroup>
#include <QComboBox>
#include <QSlider>
#include <QListWidget>
#include <QListWidgetItem>
#include <QLineEdit>
#include <QLabel>
#include <QFrame>
#include <QVBoxLayout>
#include <QHBoxLayout>

#include <typeinfo>
#include <string>

#include "mainwindow.h"
#include "Gestionnaire.h"
#include "Usager.h"
#include "Fournisseur.h"
#include "ClientPremium.h"
#include "ExceptionArgumentInvalide.h"

using namespace std;

Q_DECLARE_METATYPE(Usager*)

// Constructeur de la fenetre principale de l'application
MainWindow::MainWindow(Gestionnaire* gestionnaire, QWidget *parent) :
    QMainWindow(parent)
{
    gestionnaire_ = gestionnaire;
    setup();
}

MainWindow::~MainWindow() {
    while (!ajoute_.empty()) {
        delete ajoute_.back();
        ajoute_.pop_back();
    }
}

void MainWindow::setup() {
    indexCourantDuFiltre_ = 0;
    setMenu();
    setUI();
    setConnections();
    chargerUsagers();
}

void MainWindow::setConnections()
{

	connect(gestionnaire_, SIGNAL(signal_usagerAjoute(Usager*)), this, SLOT(usagerAEteAjoute(Usager*)));
    ///On connecte le SIGNAL lorsqu'un usager est ajouté avec le SLOT correspondant, c'est à dire lorsqu'un usager a été ajouté
    connect(gestionnaire_, SIGNAL(signal_usagerSupprime(Usager*)), this, SLOT(usagerAEteSupprime(Usager*)));
    ///On connecte le SIGNAL lorsqu'un usager est supprimé avec le SLOT correspondant, c'est à dire lorsqu'un usager a été supprimé

}

void MainWindow::setMenu() {

    // On crée un bouton 'Exit'
    QAction* exit = new QAction(tr("&Quitter"), this);

    // On ajoute un raccourci clavier qui simulera l'appui sur ce bouton (Ctrl+Q)
    exit->setShortcut(QKeySequence(Qt::CTRL + Qt::Key_Q));

    // On connecte le clic sur ce bouton avec l'action de clore le programme
    connect(exit, SIGNAL(triggered()), this, SLOT(close()));

    // On crée un nouveau menu 'File'
    QMenu* fileMenu = menuBar()->addMenu(tr("&Fichier"));

    // Dans lequel on ajoute notre bouton 'Exit'
    fileMenu->addAction(exit);
}

void MainWindow::setUI() {

    // Le sélecteur pour filtrer ce que l'on souhaite dans la liste (QComboBox*)
    QComboBox* showCombobox = new QComboBox(this);
    showCombobox->addItem("Tout Afficher"); // cela correspond à l'index 0
    showCombobox->addItem("Afficher Clients Reguliers"); // cela correspond à l'index 1
    showCombobox->addItem("Afficher Clients Premiums"); // cela correspond à l'index 2
    showCombobox->addItem("Afficher Fournisseurs"); // cela correspond à l'index 3
    connect(showCombobox, SIGNAL(currentIndexChanged(int)), this, SLOT(filtrerListe(int))); // On connecte le
    //selecteur avec le SIGNAL correspondant et le SLOT filtrerListe qui prend en parametre un int

    // La liste des usagers
    listUsager = new QListWidget(this);
    listUsager->setSortingEnabled(true);
    connect(listUsager, SIGNAL(itemClicked(QListWidgetItem*)), this, SLOT(selectionnerUsager(QListWidgetItem*)));

    // Le bouton pour supprimer tout le monde
    QPushButton* boutonSupprimerTousLesUsagers = new QPushButton(this);
    boutonSupprimerTousLesUsagers->setText("Supprimer Tous Les Usagers");
    connect(boutonSupprimerTousLesUsagers, SIGNAL(clicked()), this, SLOT(supprimerTousLesUsagers()));

    // Le bouton pour remettre à zéro la vue et ajouter un nouvel employé
    QPushButton* boutonAjouterUsager = new QPushButton(this);
    boutonAjouterUsager->setText("Ajouter Usager");
    connect(boutonAjouterUsager, SIGNAL(clicked()), this, SLOT(nettoyerVue())); // On connecte le tout
    //pour que lorsqu'on clique sur ce bouton (un SIGNAL est emis) et la vue est donc nettoyée


    // Le premier layout, pour la colonne de gauche, dans lequel on insère les
    // éléments que l'on veut dans l'ordre dans lequel on veut qu'ils apparaissent
    QVBoxLayout* listLayout = new QVBoxLayout;
    listLayout->addWidget(showCombobox);
    listLayout->addWidget(listUsager);
    listLayout->addWidget(boutonSupprimerTousLesUsagers);
	listLayout->addWidget(boutonAjouterUsager);

    // Champ pour le nom
    QLabel* nomLabel = new QLabel;
    nomLabel->setText("Nom:");
    editeurNom= new QLineEdit;

    QHBoxLayout* nomLayout = new QHBoxLayout;
    nomLayout->addWidget(nomLabel);
    nomLayout->addWidget(editeurNom);

    // Champ pour le prenom
    QLabel* prenomLabel = new QLabel;
    prenomLabel->setText("Prenom:");
    editeurPrenom = new QLineEdit;

    QHBoxLayout* prenomLayout = new QHBoxLayout;
    prenomLayout->addWidget(prenomLabel);
    prenomLayout->addWidget(editeurPrenom);

    //Champ pour l'identifiant avec validateur int entre 0 et 100 000
    QHBoxLayout* identifiantLayout = new QHBoxLayout; //Creation du champ

    QLabel* identifiantLabel = new QLabel; //Creation du label
	identifiantLabel->setText("Identifiant :");
    identifiantLayout->addWidget(identifiantLabel); //ajout du widget au champ

    editeurIdentifiant = new QLineEdit; //Creation de la ligne pour modifier le texte
	editeurIdentifiant->setValidator(new QIntValidator(0, 100000, this));
    identifiantLayout->addWidget(editeurIdentifiant);//ajout du widget au champ

    // Champ pour le code postal
    QHBoxLayout* codePostalLayout = new QHBoxLayout; //Creation du champ

    QLabel* codePostalLabel = new QLabel; //Creation du label
	codePostalLabel->setText("Code Postal :");
    codePostalLayout->addWidget(codePostalLabel);//ajout du widget au champ
	
    editeurCodePostal = new QLineEdit; //Creation de la ligne pour modifier le texte
    codePostalLayout->addWidget(editeurCodePostal);//ajout du widget au champ


    //Champ pour JoursRestant de ClientPremium avec validateur int entre 0 et 1000
    QHBoxLayout* joursRestantsLayout = new QHBoxLayout; //Creation du champ

    QLabel* joursRestantsLabel = new QLabel; //Creation du label
	joursRestantsLabel->setText("Jours Restants :");
    joursRestantsLayout->addWidget(joursRestantsLabel);//ajout du widget au champ

    editeurJoursRestants = new QLineEdit; //Creation de la ligne pour modifier le texte
    editeurJoursRestants->setValidator(new QIntValidator(0, 1000, this));
	joursRestantsLayout->addWidget(editeurJoursRestants);


    // Boutons radio
    QRadioButton* clientPremiumBoutonRadio = new QRadioButton("&ClientPremium", this);
    clientPremiumBoutonRadio->setChecked(true);
    boutonRadioTypeUsager.push_back(clientPremiumBoutonRadio);

    QRadioButton* clientRegulierBoutonRadio = new QRadioButton("&Client", this);
    boutonRadioTypeUsager.push_back(clientRegulierBoutonRadio);

    QRadioButton* fournisseurBoutonRadio = new QRadioButton("&Fournisseur", this);
    boutonRadioTypeUsager.push_back(fournisseurBoutonRadio);

    QButtonGroup* typeUsagerGroupeBoutons = new QButtonGroup;
    typeUsagerGroupeBoutons->addButton(clientPremiumBoutonRadio);
    typeUsagerGroupeBoutons->addButton(clientRegulierBoutonRadio);
    typeUsagerGroupeBoutons->addButton(fournisseurBoutonRadio);
    connect(typeUsagerGroupeBoutons, SIGNAL(buttonClicked(int)),
            this, SLOT(changerTypeUsager(int)));

    QHBoxLayout* typeUsagerLayout = new QHBoxLayout;
    typeUsagerLayout->addWidget(clientPremiumBoutonRadio);
    typeUsagerLayout->addWidget(clientRegulierBoutonRadio);
    typeUsagerLayout->addWidget(fournisseurBoutonRadio);

    // Trait horizontal de séparation
    QFrame* horizontalFrameLine = new QFrame;
    horizontalFrameLine->setFrameShape(QFrame::HLine);

    // Bouton pour supprimer l'usager sélectionné dans la liste
	boutonSupprimer = new QPushButton(this);
    boutonSupprimer->setDisabled(true);
	boutonSupprimer->setText("Supprimer");
	connect(boutonSupprimer, SIGNAL(clicked()), this, SLOT(supprimerUsagerSelectionne()));

    // Bouton pour ajouter l'usager dont on
    // vient d'entrer les informations
    boutonAjouter = new QPushButton(this);
    boutonAjouter->setText("Ajouter");
    connect(boutonAjouter, SIGNAL(clicked()), this, SLOT(ajouterUsager()));

    // Organisation horizontale des boutons
    QHBoxLayout* ajouterSupprimerLayout = new QHBoxLayout;
    ajouterSupprimerLayout->addWidget(boutonAjouter);
	ajouterSupprimerLayout->addWidget(boutonSupprimer);

    // Organisation pour la colonne de droite
    QVBoxLayout* displayLayout = new QVBoxLayout;
    displayLayout->addLayout(nomLayout);
    displayLayout->addLayout(prenomLayout);
    displayLayout->addLayout(identifiantLayout);
    displayLayout->addLayout(codePostalLayout);
    displayLayout->addLayout(joursRestantsLayout);
    displayLayout->addLayout(typeUsagerLayout);
    displayLayout->addWidget(horizontalFrameLine);
    displayLayout->addLayout(ajouterSupprimerLayout);


    // Trait vertical de séparation
    QFrame* verticalFrameLine = new QFrame;
    verticalFrameLine->setFrameShape(QFrame::VLine);

    // Organisation horizontale
    QHBoxLayout* mainLayout = new QHBoxLayout;
    mainLayout->addLayout(listLayout);
    mainLayout->addWidget(verticalFrameLine);
    mainLayout->addLayout(displayLayout);

    // On crée un nouveau Widget, et on définit son
    // layout pour celui que l'on vient de créer
    QWidget* widget = new QWidget;
    widget->setLayout(mainLayout);

    // Puis on définit ce widget comme le widget
    // centrale de notre classe
    setCentralWidget(widget);

    // Enfin, on met à jour le titre de la fenêtre
    string title = "Gestionnaire de polebay!";
    setWindowTitle(title.c_str());
}

//Cette fonction crée une boite de message de type popup
void MainWindow::afficherMessage(QString msg) {
   QMessageBox messageBox;
   messageBox.setText(msg);
   messageBox.exec();
}

//Charger tous les usagers connus
void MainWindow::chargerUsagers() {
    // On s'assure que la liste est vide
    listUsager->clear();
    // Puis, pour tous les usagers
    int max = gestionnaire_->obtenirNombreUsager();
    for (int i = 0; i < max; i++) {
        // On récupère le pointeur vers l'employé
        Usager* usager = gestionnaire_->obtenirUsager(i);
        if (usager == nullptr) {
            continue;
        }
        // Et on l'ajoute en tant qu'item de la liste:
        // le nom et prenom sera affiché, et le pointeur sera contenu
        QListWidgetItem* item = new QListWidgetItem(
            QString::fromStdString(usager->obtenirNom()) + ", " + QString::fromStdString(usager->obtenirPrenom()), listUsager);
        item->setData(Qt::UserRole, QVariant::fromValue<Usager*>(usager));
        item->setHidden(filtrerMasque(usager));
    }
}

//Fonction qui retourne un boolean sur le type de filtre choisi
bool MainWindow::filtrerMasque(Usager* usager) {
    switch (indexCourantDuFiltre_) {
    case 1:
        return (typeid(*usager) != typeid(Client));
    case 2:
        return (typeid(*usager) != typeid(ClientPremium));
    case 3:
        return (typeid(*usager) != typeid(Fournisseur));
    case 0:
    default:
        return false;
    }
}

//Fonction qui affiche les usagers d'un certain type selon l'index donné en paramètre
//Il s'agit des champs du dropdown menu ( Tous les usagers = 0 , Tous les clients reguliers = 1, tous les fournisseurs = 2...)
void MainWindow::filtrerListe(int index) {

    indexCourantDuFiltre_=index; //l'index en parametre devient donc l'index courant
    for(int i=0; i<listUsager->count();i++) // boucle qui cree un QListWIdgetItem* et qui fait appel a la fonction setHidden, qui prend elle-meme en parametre la methode filtrerMasque
    {
        QListWidgetItem* item=listUsager->item(i);
        item->setHidden(filtrerMasque(item->data(Qt::UserRole).value<Usager*>()));
    }
}

//Fonction qui affiche les informations de l'usager sélectionné à partir de la liste.
//Ses informations sont affichées dans les boîtes de texte du panneau de droite.
//Les champs sont disabled à l'utilisateur pour éviter qu'il ne modifie l'objet
void MainWindow::selectionnerUsager(QListWidgetItem* item) {
    Usager* usager = item->data(Qt::UserRole).value<Usager*>();

    //Tous les champs sont mis à disabled et affiche l'information de l'usager sélectionné
    editeurNom->setDisabled(true);
    editeurNom->setText(QString::fromStdString(usager->obtenirNom()));

    editeurPrenom->setDisabled((true));
    editeurPrenom->setText(QString::fromStdString(usager->obtenirPrenom()));

    editeurIdentifiant->setDisabled((true));
    editeurIdentifiant->setText(QString::fromStdString(to_string(usager->obtenirIdentifiant())));

    editeurCodePostal->setDisabled((true));
    editeurCodePostal->setText(QString::fromStdString(usager->obtenirCodePostal()));

    editeurJoursRestants->setDisabled((true));

    //Affiche les jours restants s'il s'agit d'un ClientPremium, sinon on affiche "-"
    if(typeid(*usager)==typeid(ClientPremium))
        editeurJoursRestants->setText(QString::fromStdString(to_string(((ClientPremium*)usager)->obtenirJoursRestants())));
    else
        editeurJoursRestants->setText("-");

    //On met a checked le type d'usager qui est sélectionné
    list<QRadioButton*>::iterator end = boutonRadioTypeUsager.end();
    for (list<QRadioButton*>::iterator it = boutonRadioTypeUsager.begin(); it != end; it++) {
        (*it)->setDisabled(true);

        bool checked = false;

        if ((typeid(*usager) == typeid(Client) && (*it)->text().endsWith("Client"))
             || (typeid(*usager) == typeid(ClientPremium) && (*it)->text().endsWith("ClientPremium"))
             || (typeid(*usager) == typeid(Fournisseur) && (*it)->text().endsWith("Fournisseur"))) {
                checked = true;
        }
        (*it)->setChecked(checked);
    }

    boutonAjouter->setDisabled(true);
    boutonSupprimer->setDisabled(false);
}

//On remet à neuf la vue tel qu'on puisse y ajouter un nouvel usager
void MainWindow::nettoyerVue() {
    editeurNom->setDisabled(false);
    editeurNom->setText("");

    editeurPrenom->setDisabled(false);
    editeurPrenom->setText("");

    editeurIdentifiant->setDisabled(false);
    editeurIdentifiant->setText("");

    editeurCodePostal->setDisabled(false);
    editeurCodePostal->setText("");

    editeurJoursRestants->setDisabled(false);
    editeurJoursRestants->setText("");

    //Par défaut le boutons radios est à ClientPremium
    list<QRadioButton*>::iterator end = boutonRadioTypeUsager.end();
    for (list<QRadioButton*>::iterator it = boutonRadioTypeUsager.begin(); it != end; it++) {
        (*it)->setDisabled(false);
        if ((*it)->text().endsWith("ClientPremium")) {
            (*it)->setChecked(true);
        }
    }

    listUsager->clearSelection();
    boutonAjouter->setDisabled(false);
    boutonSupprimer->setDisabled(true);
    editeurNom->setFocus();
}

//Le champ JoursRestants est activé seulement s'il s'agit d'un ClientPremium
void MainWindow::changerTypeUsager(int index) {
    if (index == -2) {
        editeurJoursRestants->setDisabled(false);
    } else {
        editeurJoursRestants->setDisabled(true);
    }
}

//Supprimer tous les usagers de la liste
void MainWindow::supprimerTousLesUsagers() {
    vector<Usager*> tousLesUsagers;
    for(int i=0; i<listUsager->count();i++) // cette boucle parcourt la QListWidget et recupere chaque Usager* pour les mettre dans le vecteur crée précédemment

        tousLesUsagers.push_back((listUsager->item(i))->data(Qt::UserRole).value<Usager*>());

    for(Usager* usager :tousLesUsagers) //Cette boucle parcourt donc le vector précédemment cree (avec les Usager*), et les supprime un à un à l'aide de supprimerUsager
        gestionnaire_->supprimerUsager(usager);
}

//Supprime l'usager sélectionné dans la liste
void MainWindow::supprimerUsagerSelectionne() {

    // On cree un Usager* et on lui affecte la valeur de l'objet selectionné (avec selectedItems, il est précisé qu'il y en a seulement un de selectionné) dans la liste des Usager, ce qui correspond donc au premier element donc l'élément [0]
    Usager* usagerSelectionne=listUsager->selectedItems()[0]->data(Qt::UserRole).value<Usager*>();

        gestionnaire_->supprimerUsager(usagerSelectionne); //puis on le supprimer à l'aide de supprimerUsager
}

//Ajoute un nouvel usager dans la liste
void MainWindow::ajouterUsager() {

    Usager* nouvelUsager;

    //Utilisation d'un try throw catch pour faire un popup message si tous les champs ne sont pas remplis

    try
    {
        //On trouve le bon type d'usager selon le bouton radio sélectionné

        QRadioButton* type=nullptr;
        for(auto it=boutonRadioTypeUsager.begin();it!=boutonRadioTypeUsager.end();it++)
            if((*it)->isChecked())
            {
                type=*it;
                break;
            }


   // On créé le bon type d'usager selon le cas

    if(type->text().endsWith("Client")){ //On utilise la fonction endsWith() de la documentation car lorsqu'on fait le test "==" ça ne fonctionne pas
        nouvelUsager=new Client(editeurNom->text().toStdString(),
                                editeurPrenom->text().toStdString(),
                                editeurIdentifiant->text().toDouble(),
                                editeurCodePostal->text().toStdString());
    }
    else if(type->text().endsWith("ClientPremium")){
        nouvelUsager=new ClientPremium(editeurNom->text().toStdString(),
                                       editeurPrenom->text().toStdString(),
                                       editeurIdentifiant->text().toDouble(),
                                       editeurCodePostal->text().toStdString(),
                                       editeurJoursRestants->text().toDouble());
    }
    else{
        nouvelUsager=new Fournisseur(editeurNom->text().toStdString(),
                                     editeurPrenom->text().toStdString(),
                                     editeurIdentifiant->text().toDouble(),
                                     editeurCodePostal->text().toStdString());
    }

    //Vérification que tous les champs ont été complétés
    //On fait un throw, des que les champs sont vides
    if(editeurNom->text().toStdString()=="")
        throw(ExceptionArgumentInvalide("Erreur : Le champ nom n'est pas rempli"));

    if(editeurPrenom->text().toStdString()=="")
        throw(ExceptionArgumentInvalide("Erreur : Le champ prenom n'est pas rempli"));

    if(editeurIdentifiant->text().toStdString()=="")
        throw(ExceptionArgumentInvalide("Erreur : Le champ identifiant n'est pas rempli"));

    if(editeurCodePostal->text().toStdString()=="")
        throw(ExceptionArgumentInvalide("Erreur : Le champ code postal n'est pas rempli"));

    // On ajoute le nouvel usager créé au gestionnaire
    gestionnaire_->ajouterUsager(nouvelUsager);

    // Mais on le stocke aussi localement dans l'attribut ajoute_ pour pouvoir le supprimer plus tard
    ajoute_.push_back(nouvelUsager);
}
    //On "catch" les erreurs, qu'on a "throw" précedemment, si il y a lieu
    catch(ExceptionArgumentInvalide& e)
    {
        delete nouvelUsager; // Malgre l'erreur qui a été repéré, il ya theoriquement un usager crée avec des attributs vides(égaux à ""), donc il
                             //faut le supprimer puis afficher le message d'erreur
        afficherMessage(e.what());
    }
}

//Mise à jour de la vue après l'ajout d'un usager
void MainWindow::usagerAEteAjoute(Usager* u) {

    //Creation et ajout d'un item dans la QListWidget
    QListWidgetItem* item=new QListWidgetItem(QString::fromStdString( u->obtenirNom() + ", " + u->obtenirPrenom() ), listUsager);
    item->setData(Qt::UserRole, QVariant::fromValue<Usager*>(u));

    //Mise à jour de la vue
    item->setHidden(filtrerMasque(u));
    nettoyerVue();
}

//Mise à jour de la vue après la suppression d'un usager
void MainWindow::usagerAEteSupprime(Usager* u) {
    // On cherche dans notre QlistWidget l'usager pour lequel le
    // signal a été envoyé, afin de l'en retirer
    for (int i = 0; i < listUsager->count(); ++i) {
        QListWidgetItem *item = listUsager->item(i);
        Usager* usager = item->data(Qt::UserRole).value<Usager*>();
        if (usager == u) {
            // delete sur un QlistWidget item va automatiquement le retirer de la liste

            delete item;
            // Si l'usager faisait partie de ceux créés localement, on veut le supprimer.
            auto it = std::find(ajoute_.begin(), ajoute_.end(), u);
            if (it != ajoute_.end()) {
                delete *it;
                ajoute_.erase(it);
            }
            break;
        }
    }
    // On remet à zéro l'affichage du panneau de gauche étant
    // donné que l'usager sélectionné a été supprimé
    nettoyerVue();
}

#include "mainwindow.h"
#include "ui_mainwindow.h"

Q_DECLARE_METATYPE (string)

MainWindow::MainWindow(string nom, QWidget *parent) : QMainWindow(parent), ui(new Ui::MainWindow), lexique_(nom)
{
    ui->setupUi(this);
    setup();
}

MainWindow::~MainWindow()
{
    delete ui;
    delete listeMots_;
    delete barreDeRecherche_;
    delete nbFoisUtilises_;
    delete recentlyUsed_;
    delete labelNbUtilises_;
    delete labelRecentlyUsed_;
}

void MainWindow::setup()
{
    setMenu();
    setUI();
}

void MainWindow::setMenu()
{
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

void MainWindow::setUI()
{

    listeMots_=new QListWidget(this) ;
    connect(listeMots_, SIGNAL(itemClicked(QListWidgetItem*)),this,SLOT(dispNbUtilises()));


    barreDeRecherche_=new QTextEdit();
    barreDeRecherche_->setMaximumHeight(25);
    connect(barreDeRecherche_, SIGNAL(textChanged()),this,SLOT(chargerMots()));

    QFrame* verticalFrameLine = new QFrame;
    verticalFrameLine->setFrameShape(QFrame::VLine);

    labelNbUtilises_=new QLabel("Ce mot a ete utilise : ",this);
    labelNbUtilises_->setHidden(true);

    labelRecentlyUsed_=new QLabel("5 mots recemment utilises ?  ",this);
    labelRecentlyUsed_->setHidden(true);

    nbFoisUtilises_=new QLCDNumber();
    nbFoisUtilises_->setMaximumHeight(50);
    nbFoisUtilises_->setMaximumWidth(100);
    nbFoisUtilises_->setHidden(true);

    recentlyUsed_=new QLCDNumber();
    recentlyUsed_->setMaximumHeight(50);
    recentlyUsed_->setMaximumWidth(100);
    recentlyUsed_->setHidden(true);

    QPushButton* confirmation=new QPushButton();
    confirmation->setText("Confirmer l'entree");
    connect(confirmation, SIGNAL(clicked()), this, SLOT(ajouterDansRecemmentUtilise()));

    //layout Haut gauche
    QVBoxLayout* layoutHautGauche = new QVBoxLayout();
    layoutHautGauche->addWidget(barreDeRecherche_);
    layoutHautGauche->addWidget(confirmation);
    layoutHautGauche->addWidget(listeMots_);

    //layout Haut droite
    QVBoxLayout* layoutHautDroite = new QVBoxLayout();
    layoutHautDroite->addWidget(labelNbUtilises_);
    layoutHautDroite->addWidget(nbFoisUtilises_);
    layoutHautDroite->addWidget(labelRecentlyUsed_);
    layoutHautDroite->addWidget(recentlyUsed_);

    //layout Haut
    QHBoxLayout* layoutHaut = new QHBoxLayout();
    layoutHaut->addLayout(layoutHautGauche);
    layoutHaut->addWidget(verticalFrameLine);
    layoutHaut->addLayout(layoutHautDroite);



    QVBoxLayout* layoutBasGauche = new QVBoxLayout();


    //layout Haut droite
    QVBoxLayout* layoutBasDroite = new QVBoxLayout();



    //layout Haut
    QHBoxLayout* layoutBas = new QHBoxLayout();
    layoutBas->addLayout(layoutBasGauche);
    layoutBas->addWidget(verticalFrameLine);
    layoutBas->addLayout(layoutBasDroite);


    QVBoxLayout* mainLayout = new QVBoxLayout();
    mainLayout->addLayout(layoutHaut);


    QWidget* widget = new QWidget();
    widget->setLayout(mainLayout);

    setCentralWidget(widget);
}

void MainWindow::chargerMots()
{
   listeMots_->clear();

    vector<string> mots=*lexique_.getOccurences(barreDeRecherche_->toPlainText().toStdString());

    for(string mot : mots)
    {
        QListWidgetItem* item = new QListWidgetItem(QString::fromStdString(mot) , listeMots_);
    }
}


void MainWindow::ajouterDansRecemmentUtilise()
{
    string mot=barreDeRecherche_->toPlainText().toStdString();
    auto it= std::find_if(motsRecemmentUtilises_.begin(), motsRecemmentUtilises_.end(), [&](pair<string,unsigned> p){return p.first==mot;});

    if(it!=motsRecemmentUtilises_.end())
        (*it).second++;
    else
        motsRecemmentUtilises_.push_back(make_pair(mot,1));
}

void MainWindow::dispNbUtilises()
{
    string mot=(listeMots_->selectedItems().front()->text()).toStdString();
    auto it= std::find_if(motsRecemmentUtilises_.begin(), motsRecemmentUtilises_.end(), [&](pair<string,unsigned> p){return p.first==mot;});
    if(it!=motsRecemmentUtilises_.end())
    {
        int nb=(*it).second;
        nbFoisUtilises_->display(nb);



        std::sort(motsRecemmentUtilises_.begin(), motsRecemmentUtilises_.end(), [&](pair<string,unsigned> p1, pair<string,unsigned> p2) {return p1.second>p2.second;});

        bool condition=true;

        for(int i=0; i<5 && i<motsRecemmentUtilises_.size();++i)
            if(motsRecemmentUtilises_[i].first==mot)
                condition=false;

        if(condition)
            recentlyUsed_->display(0);
        else
            recentlyUsed_->display(1);
    }

    else
    {
        recentlyUsed_->display(0);
        nbFoisUtilises_->display(0);
    }


    nbFoisUtilises_->setHidden(false);
    labelNbUtilises_->setHidden(false);

    labelRecentlyUsed_->setHidden(false);
    recentlyUsed_->setHidden(false);


}




#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
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
#include <QDoubleValidator>
#include <QTextEdit>
#include <QLCDNumber>

#include<utility>
#include <algorithm>
#include "ArbreLexique.h"
namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(string nom, QWidget *parent = nullptr);
    ~MainWindow();


public slots :
    void chargerMots();
    void dispNbUtilises();
    void ajouterDansRecemmentUtilise();

private:
    Ui::MainWindow *ui;

    ArbreLexique lexique_;

    QListWidget* listeMots_;
    QTextEdit* barreDeRecherche_;
    QLCDNumber* nbFoisUtilises_;
    QLCDNumber* recentlyUsed_;
    QLabel* labelNbUtilises_;

    QLabel* labelRecentlyUsed_;

    vector<pair<string,unsigned>> motsRecemmentUtilises_;




    void setup();
    void setMenu();
    void setUI();

};

#endif // MAINWINDOW_H

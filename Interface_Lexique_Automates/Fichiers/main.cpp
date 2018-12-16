#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w("/Users/allan/C++_Projects/TP2_2810/TP2_2810/lexique 1.txt");
    w.show();

    return a.exec();
}


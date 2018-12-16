/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef GESTIONNAIRE_H
#define GESTIONNAIRE_H

#include <vector>
#include "Usager.h"
#include "Client.h"

#include <QObject>

using namespace std;

class Gestionnaire: public QObject
{
    Q_OBJECT

  public:
    vector<Usager*> obtenirUsagers() const;
    int obtenirNombreUsager() const;
    Usager* obtenirUsager(int index);

    /*À Implementer*/
    void ajouterUsager(Usager* usager);
    /*À Implementer*/
    void supprimerUsager(Usager* usager);

signals:
    void signal_usagerAjoute(Usager* usager);
    void signal_usagerSupprime(Usager* usager);

  private:
    vector<Usager*> usagers_;
};

#endif

/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef SOLDE_H
#define SOLDE_H

#include <string>
#include <iostream>

using namespace std;

class Solde
{
  public:
    Solde(int pourcentageRabais);
    virtual ~Solde() = 0; // par convention, pour rendre une classe abstraite lorsque celle-ci
                          // n'a aucune méthode qui mériterait d'être virtuelle pure, on préfère
                          // généralement rendre le destructeur de la classe virtuel pur.

    double obtenirPourcentageRabais() const;

    void modifierPourcentageRabais(int pourcentageRabais);

  protected:
    int pourcentageRabais_;
};

#endif

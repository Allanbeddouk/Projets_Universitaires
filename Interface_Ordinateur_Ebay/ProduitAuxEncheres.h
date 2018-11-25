/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef PRODUIT_AUX_ENCHERES_H
#define PRODUIT_AUX_ENCHERES_H

#include <string>
#include <iostream>
#include "Produit.h"
#include "Client.h"

using namespace std;

class ProduitAuxEncheres : public Produit
{
  public:
    ProduitAuxEncheres(double prix = 0.0);
    ProduitAuxEncheres(Fournisseur *fournisseur, const string &nom, int reference,
                       double prix = 0.0);

    virtual double obtenirPrixInitial() const;
    Client *obtenirEncherisseur() const;
    virtual void afficher() const;

    void modifierPrixInitial(double prixInitial);
    void modifierEncherisseur(Client* encherisseur);
    void mettreAJourEnchere(Client *encherisseur, double nouveauPrix);

  private:
    double prixInitial_;
    Client *encherisseur_;
};

#endif

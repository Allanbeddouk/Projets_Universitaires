/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef PRODUIT_H
#define PRODUIT_H

#include <string>

using namespace std;

class Fournisseur;

class Produit
{
  public:
    Produit(Fournisseur *fournisseur = nullptr, const string &nom = "outil",
            int reference = 0, double prix = 0.0);

    string obtenirNom() const;
    int obtenirReference() const;
    virtual double obtenirPrix() const;
    Fournisseur *obtenirFournisseur() const;
    virtual void afficher() const;

    void modifierNom(const string &nom);
    void modifierReference(int reference);
    void modifierPrix(double prix);
    void modifierFournisseur(Fournisseur *fournisseur);

  private:
    Fournisseur *fournisseur_;
    string nom_;
    int reference_;

  protected:
    double prix_;
};

#endif

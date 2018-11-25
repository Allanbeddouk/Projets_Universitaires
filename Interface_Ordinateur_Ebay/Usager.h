/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef USAGER_H
#define USAGER_H

#include <string>

using namespace std;

class Usager
{
  public:
    Usager(const string &nom = "Doe", const string &prenom = "John",
           int identifiant = 0, const string &codePostal = "A1A A1A");
    virtual ~Usager() = 0;
    string obtenirNom() const;
    string obtenirPrenom() const;
    int obtenirIdentifiant() const;
    string obtenirCodePostal() const;

    void modifierNom(const string &nom);
    void modifierPrenom(const string &prenom);
    void modifierIdentifiant(int identifiant);
    void modifierCodePostal(const string &codePostal);

  private:
    string nom_;
    string prenom_;
    int identifiant_;
    string codePostal_;
};

#endif

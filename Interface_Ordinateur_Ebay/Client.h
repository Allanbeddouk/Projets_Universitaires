/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef CLIENT_H
#define CLIENT_H

#include <string>
#include <vector>
#include "Usager.h"

using namespace std;

class Client : public Usager
{
  public:
    Client();
    Client(const string &nom, const string &prenom, int identifiant, const string &codePostal);

    unsigned int obtenirCodeClient() const;
    void modifierCodeClient(unsigned int codeClient);

  private:
    unsigned int codeClient_;
};

#endif

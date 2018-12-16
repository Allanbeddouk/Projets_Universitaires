/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef CLIENT_PREMIUM_H
#define CLIENT_PREMIUM_H

#include <string>
#include "Client.h"

using namespace std;

class ClientPremium : public Client
{
  public:
    ClientPremium(unsigned int joursRestants = 0);
    ClientPremium(const string &nom, const string &prenom, int identifiant, const string &codePostal, unsigned int joursRestants);

    unsigned int obtenirJoursRestants() const;
    void modifierJoursRestants(unsigned int joursRestants);

  private:
    unsigned int joursRestants_; // avant la fin de l'abonnement
};

#endif

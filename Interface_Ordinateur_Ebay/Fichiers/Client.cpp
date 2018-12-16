/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#include "Client.h"
#include <iostream>

Client::Client()
    : Usager()
{
}

Client::Client(const string &nom, const string &prenom, int identifiant,
               const string &codePostal)
    : Usager(nom, prenom, identifiant, codePostal)
{
}

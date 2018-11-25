/*
 * According to: Travaux Pratiques dans le cous INF1010 coordonnés par Martine BELLAICHE
 *
 * @authors Allan BEDDOUK & Robin CANTON-LAMOUSSE
 * @created: 2018-01-07
 * @modified: 2018-04-17
 */
#ifndef _H
#define INVALIDARGUMENTEXCEPTION_H

#include <exception>

#include <QException>
#include <QString>

class ExceptionMauvaisFormatImage : public QException {
public:
    ExceptionMauvaisFormatImage(QString s) : s_(s) {}
    virtual void raise() {throw *this;}
    ExceptionMauvaisFormatImage *clone() const { return new ExceptionMauvaisFormatImage(*this);}
    virtual QString what() {return s_;}
private:
    QString s_;
};
#endif // INVALIDARGUMENTEXCEPTION_H

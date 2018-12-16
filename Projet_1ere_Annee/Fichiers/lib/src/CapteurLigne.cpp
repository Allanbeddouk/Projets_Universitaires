#include "CapteurLigne.h"




    CapteurLigne::CapteurLigne()
    {
    }

    
    bool CapteurLigne:: horsLigne() const
    {
        return !etatExtremeGauche() && !etatGauche() && !etatCentre() && !etatDroite() && !etatExtremeDroite();
    }

    bool CapteurLigne:: etatExtremeGauche() const
    {
        _delay_ms(30);
        return !((PINA & 0x01)==0);
    }
    
    bool CapteurLigne:: etatGauche() const
    {
        _delay_ms(30);
        return !((PINA & 0x02)==0);
    }

    bool CapteurLigne:: etatCentre() const
    {
        _delay_ms(30);
        return !((PINA & 0x04)==0);
    }
    
    bool CapteurLigne:: etatDroite() const
    {
        _delay_ms(30);
        return !((PINA & 0x08)==0);
    }

      bool CapteurLigne:: etatExtremeDroite() const
    {
        _delay_ms(30);
        return !((PINA & 0x10)==0);
    }


    bool CapteurLigne:: lignePleine() const
    {
        bool possibilite1=etatExtremeGauche() && etatExtremeDroite();
        return possibilite1;
    }



    bool CapteurLigne:: ligneADroite() const
    {
        bool possibilite1=etatExtremeDroite() && etatDroite() && etatCentre() && !etatExtremeGauche();
        return possibilite1;
    }


    
    bool CapteurLigne:: ligneAGauche() const
    {
        bool possibilite1=etatExtremeGauche() && etatGauche() && etatCentre() && !etatExtremeDroite();
        return possibilite1;
    }


    bool CapteurLigne:: extremeGaucheUnique() const
    {
        return etatExtremeGauche() && !etatCentre() && !etatGauche() && !etatExtremeDroite() && !etatDroite();
    }


    bool CapteurLigne:: extremeDroiteUnique() const
    {
        return etatExtremeDroite() && !etatCentre() && !etatDroite() && !etatExtremeGauche() && !etatGauche();
    }

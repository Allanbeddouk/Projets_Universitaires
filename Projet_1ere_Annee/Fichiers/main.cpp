/****************************************************************************
* Fichier:main.cpp
* Auteurs: Allan Deddouk, Kevin Ciliento, David Dratwa, Roman Zhornytskiy
* Date de cr�ation: 20 octobre 2018
* Modifications: 6 novembre
* Description: Fichier pour le test de compilation avec commande make.
****************************************************************************/

#include<MouvementRobot.h>
#include<Roue.h>
#include <Sonorite.h>
#include <del.h>
#include <avr/interrupt.h>: Interrupts
#include <timer.h>
#include <capteursCote.h>
#include <affichageUART.h>

#include "lcm_so1602dtr_m_fw.h"
#include "customprocs.h"

#define F_CPU 8000000UL
#define DEMO_DDR	DDRC // `Data Direction Register' AVR occupe par l'aff.
#define DEMO_PORT	PORTC 


/*----------DECLARATION DES OBJETS----------*/

CapteurLigne capteurLigne;
MouvementRobot mouvement;
Del del;
Sonorite son;
Timer timer;
CapteursCote capteurCote;
LCM disp(&DEMO_DDR, &DEMO_PORT);




/*----------DECLARATION DES VARIABLES GLOBALES----------*/
volatile bool interruptionINT0 = false;
volatile bool enParcours=true;
volatile bool etatLumiere = Rouge;
volatile bool etatTransmission = false; // Il n'y a pas de transmission

/*----------DECLARATION DES CONSTANTES ----------*/
static const uint16_t TEMPS_LECTURE = 286;
static const uint8_t TEMPS_AMBRE = 10;
static const uint16_t TEMPS_VERT = 250;

bool ligneDeDepart=false;
uint8_t vitesse=115;

/*----------FONCTIONS D'INTERRUPTIONS/INIT----------*/
//Interruption par le temps (Quand OCR2A == TCNT2)

ISR ( TIMER2_COMPA_vect ) 
{
    if(timer.getIteration()==0) //Si la dernière iteration
    { 
        if(enParcours == true)
        {
            capteurCote.lireDistanceGauche();
            capteurCote.lireDistanceDroite();

            timer.resetTimer(); 
            timer(TEMPS_LECTURE);     
        }

        else // Etat ambre
        {
            if(etatTransmission == false && etatLumiere==Rouge)
            {
                del.allumer(Rouge);etatLumiere = Vert;
                timer.resetTimer(); 
                timer(TEMPS_AMBRE); 
            }
            else if(etatTransmission==false)
            {
                del.allumer(Vert);etatLumiere = Rouge;
                timer.resetTimer(); 
                timer(TEMPS_AMBRE); 
            }

            else
            {
                if(etatLumiere == Vert)
                {
                    del.allumer(Vert); etatLumiere = 1; //etat qui n'est pas vert
                    timer.resetTimer(); 
                    timer(TEMPS_VERT); 
                }
                else
                {
                    del.eteindre(); etatLumiere = Vert;
                    timer.resetTimer(); 
                    timer(TEMPS_VERT); 
                }
            }
  
        }

    }
    else
    {
        timer--; //Sinon, décrémente le nombre d'itération restante
    }
}

// Interruption par bouton poussoir de le carte mère
ISR ( INT0_vect ) 
{
    if( antiRebond() )
    {
        interruptionINT0 = true;
    }
}


//Initialise les PORTS et active les interruptions
void initialisation () 
{
    cli (); //Bloque les interruption
    DDRA = 0; // PORT A est en en entree pour les capteurs de cote et les capteurs de ligne
    DDRB=0xff; // PORT B est en sortie pour la del et le piezo electrique
    DDRC = 0xff; // PORT C est en mode sortie pour l'affichage de l'ecran LCD
    DDRD = 0xff; // PORT D est en mode sortie pour kes roues
    DDRD &= ~(_BV(PD2)); // permet les interuptions
    
    
    EIMSK |= (1 << INT0) ;


    // il faut sensibiliser les interruptions externes aux
    // changements de niveau du bouton-poussoir
    // en ajustant le registre EICRA

    EICRA |=  (0 << ISC01) | (1 << ISC00);

    initialisationUART();

    sei (); //Active les interruptions
}

int main()
{
    initialisation();
   
    disp.write("Rocky", 0, true);
    _delay_ms(3000);

    enParcours = true;
    
   //Demarrage du robot
    mouvement.avancer(vitesse);


    for(;;)
    {
        if( capteurLigne.lignePleine() )
        {
            timer(TEMPS_LECTURE);
            del.allumer(Rouge);

            if(ligneDeDepart)
            {
                mouvement.arreter();
                break;
            }

            if(!ligneDeDepart)
                ligneDeDepart=true;

            mouvement.avancer(vitesse);
        }


       
        if( capteurLigne.ligneADroite() )
        {
            
            while(!capteurLigne.horsLigne()){mouvement.ajusterTrajectoireAv();} 
            mouvement.arreter(); // On attend qu'il se rende au point B.

            timer.arreterTimer();

            mouvement.propulsionAr();


            while( !capteurLigne.ligneADroite() )
            {   mouvement.reculer(vitesse);
                mouvement.ajusterTrajectoireAr();
            }
             
            mouvement.arreter(); //recule jusqu'a re atteindre le point de l'intersection A

            // LES MESURES S'ARRETENT

            mouvement.avancer(vitesse);
            _delay_ms(500);

            mouvement.tournerADroite();
            while( capteurLigne.extremeGaucheUnique() ) {} 

            mouvement.avancer(vitesse);
            _delay_ms(300); //avance pour augmenter le degre du virage

            mouvement.tournerADroite();
            while(  !capteurLigne.etatCentre() ) {} 

            mouvement.avancer(vitesse);
            _delay_ms(300); //avance pour augmenter le degre du virage

            mouvement.tournerADroite();

            mouvement.avancer(vitesse);     
            _delay_ms(350);
            
            mouvement.tournerAGauche();
            while( !capteurLigne.etatExtremeGauche() ) {}

            capteurCote.ajustementPositif();

            timer(TEMPS_LECTURE);

            mouvement.avancer(vitesse);
        }


         if( capteurLigne.ligneAGauche() )
        {
            while(!capteurLigne.horsLigne()){mouvement.ajusterTrajectoireAv();}
            mouvement.arreter();

            timer.arreterTimer();


            mouvement.propulsionAr();

            while( !capteurLigne.ligneAGauche() ) //recule jusqu'a re atteindre le point de l'intersection
            {   mouvement.reculer(vitesse);
                mouvement.ajusterTrajectoireAr();
            }
            
            mouvement.arreter();


            mouvement.avancer(vitesse);
            _delay_ms(500);

            mouvement.tournerAGauche();
            while( capteurLigne.extremeDroiteUnique() ) {} 
            //attendre que le capteur de l'extreme droite uniquement soit active

            mouvement.avancer(vitesse);
            _delay_ms(300); //avance pour augmenter le degre du virage


            mouvement.tournerAGauche();
            while( !capteurLigne.etatCentre() ) {} 

            mouvement.avancer(vitesse);
            _delay_ms(300); //avance pour augmenter le degre du virage

            mouvement.tournerAGauche();

            mouvement.avancer(vitesse);
            _delay_ms(350);

            mouvement.tournerADroite();
            while( !capteurLigne.etatExtremeDroite() ) {}

            capteurCote.ajustementNegatif();

            timer(TEMPS_LECTURE);

            mouvement.avancer(vitesse);
        }

        mouvement.ajusterTrajectoireAv();
    } 

    timer.arreterTimer();
    enParcours = false;
    del.eteindre();
    interruptionINT0 = false;

    capteurCote.calculerLongueurTotale();

    disp.write("GAUCHE: ", 0, true);disp << capteurCote.getLongueurGauche()  <<" cm"; 
    disp.write("DROITE: ", LCM_FW_HALF_CH, false); disp <<capteurCote.getLongueurDroite() <<" cm";
    




    //partie ambré et son
    DDRD &= ~(_BV(PD2));
    for(;;)
    {
        if(interruptionINT0)
        {
            etatTransmission=true;
            timer(TEMPS_VERT);
            uint8_t nbValeursRetirees=capteurCote.getPositionG()-96;
            uint8_t compteur=0;
            uint8_t decoupe= capteurCote.getPositionG() / (nbValeursRetirees);
            for (uint16_t i = capteurCote.getPositionG()-1; i >0 ; i--)
            {
                if(i>=decoupe && (i%decoupe)==0 && capteurCote.getPositionG()>96 && compteur + 1 <nbValeursRetirees)
                {
                    afficherMapMur((capteurCote.getTabGauche()[i]+capteurCote.getTabGauche()[i-1])/2, (capteurCote.getTabDroite()[i]+capteurCote.getTabDroite()[i-1])/2);
                    --i;
                    ++compteur;
                }
                else
                    afficherMapMur(capteurCote.getTabGauche()[i], capteurCote.getTabDroite()[i]);
            }
            
            etatTransmission=false;

            timer(TEMPS_AMBRE);

            son.jouerMusiqueRocky();

            timer.arreterTimer();

            interruptionINT0 = false; // pour sortir du "if"
        }
        del.eteindre();
    }
    return 0;
 
}

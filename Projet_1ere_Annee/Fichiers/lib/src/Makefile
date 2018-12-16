########       AVR Project Makefile       ########
#####                                        #####
#####      Makefile produit et ecrit par     #####
#####   Allan Beddouk, Kevin Ciliento  		 #####
#####	David Dratwa, Roman Zhornytskiy      #####	
#####           INF1900 - 2018               #####
#####                                        #####
#####         Inspire de Pat Deegan -        #####
#####  Psychogenic Inc (www.psychogenic.com) #####
##################################################

# Ce Makefile vous permet de compiler des projets
# pour les microcontroleurs Atmel AVR sur 
# Linux ou Unix, en utilisant l'outil AVR-GCC. 
# Ce Makefile supporte C & C++


#####      Details specifique a la cible       #####
#####  Vous devez les adapter a votre projet   #####

# Nom du microcontroleur cible
# (exemple: 'at90s8515')
MCU=atmega324pa
# Nom de votre projet
# (utilisez un seul mot, exemple: 'monprojet')
PROJECTNAME=lib
LIBDIR=#../data/
MESSAGE=@printf '%s\n' \
            ' '\
            '------->Le fichier $@ a ete créé avec succès<-------' \
            ' '
# Fichiers sources
# Utilisez le suffixe .cpp pour les fichiers C++
# Listez tous les fichiers a compiler, separes par
# un espace. exemple: 'tp1.c tp2.cpp':
#PRJ_SRC_DIR=../src/
PRJSRC=  $(wildcard *.cpp)

####################################################
#####         Configuration terminee           #####
#####                                          #####
#####  Le reste de cette section contient les  #####
##### details d'implementation vous permettant #####
##### de mieux comprendre le fonctionnement de ##### 
#####   ce Makefile en vue de sa modification  #####
####################################################



####### variables #######

#compilateur utilise
CCLIB= avr-ar rcs
CC=avr-gcc 
#pour supprimer les fichiers lorsque l'on appel make clean
REMOVE=rm -f



####### Options de compilation #######

# Flags pour le compilateur en C
CFLAGS=-I. -MMD $(INC) -g -mmcu=$(MCU) -O$(OPTLEVEL) \
	-fpack-struct -fshort-enums             \
	-funsigned-bitfields -funsigned-char    \
	-Wall                                        

# Flags pour le compilateur en C++
CXXFLAGS=-fno-exceptions     


####### Cible (Target) #######

#Nom des cibles par defaut
TRG=$(PROJECTNAME).a

# Linker pour lier les librairies utilisees
LDFLAGS=-Wl,-Map,$(TRG).map -mmcu=$(MCU)

# Fichier C
CFILES=$(filter %.c, $(PRJSRC))
####### Definition de tout les fichiers objets #######
CPPFILES=$(filter %.cpp, $(PRJSRC))

# Liste de tout les fichiers objet que nous devons creer
OBJDEPS=$(CFILES:.c=$(LIBDIR).o) \
	$(CPPFILES:.cpp=$(LIBDIR).o)
	
# Pour plus d'information sur cette section, consulter :
# http://bit.ly/257R53E	
# Les fonctions $(filter patternâ€¦,text) &
# $(patsubst pattern,replacement,text) sont pertinentes
	


####### Creation des commandes du Makefile ####### 


.PHONY: all clean 


all: $(TRG)

# Implementation de la cible
$(TRG): $(OBJDEPS)
	$(CCLIB) $(LIBDIR)$(TRG) $(OBJDEPS)  #avr-ar rcs -o ../lib/lib.a %.o
	$(MESSAGE)
# Production des fichiers object
# De C++ a objet
%.o: %.c 
	$(CC) $(CFLAGS) -c $<
	$(MESSAGE)
# De C++ a objet
%.o: %.cpp
	$(CC) $(CFLAGS) $(CXXFLAGS) -o $(LIBDIR)$@ -c $<
	$(MESSAGE)


# Make clean permet d'effacer tout les fichiers generes
# lors de la compilation
clean:
	$(REMOVE) $(LIBDIR)*.o $(LIBDIR)*.d $(LIBDIR)*.a
	
	@printf '%s\n' \
            ' '\
            '#----->NÉTOYAGE DE LA LIBRAIRIE ÉXÉCUTÉE AVEC SUCCÈS<-----'\                             
	     # Commande  : make  $@				

#####                    EOF                   #####

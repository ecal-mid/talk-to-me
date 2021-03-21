# Talk to Me
*ressources semaine bloc 1CVmid / ECAL M&ID Mars 2021*

*Alain Bellet + Paul Noel*

## Uttilisation Board arduino Nano 
1. installer arduino https://www.arduino.cc/en/software
2. ouvrir arduino
3. menu *Tools > Boards* sélectionner  **Arduino Nano**
4. menu *Tools > Boards > Processor* sélectionner **ATmega328P (old bootloader)**
5. menu *Tools > Boards > Port* sélectionner le dernier de la liste (devrait contenir le mot **usbserial** sur mac)


## Utilisation Serial dans Chrome
1. Activer "experimental-web-platform-features" via [chrome://flags/](chrome://flags/) 
2. ouvrir le fichier `browser/serial_monitor.html`
3. connecter la board Arduino via USB
4. appuyer sur le bouton **connect**
5. une fenêtre avec une liste de ports serial doit s'ouvrir
6. sélectionner le bon port (à vérifier mac/pc)
7. le status à côté du bouton connect devrait indiquer **connected**
8. les système est prêt pour communiquer dans les deux sens

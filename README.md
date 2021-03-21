# Talk to Me

_ressources semaine bloc 1CVmid / ECAL M&ID Mars 2021_

_Alain Bellet + Paul Lëon_

## Utilisation Board arduino Nano

1. installer arduino https://www.arduino.cc/en/software
2. ouvrir arduino
3. menu _Tools > Boards_ sélectionner **Arduino Nano**
4. menu _Tools > Boards > Processor_ sélectionner **ATmega328P (old bootloader)**
5. connecter la board via USB
6. menu _Tools > Boards > Port_ sélectionner le dernier de la liste (devrait contenir le mot **usbserial** sur mac)
7. faire un test en ouvrant l'exemple via menu _Files > Examples > 01 Basic > Blink_
8. appuyer sur le bouton avec la flèche (upload)
9. si l'upload se passe bien vous devriez maintenant avoir une LED qui clignote sur votre board
   _[potentiel problème](https://github.com/ecal-mid/talk-to-me/blob/main/Exemples/arduino/README.md)_

## Utilisation Serial dans Chrome

1. Activer "experimental-web-platform-features" via [chrome://flags/](chrome://flags/)
2. ouvrir le fichier `browser/serial_monitor.html`
3. connecter la board Arduino via USB
4. appuyer sur le bouton **connect**
5. une fenêtre avec une liste de ports serial doit s'ouvrir
6. sélectionner le bon port (même que dans Arduino, à vérifier mac/pc) **Attention, vérifier que le serial monitor n'est pas ouvert dans Arduino**
7. le status à côté du bouton connect devrait indiquer **connected**
8. les système est prêt pour communiquer dans les deux sens

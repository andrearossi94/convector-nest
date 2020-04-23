#!/bin/bash
echo "Test get"
echo "Dovrebbe andare a buon fine"
sleep 1
hurl invoke cartellaclinica cartellaclinica_get "Cart1" -u dottore1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
hurl invoke cartellaclinica cartellaclinica_get "Cart1" -u paziente1
echo "Dovrebbe dare errore"
sleep 2
hurl invoke cartellaclinica cartellaclinica_get "Cart1" -u dottore2
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
hurl invoke cartellaclinica cartellaclinica_get "Cart1" -u paziente2
sleep 2
echo "Test consenso"
echo "Dovrebbe andare a buon fine"
sleep 1
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" -u paziente1
echo "Dovrebbe dare errore"
sleep 2
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" -u paziente2
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" -u dottore1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
hurl invoke cartellaclinica cartellaclinica_cambiaconsenso "Cart1" -u dottore2
sleep 2
echo "Test stato"
echo "Dovrebbe andare a buon fine"
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" -u dottore2
sleep 2
echo "Dovrebbe dare errore"
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" -u paziente2
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" -u dottore1
echo "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
sleep 1
hurl invoke cartellaclinica cartellaclinica_degenza "Cart2" -u paziente1
echo "Test username, dovrebbe andare a buon fine"
hurl invoke cartellaclinica cartellaclinica_getByUsername "Paz1" -u dottore1
sleep 1
echo "Dovrebbe dare errore"
hurl invoke cartellaclinica cartellaclinica_getByUsername "Paz1" -u dottore2
echo "FINE"

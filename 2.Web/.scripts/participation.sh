#!/bin/sh

# --------------------------------------
#
#
#
# --------------------------------------

source ../.scripts/students.sh --source-only

   
echo "# Participation au `date +"%d-%m-%Y %H:%M"`"
echo ""


echo "| Table des matières            | Description                                             |"
echo "|-------------------------------|---------------------------------------------------------|"
echo "| :a: [Présence](#a-présence)   | L'étudiant.e a fait son travail    :heavy_check_mark:   |"
echo "| :b: [Précision](#b-précision) | L'étudiant.e a réussi son travail  :tada:               |"

echo ""
echo "## Légende"
echo ""

echo "| Signe              | Signification                 |"
echo "|--------------------|-------------------------------|"
echo "| :heavy_check_mark: | Prêt à être corrigé           |"
echo "| :x:                | Projet inexistant             |"


echo ""
echo "## :a: Présence"
echo ""
echo "|:hash:| Boréal :id:                | Fait               |"
echo "|------|----------------------------|--------------------|"

i=1

for id in "${ETUDIANTS[@]}"
do
   FILE=${id}/README.md
   FILE1=${id}/mon_premier_script.html
   FILE2=${id}/mon_premier_script.js
   OK="| ${i} | [${id}](../${FILE}) | [:heavy_check_mark:] | "
   KO="| ${i} | [${id}](../${FILE}) | [:x:]                | "
   if [[ -f "$FILE" && -f "$FILE1" && -f "$FILE2" ]]; then
       echo ${OK}
   else
       echo ${KO}
   fi
   let "i++"
done

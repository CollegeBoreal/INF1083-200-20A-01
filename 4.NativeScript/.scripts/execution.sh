#!/bin/sh

# --------------------------------------
#
#
#
# --------------------------------------

source ../.scripts/students.sh --source-only

source .scripts/spec.sh --source-only

echo "# Execution au `date +"%d-%m-%Y %H:%M"`"

for id in "${ETUDIANTS[@]}"
do

   FILE=b${id}/src/tests

   echo ""
   echo "## Etudiant ${id} "
   echo "###  =[BEGIN]============== Génération des tests unitaires pour ${id} =============== "

   if [ -d "$FILE" ]; then
       cd b${id}
       ns test init --framework jasmine
       npm install @types/jasmine --save-dev 
       cd ..
       OK=":pushpin: Unit Tests Generated ..."
   else
       OK=":+1: Unit Tests already Generated ..."
   fi

   echo "\`\`\`"
   echo ${OK}
   echo "\`\`\`"

   generate_spec 

   echo "###  =[END]============== Génération des tests unitaires pour ${id} =============== "

done

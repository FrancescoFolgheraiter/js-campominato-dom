/*
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.

SVOLGIMENTO
1)prendo in input il pulsante gioca
2)genero una griglia composta da celle 10 x 10
    -uso un ciclo da 1-100 ad ogni giro di cilo creo una cella
        *per creare una cella devo prima creare l'elento
        *poi do la classe all'elemento
        *poi la "appendo" nel mio DOM
    -al click sulla cella dell'utente la cella cambia colore e manda un msg in console
*/
//input pulsante gioca
const gioca = document.querySelector("button");
let giocoAttivo = false;
gioca.addEventListener("click", function(){
    const level = parseInt(document.querySelector("select").value);
    console.log(level, typeof level)
    //campo di gioco in input
    const field = document.querySelector('main > .container');
    if(giocoAttivo){
        field.innerHTML="";
        giocoAttivo = false;
    }
    else{
        //dichiarazione variabile totate celle
        let layout="easy";
        //controllo del quantitativo di celle da generare
        if(level==1){
            layout="easy"
            generateField(field, 100, layout);
        }
        else if(level==2){
            layout="medium"
            generateField(field, 81, layout);
            
        }
        else{
            layout="hard"
            generateField(field, 49, layout);
        }  
        giocoAttivo = true;
    }
})
//FUNCTION
function generateField(stamp, range, size){
    //generazione campo di gioco
    for (let i = 1; i <= range; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', size);
        cell.innerHTML = i;
        stamp.append(cell);
        //prendo l'evento click sulle celle generate 
        cell.addEventListener("click", function() {
            //aggiungo o tolgo la classe che cambia colore alla cella
            this.classList.toggle('active'); 
            //stampo in console la cella cliccata
            console.log("il numero della cella attivata è:",this.innerHTML) 
        })
    }
}
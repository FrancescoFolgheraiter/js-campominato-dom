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
    let mines = [];
    const level = parseInt(document.querySelector("select").value);
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
            generateMines(100, mines)
            generateField(field, 100, layout, mines);
        }
        else if(level==2){
            layout="medium"
            generateMines(81, mines)
            generateField(field, 81, layout, mines);
        }
        else{
            layout="hard"
            generateMines(49, mines)
            generateField(field, 49, layout, mines);
        }  
        giocoAttivo = true;
    }
    console.log("l'array è ",mines, typeof mines);   
})
//FUNCTION
//generazione campo di battaglia
function generateField(stamp, range, size, bomb){
    //flag fine partita
    let flag = true;
    let points = 0;
    let validNumber =[];
    //generazione campo di gioco
    for (let i = 1; i <= range; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', size);
        cell.innerHTML = i;
        stamp.append(cell);
        //associazione mine ai numeri sul campo
        if(bomb.includes(i)){
            cell.classList.add('mine');
        }
        else{
            validNumber.push(i)
        } 
            //prendo l'evento click sulle celle generate 
            cell.addEventListener("click", function(){
                game(validNumber, this, i)
            })
            function game(array, cell, index){ 
                let k = 0;
                if(flag == false){
                    return
                }
                console.log(array,"la lunghezza è", array.length)
                //aumento punti nel caso la casella non abbia la classe active
                if(!(cell.classList.contains("active"))){
                    points += 1;
                }
                //aggiungo la classe che cambia colore alla cella se la partita è ancora attiva
                cell.classList.add('active');
                //toglo gli elemnti cliccati dal numeri validi
                k = array.indexOf(index);
                array.splice(k, 1);
                if(array.length == 0){
                    flag = false;
                    alert("Hai vinto con il seguente punteggio: "+ points)
                    return
                }
                if (cell.classList.contains("active") && cell.classList.contains("mine")){
                    points -= 1;
                    alert("hai perso! il tuo punteggio è di: " + points + "punti")
                    cell.classList.add('mine-active')
                    flag=false;
                }
            }
            //fine evento click
    }
    console.log("Imbroglia con i seguenti numeri", validNumber, typeof validNumber)
}

//generazione array di 16 numeri casuali[mine]
function generateMines(range, mines){
    for (let i = 0; i < 16; i++) {
        let number = generateRandomNumber(1, range)
        let flag = mines.includes(number);
        //ciclo di generazione nuovo numero se già presente nell'array
        while (flag) {
            number = generateRandomNumber(1, range);
            flag= mines.includes(number);
        }
        mines.push(number);
    }
}
//generazione numero rando
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
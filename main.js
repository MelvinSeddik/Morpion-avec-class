import Morpion from "./Morpion.js";

class Player {
    constructor(name, symbole, score) {
        this.name = name;
        this.symbole = symbole;
        this.score = score;
    }
}

const cells = document.querySelectorAll("td");
let player1 = new Player("Raimon", "X", "0");
let player2 = new Player("Albert", "O", "0");
let actualPlayer = player1;
let bottomMessage = document.querySelector("#message");

const morpion = new Morpion(cells, player1, player2);

document.querySelector("#start-game").addEventListener("click", function(e){
    e.preventDefault;
    let chooseName1 = document.querySelector("#j1").value;
    let symbole1 = document.querySelector("#s1");
    let chooseName2 = document.querySelector("#j2").value;
    let symbole2 = document.querySelector("#s2");

    if (chooseName1 !== "" && chooseName2 !== "" && symbole1.selectedIndex !== symbole2.selectedIndex){ 
        player1.name = chooseName1;
        player1.symbole = symbole1.value;
        player2.name = chooseName2;
        player2.symbole = symbole2.value;

        document.querySelector("#name1").innerHTML = player1.name;
        document.querySelector("#s1-display").innerHTML = player1.symbole
        document.querySelector("#name2").innerHTML = player2.name;
        document.querySelector("#s2-display").innerHTML = player2.symbole
        document.querySelector(".game-menu").style.display="none";
        bottomMessage.innerHTML = "C'est au tour de " + morpion.actualPlayer.name;
    }

})

for (let cell of cells) {
    /* Lorsqu'on clique sur une case du morpion */
    cell.addEventListener("click", function () {
        /* Si la partie n'est pas terminée et que la case est vide */
        if (!morpion.gameOver && this.innerHTML === "") {
            morpion.playTurn(this);

            /* On vérifie la victoire a partir du 5ème tour */
            if (morpion.turn >= 5) {
                /* Si la fonction renvoie quelque chose... c'est que quelqu'un a gagné! Donc on fait appel à la fonction victory en passant en param ce que la fonction renvoie */
                if (morpion.checkVictory() != undefined) {
                    victory(morpion.checkVictory()[0], morpion.checkVictory()[1]);
                }
            }
            /* Si on atteint le 9ème tour et que la partie n'est pas terminée... On termine la partie et on appelle la fonction replay  */
            if (morpion.turn === 9 && morpion.gameOver === false) {
                morpion.gameOver = true;
                console.log("Toutes les cases remplies, Match nul!")
                replay("Match nul!");
            }

            if (!morpion.gameOver) {
                console.log("échange de joueur")
                morpion.alternate();
                bottomMessage.innerHTML = "C'est au tour de " + morpion.actualPlayer.name;
            }
        }
    })
}

/* Effets visuels en cas de victoire, attribution de point pour le vainqueur et appel de la fonction replay */
function victory(direction, i) {
    if (direction === "row") {
        cells[i].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[i + 1].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[i + 2].style.backdropFilter = "saturate(600%) hue-rotate(165deg)";
        replay("Victoire de " + morpion.actualPlayer.name);
    }
    else if (direction === "column") {
        cells[i].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[i + 3].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[i + 6].style.backdropFilter = "saturate(600%) hue-rotate(165deg)";
        replay("Victoire de " + morpion.actualPlayer.name);
    }
    else if (direction === "diagonal1") {
        cells[0].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[4].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[8].style.backdropFilter = "saturate(600%) hue-rotate(165deg)";
        replay("Victoire de " + morpion.actualPlayer.name);
    }
    else if (direction === "diagonal2") {
        cells[6].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[4].style.backdropFilter = "saturate(600%) hue-rotate(165deg)"; cells[2].style.backdropFilter = "saturate(600%) hue-rotate(165deg)";
        replay("Victoire de " + morpion.actualPlayer.name);
    }
    if (morpion.actualPlayer === morpion.player1) {
        morpion.player1.score++;
        document.querySelector("#p1 .score").innerHTML = "Score : " + morpion.player1.score;
        document.querySelector("#p1").style.background = "red";
        document.querySelector("#p1").style.color = "white";
    }
    else {
        morpion.player2.score++;
        document.querySelector("#p2 .score").innerHTML = "Score : " + morpion.player2.score;
        document.querySelector("#p2").style.background = "red";
        document.querySelector("#p2").style.color = "white";
    }

}

/* On affiche le statut de la partie ainsi qu'un bouton rejouer */
function replay(txt) {
    bottomMessage.innerHTML = txt;
    let btn = document.createElement("button");
    btn.innerHTML = "Rejouer";
    bottomMessage.appendChild(btn);
    btn.addEventListener("click", function () {
        reset();
        btn.remove();
    })
}

/* On réinitialise le morpion */
function reset() {
    for (let cell of cells) {
        cell.innerHTML = "";
        cell.style.backdropFilter = "unset";
    }
    morpion.init();
    document.querySelector("#p1").style.background = "";
    document.querySelector("#p1").style.color = "unset";
    document.querySelector("#p2").style.background = "";
    document.querySelector("#p2").style.color = "unset";
    bottomMessage.innerHTML = "";  
    morpion.alternate();
}



export default class Morpion{
    constructor(cells, player1, player2){
        this.cells = cells;
        this.gameOver = false;
        this.turn = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.actualPlayer = this.player1;
    }

    playTurn(elem) {
        this.turn++;
        elem.innerHTML = this.actualPlayer.symbole;
    }

    alternate() {
        this.actualPlayer = (this.actualPlayer === this.player1) ? this.player2 : this.player1;
    }

    checkVictory() {
        let victory;
        for(let i of [0, 3, 6]){
            if(this.cells[i].innerHTML === this.actualPlayer.symbole && this.cells[i].innerHTML === this.cells[i+1].innerHTML && this.cells[i+1].innerHTML === this.cells[i+2].innerHTML){
                victory = "row";
                this.gameOver = true;
                return [victory, i];
            }
        }
        for(let i of [0, 1, 2]){
            if(this.cells[i].innerHTML === this.actualPlayer.symbole && this.cells[i].innerHTML === this.cells[i+3].innerHTML && this.cells[i+3].innerHTML === this.cells[i+6].innerHTML){
                victory = "column";
                this.gameOver = true;
                return [victory, i];
            }
        }
        if(this.cells[0].innerHTML === this.actualPlayer.symbole && this.cells[0].innerHTML === this.cells[4].innerHTML && this.cells[4].innerHTML === this.cells[8].innerHTML){
            victory = "diagonal1";
            this.gameOver = true;
            return [victory];
        }
        if(this.cells[6].innerHTML === this.actualPlayer.symbole && this.cells[6].innerHTML === this.cells[4].innerHTML && this.cells[4].innerHTML === this.cells[2].innerHTML){
            victory = "diagonal2";
            this.gameOver = true;
            return [victory];
        }
    }

    init(){
        this.gameOver = false;
        this.turn = 0;
    }
}






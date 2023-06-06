let numRows = 6;
let numCols = 7;
let turn = 1;

let app = Vue.createApp( {
    data () {
        return{
            playfield: []
        }
    },
    methods: {
        createGrid(width, height) {
            for (let y = 0; y < 6; y++) {
                for (let x = 0; x < 7; x++) {
                    this.playfield.push({
                        x: x,
                        y: y,
                        playerOccupancy: '',
                        coords: 7 * y + x
                    });                  
                }
            }
            console.table(this.playfield);
        },
        moveMade(boxX, boxY, boxC, boxP) {
            
            
            console.log(boxC, boxX, boxY, boxP);
            
            if (boxP === ''){
                boxP = turn;

                if(boxC > 34){
                    if (turn === 1){
                        this.playfield[boxC].playerOccupancy = '🔵';
                        turn++;
                    }
                    else{
                        this.playfield[boxC].playerOccupancy = '🔴';
                        turn--;
                    }
                }
                else {
                    if (this.playfield[boxC+7].playerOccupancy != '' && this.playfield[boxC].playerOccupancy == ''){
                        if (turn === 1){
                            this.playfield[boxC].playerOccupancy = '🔵';
                            turn++;
                        }
                        else{
                            this.playfield[boxC].playerOccupancy = '🔴';
                            turn--;
                        }
                    }
                    else{
                        if (this.playfield[boxC+(7*(5-boxY))].playerOccupancy == ''){
                            if (turn === 1){
                                this.playfield[boxC+(7*(5-boxY))].playerOccupancy = '🔵';
                                turn++;
                                }
                            else{
                                this.playfield[boxC+(7*(5-boxY))].playerOccupancy = '🔴';
                                turn--;
                            }
                        }
                        else{
                        for (i = (5 - boxY) ; i > 0 ; i--){
                            console.log(boxC+(7*(i)))
                            if (this.playfield[boxC+(7*i)].playerOccupancy == '' && (this.playfield[boxC+(7*(i+1))].playerOccupancy != '' || this.playfield[boxC+(7*(i+1))].playerOccupancy == null)){
                                if (turn === 1){
                                    this.playfield[boxC+(7*i)].playerOccupancy = '🔵';
                                    turn++;
                                    break;
                                }
                                else{
                                    this.playfield[boxC+(7*i)].playerOccupancy = '🔴';
                                    turn--;
                                    break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else{
                for (i = 0 ; i < (boxY + 1) ; i++){
                if (this.playfield[boxC-(7*i)].playerOccupancy == ''){
                    if (turn === 1){
                        this.playfield[boxC-(7*i)].playerOccupancy = '🔵';
                        turn++;
                       break;
                    }
                    else{
                        this.playfield[boxC-(7*i)].playerOccupancy = '🔴';
                        turn--;
                        break;
                    }   
                    }
                }        
            }
        }
    },
    
    mounted() {
        this.createGrid(numRows, numCols);
    },
});

app.mount(".game-window");
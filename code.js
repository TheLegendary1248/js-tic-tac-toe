console.log(window)

document.addEventListener("keydown", function onEvent(event) {
    event = event || window.event;

    console.log(event.key)
});

console.log("JS is loaded")

hello = 5
class Main {
    static grid = [[0,0,0],[0,0,0],[0,0,0]]
    static playerPieces = [" ", "X", "O"];
    static player = 1;
    static playerCt = 2;
    static rowRequire = 3;
    static turnCount = 0;
    static placePiece(x,y) {
        if (this.GetPiece(x,y) !== 0) console.log("Board already has a piece there");
        //Place piece
        this.GetPiece(x,y) = this.player;
        //Turn
        if(this.player == this.playerCt) this.player = 1;
        else this.player++;
        console.log(this.grid)
    };
    static GetPiece(x,y) { return this.grid[x][y]}
    static CheckWinCondition(x,y)
    {
        let xCheck = x;
        let yCheck = y;
        let playerNum = this.GetPiece(x,y)
        //Check only squares
        let fill = [1,1,1]
        let increments = [[0,1],[1,1],[1,0]]
        for (let direction = 0; direction < 3; direction++) {
            while(true)
            {
                xCheck += increments[direction][1];
                yCheck += increments[direction][0];
                //Is the check NOT in range of the board dimensions?
                if( !(inRange(-1,xCheck,3) & inRange(-1,yCheck,3)) ) break;
                
            }
            
        }
        
        
    }
    //If i feel like it later
    //Expandable
    //
}

function inRange(lower,value,higher) { return (lower < value) & (value < higher) }
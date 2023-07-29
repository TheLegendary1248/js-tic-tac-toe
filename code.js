console.log(window)

document.addEventListener("keydown", function onEvent(event) {
    event = event || window.event;

    console.log(event.key)
});

console.log("JS is loaded")

hello = 5
class Main {
    static grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],]
    static playerPieces = [" ", "X", "O"];
    static player = 1;
    static playerCt = 2;
    static rowRequire = 3;
    static turnCount = 0;
    static placePiece(x,y) {
        if (this.GetPiece(x,y) !== 0) console.log("Board already has a piece there");
        //Place piece
        this.SetPiece(x,y,this.player)
        //Turn
        if(this.player == this.playerCt) this.player = 1;
        else this.player++;
        this.CheckWinCondition(x,y)
        console.log(this.grid)
    };
    static GetPiece(x,y) { return this.grid[x][y]}
    static SetPiece(x,y,num) {this.grid[x][y] = num;}
    static CheckWinCondition(x,y)
    {
        
        let playerNum = this.GetPiece(x,y)
        let fill = [1,1,1,1]
        let increments = [[0,1],[1,1],[1,0],[1,-1]]
        for (let direction = 0; direction < 4; direction++) {
            //Used to flip increment direction of check
            let flip = false
            for( let i = 0; i < 2; i++) {
                console.log("Checking directions")
                //console.log(`flip is ${flip}`)
                let xCheck = x;
                let yCheck = y;
                while(true)
                {
                    let flipNum = (flip ? 1 : -1)
                    xCheck += increments[direction][1] * flipNum;
                    yCheck += increments[direction][0] * flipNum;
                    console.log(`Checking ${xCheck}, ${yCheck}`)
                    //Is this cell NOT in range of the board dimensions?
                    if( !(inRange(-1,xCheck,4) & inRange(-1,yCheck,4)) ) {console.log("Out of range"); break;}
                    //Is this cell NOT the same piece
                    if( this.GetPiece(xCheck, yCheck) !== playerNum) {console.log("Not same piece"); break;}
                    fill[direction]++;
                }
                flip = true
            }
        }
        console.log(fill)
        return []
    }
    //If i feel like it later
    //Expandable
    //
}

function inRange(lower,value,higher) { return (lower < value) & (value < higher) }
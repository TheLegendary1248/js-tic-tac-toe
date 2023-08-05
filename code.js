document.addEventListener("keydown", function onEvent(event) {
    event = event || window.event;

    console.log(event.key)
});

let wscreen = document.getElementById("win-screen")
let grid = document.getElementById("grid")
let playerPieces = [" ", "X", "O"];
let selectables = "■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿"
//The containing class for a game
class Game {
    grid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    width = 3;
    height = 3;
    player = 1;
    playerCt = 2;
    pieces = [" ", "X", "O"];
    rowRequire = 3;
    
    turnCount = 0;
    PlacePiece(x,y) {
        if (this.GetPiece(x,y) !== 0) throw new Error("Board already has a piece there");
        //Place piece
        this.SetPiece(x,y,this.player)
        //Turn
        if(this.player == this.playerCt) this.player = 1;
        else this.player++;
        let rows = this.CheckForContinousRows(x,y)
        for (let i = 0; i < rows.length; i++) {
            if(rows[i] >= this.rowRequire) {wscreen.style.display = "block"; grid.classList.add("disable")}
        }
        return { piece: this.pieces[this.player] }
    };

    GetPiece(x,y) { return this.grid[x][y]}
    SetPiece(x,y,num) {this.grid[x][y] = num;}
    //Checks for rows in all directions
    CheckForContinousRows(x,y)
    {
        let playerNum = this.GetPiece(x,y)
        if(playerNum == 0) throw new Error("This is not a player piece")
        let fill = [1,1,1,1]
        //Four cardinal directions as increments
        let increments = [[0,1],[1,1],[1,0],[1,-1]]
        for (let direction = 0; direction < 4; direction++) {
            //Used to flip increment direction of checks, giving us all 4 directions
            let flip = false
            for( let i = 0; i < 2; i++) {
                //console.log("Checking directions")
                //console.log(`flip is ${flip}`)
                let xCheck = x;
                let yCheck = y;
                while(true)
                {
                    let flipNum = (flip ? 1 : -1)
                    //Move checks in direction
                    xCheck += increments[direction][1] * flipNum;
                    yCheck += increments[direction][0] * flipNum;
                    /*console.log(`Checking ${xCheck}, ${yCheck}`)*/
                    //Is this cell NOT in range of the board dimensions?
                    if( !(inRange(-1,xCheck,this.width + 1) & inRange(-1,yCheck, this.height + 1)) ) {/*console.log("Out of range");*/ break;}
                    //Is this cell NOT the same piece
                    if( this.GetPiece(xCheck, yCheck) !== playerNum) {/*console.log("Not same piece");*/ break;}
                    fill[direction]++;
                }
                flip = true
            }
        }
        return fill
    }
    //If i feel like it later
    //Expandable
    //function to expand grid dimension on one side
    //function to slide row or column
}

function inRange(lower,value,higher) { return (lower < value) & (value < higher) }
let gridElement = document.getElementById("grid");
let cellTemplate = document.getElementById("cellTemp")
//Creates cells
for (let xCell = 0; xCell < 3; xCell++) {
    for (let yCell = 0; yCell < 3; yCell++) {
        /** @type {HTMLElement} */
        let clone = cellTemplate.content.firstElementChild.cloneNode(true)
        clone.onclick = (e) => TileClick(e, {x: xCell, y: yCell})
        clone.style.setProperty('--x', xCell)
        clone.style.setProperty('--y', yCell)
        gridElement.appendChild(clone)
    }
}
/** 
* @param {MouseEvent} event 
*/
function TileClick(event, coord) {

    console.log(coord, event)
    /** @type {HTMLDivElement}*/
    let eventTarget = event.target
    eventTarget.textContent = mainGame.PlacePiece(coord.x, coord.y).piece
    eventTarget.blur()
    eventTarget.classList.add("filled")
}
let mainGame = new Game()
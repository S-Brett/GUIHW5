
console.log("Hello, World!");

// JSON from the given file
let TILE_JSON = {"pieces": [
	{"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":5},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1}
],
"creator":"Ramon Meza"
}

let TILE_PATH = "assets/tiles/";
let TILE_JPG = {
	"A": "Scrabble_Tile_A.jpg",
	"B": "Scrabble_Tile_B.jpg",
	"C": "Scrabble_Tile_C.jpg",
	"D": "Scrabble_Tile_D.jpg",
	"E": "Scrabble_Tile_E.jpg",
	"F": "Scrabble_Tile_F.jpg",
	"G": "Scrabble_Tile_G.jpg",
	"H": "Scrabble_Tile_H.jpg",
	"I": "Scrabble_Tile_I.jpg",
	"J": "Scrabble_Tile_J.jpg",
	"K": "Scrabble_Tile_K.jpg",
	"L": "Scrabble_Tile_L.jpg",
	"M": "Scrabble_Tile_M.jpg",
	"N": "Scrabble_Tile_N.jpg",
	"O": "Scrabble_Tile_O.jpg",
	"P": "Scrabble_Tile_P.jpg",
	"Q": "Scrabble_Tile_Q.jpg",
	"R": "Scrabble_Tile_R.jpg",
	"S": "Scrabble_Tile_S.jpg",
	"T": "Scrabble_Tile_T.jpg",
	"U": "Scrabble_Tile_U.jpg",
	"V": "Scrabble_Tile_V.jpg",
	"W": "Scrabble_Tile_W.jpg",
	"X": "Scrabble_Tile_X.jpg",
	"Y": "Scrabble_Tile_Y.jpg",
	"Z": "Scrabble_Tile_Z.jpg"
}

let LETTER_SCORES = {
	"A": 1,
	"B": 3,
	"C": 3,
	"D": 2,
	"E": 1,
	"F": 4,
	"G": 2,
	"H": 4,
	"I": 1,
	"J": 8,
	"K": 5,
	"L": 1,
	"M": 3,
	"N": 1,
	"O": 1,
	"P": 3,
	"Q": 10,
	"R": 1,
	"S": 1,
	"T": 1,
	"U": 1,
	"V": 4,
	"W": 4,
	"X": 8,
	"Y": 4,
	"Z": 10
}

let CURRENT_WORD = ['-','-','-','-','-','-','-','-'];
let CURRENT_SCORE = 0;

// true == word is broken
// false == word is complete (no spaces between)
function brokenWord(letterArray){
	let word = letterArray.toString()
				.replace(/,/g, '')
				.replace(/-/g, ' ')
				.trim()
				.includes(' ');
	console.log("EH?: " + word);
	return word;
}

// NOTE: This function was taken from Andy E
// on stack overflow: 
// https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    return a.join("");
}
// -----------------------------------------------------------------------

function genGameBag(){
	let gameBag = "ASDFASDF";
	return gameBag.shuffle();

	TILE_JSON['pieces'].forEach(function(row){
		for(let i=0; i<row['amount']; i++){
			gameBag += row['letter'];
		}
	});

	return gameBag.shuffle();
}

// console.log(genGameBag());

function getPos(_elem){
	// console.log(_elem);
	let bounds = _elem.getBoundingClientRect();
	let centerX = (bounds.top + bounds.bottom) / 2;
	let centerY = (bounds.left + bounds.right) / 2;
	// console.log(centerX +" "+ centerY);
	return new Vec2(centerX, centerY);
}

function snapToSlot(_slotList, _tile){
	let tilePos = getPos(_tile);
	for(let i=0; i<_slotList.length; i++){
		let slotPos = getPos(_slotList[i]);

		let a = Math.abs(tilePos.x - slotPos.x);
		let b = Math.abs(tilePos.y - slotPos.y);
		let c = Math.sqrt(a*a + b*b);

		if(c < 50){
			// console.log(_slotList[i]);
			console.log(c);
			console.log("true");
		}
	}

	return false;
}

function genSlot(_doubleScore=false){
	// let elem = document.createElement('p');
	// elem.appendChild(document.createTextNode());
	// elem.classList.add('class');
	let slotContainer = document.createElement('div');
	slotContainer.classList.add('slot');
	slotContainer.classList.add('droppable');
	// slotContainer.classList.add('ui-widget-content');
	if(_doubleScore){
		slotContainer.classList.add("double-word-score");
		// slotContainer.classList.add('double-word-score');
		// slotContainer.appendChild(document.createTextNode("double word score"));
		slotContainer.innerHTML = "<p>double word score </p>";	
	} 

	slotContainer['00000'] = true;
	// console.log(slotContainer);
	return slotContainer;

}

function genTile(_letter='A'){

	let newTile = document.createElement('img');
	newTile.src = TILE_PATH + TILE_JPG[_letter];
	newTile.classList.add('draggable');
	newTile.classList.add('tile');

	newTile['letter'] = _letter;
	newTile['score'] = LETTER_SCORES[_letter];

	$('#playing-rack').append(newTile);

	$(".draggable").draggable({
        revert: "invalid",
        stop: function () {
            $(this).draggable('option', 'revert', 'invalid');
        }
    });

    $(".draggable").droppable({
        greedy: true,
        tolerance: 'touch',
        drop: function (event, ui) {
        	console.log("WQRWERF")
        	console.log($(this));
			console.log(ui);
            ui.draggable.draggable('option', 'revert', true);
        }
    });

    $(".droppable").droppable({
    	out: function (event, ui) { moveTile($(this), ui) },
        drop: function (event, ui) { dropTile($(this), ui) }
    });

    newTile.id = TILE_ID;
    TILE_ID += 1;
	return newTile;


}


let MOVED_OUT = false;
function moveTile(_droppable, _draggable){

	if(MOVED_OUT){return;} 
	MOVED_OUT = true;

	console.log('is being moved');

	let letter = _draggable.draggable[0]['letter'];
	let score = _draggable.draggable[0]['score'];
	let id = _draggable.draggable[0].id;

	// console.log(id);
	// console.log(_droppable[0].className);
	// console.log();

	let dropClasses = _droppable[0].className
	if(dropClasses.includes('rack')){
		console.log("taken off the rack")
	} else {
		let tileNum = parseInt(dropClasses.replace( /^\D+/g, ''));
		CURRENT_WORD[tileNum] = '-';
		if(dropClasses.includes('double-word-score')){
			CURRENT_SCORE -= score*2;
		} else {
			CURRENT_SCORE -= score;
		}
		
		let index = TILES_IN_PLAY.indexOf(id);
		if (TILES_IN_PLAY.indexOf(id) > -1) { TILES_IN_PLAY.splice(index, 1); }

		let outWord = CURRENT_WORD.toString().replace(/,/g, '');
		$("#info #score #output").html(CURRENT_SCORE);
		$("#info #word #output").html(outWord);

		if(brokenWord(CURRENT_WORD) == true){
			$("#info #score #output").html("XX");
			$("#info #word #output").html("~~THERE ARE SPACES BETWEEN LETTERS~~");
		}

	}

}

function dropTile(_droppable, _draggable){

	MOVED_OUT = false;
	// let CURRENT_WORD = "        ";
	// let CURRENT_SCORE = 0;

	// console.log(_droppable);
	// console.log(_draggable);

	let letter = _draggable.draggable[0]['letter'];
	let score = _draggable.draggable[0]['score'];
	let id = _draggable.draggable[0].id;

	// console.log(id);

	// console.log(_droppable[0].className);
	// console.log();

	let dropClasses = _droppable[0].className
	if(dropClasses.includes('rack')){
		console.log("went on the rack")
	} else {
		let tileNum = parseInt(dropClasses.replace( /^\D+/g, ''));
		CURRENT_WORD[tileNum] = letter;
		if(dropClasses.includes('double-word-score')){
			CURRENT_SCORE += score*2;
		} else {
			CURRENT_SCORE += score;
		}
		
		if(TILES_IN_PLAY.indexOf(id) < 0){ TILES_IN_PLAY.push(id) };
		let outWord = CURRENT_WORD.toString().replace(/,/g, '');
		$("#info #score #output").html(CURRENT_SCORE);
		$("#info #word #output").html(outWord);

		if(brokenWord(CURRENT_WORD) == true){
			$("#info #score #output").html("XX");
			$("#info #word #output").html("~~THERE ARE SPACES BETWEEN LETTERS~~");
		}
	}

}

let TILES_IN_PLAY = [];
let TILE_ID = 0;
function tallyTiles(){
	console.log('pressed');

	console.log(TILES_IN_PLAY);
	let removed = 0;
	for(let i=0; i<TILES_IN_PLAY.length; i++){
		$('#playing-rack').children('#'+TILES_IN_PLAY[i]).remove();
		removed++;
	}
	console.log(removed);

	CURRENT_WORD = ['-','-','-','-','-','-','-','-'];
	TILES_IN_PLAY = [];
	$("#info #score #output").html(CURRENT_SCORE);
	$("#info #word #output").html(CURRENT_WORD);

    for(let i=0; i<removed; i++){
    	if(gamebag.length < 1){
    		
    		return;
    	}
    	genTile(gamebag[0]);
    	gamebag = gamebag.slice(1, gamebag.length);
    	// console.log(gamebag)
    }

    if(gamebag.length < 1 && $('.tile').length == 0){
    	alert("game over!");
    }
    console.log(gamebag);
}

let gamebag = genGameBag()
$(document).ready(function(){

	let slots = document.createElement('div');
	slots.id = "slots";

	for(let i=0; i<8; i++){
		let double = (i==2 || i==5) ? true : false;
		slot = genSlot(double)
		slot.classList.add('slot-'+i);
		slots.append(slot);
	}

	$("#playing-board").html( slots );

	$(".draggable").draggable({
        revert: "invalid",
        stop: function () {
            $(this).draggable('option', 'revert', 'invalid');
        }
    });

    $(".draggable").droppable({
        greedy: true,
        tolerance: 'touch',
        drop: function (event, ui) {
            ui.draggable.draggable('option', 'revert', true);

			
        }
    });

    $(".droppable").droppable({
		out: function (event, ui) { moveTile($(this), ui) },
		drop: function (event, ui) { dropTile($(this), ui) }
    });

    
    for(let i=0; i<7; i++){
    	genTile(gamebag[0]);
    	gamebag = gamebag.slice(1, gamebag.length);
    	// console.log(gamebag)
    }

    let outWord = CURRENT_WORD.toString().replace(/,/g, '');
    $("#info #score #output").html(CURRENT_SCORE);
	$("#info #word #output").html(outWord);

});


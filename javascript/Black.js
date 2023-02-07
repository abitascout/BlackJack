//Classes that I need
//Constructors for deck

// Card constructor 
class Card {
    constructor(value, suit) {
        this.suit = suit;
        this.value = value;
    }

    set setValue(v){
        this.value = v;

    }
    get getValue()
    {
        return this.value;
    }
    set setSuit(s)
    {
        this.suit = s;
    }
    
    get getSuit(){
        return this.suit;
    }

    get gettingCard(){
        return this.getSuit, this.getValue;
    }
    get string(){
        return this.stringing();
    }
    //tostring fucntion for card
    stringing(){
        if(this.value == 0)
            return "Card not Found";
        let s = "";
        switch(this.value){
            case 1: s+= "Ace"; break;
            case 11: s+= "Jack";break;
            case 12: s+= "Queen";break;
            case 13: s+= "King";break;
            default: s+= this.value;break;
        }
         s = s.concat(" of ")
        switch(this.suit)
        {
            case 1: s = s.concat("Clubs"); break;
            case 2: s = s.concat("Spades"); break;
            case 3: s = s.concat("Hearts"); break;
            case 4: s = s.concat("Diamonds");break;
        }
        return s;
    }

    
}



//creates the deck
class deck {
    constructor() {
        this.deck = new Array(52);
        this.count = 52;
        var temp = 0;
        for (let i = 1; i <= 4; i++)
            for (let v = 1; v <= 13; v++)
			{
                this.deck[temp] = new Card(v, i);
				temp++;
			}
    }

    get shuffle(){
        return this.Shuffling();
    }

    get card()
        {
            return this.getCard();
        }
    

    Shuffling()
    {
        for(var i = 51; i> 0; i--){
            var replace = Math.floor((i+1)*Math.random(i));
            var temp = this.deck[replace];
            this.deck[replace] = this.deck[i];
            this.deck[i] = temp;
        }
        this.count = 52;
        return this.deck;
    }

    
    getCard()
        {
            if(this.count == 0)
                return("Deck is out of Cards");
            else{
                console.log(this.deck[51]);
                return this.deck[--this.count];
            }
        }
}


// intializes all the varibles I need
var dealerCards = [];
var playerCards = [];
var playerCount = 0;
var dealerCount = 0;


let Deck = new deck();

let gameprogress = false;

let betInput = document.getElementById("bet");
let bet;
var moneyData = Number(localStorage.getItem("fromLocal"));

let d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");
var d5 = document.getElementById("d5");

var u1 = document.getElementById("u1");
var u2 = document.getElementById("u2");
var u3 = document.getElementById("u3");
var u4 = document.getElementById("u4");
var u5 = document.getElementById("u5");

var dealerSide = [d1,d2,d3,d4,d5];
var playerSide = [u1,u2,u3,u4,u5];

var standBtn = document.getElementById("stand");
var hitBtn = document.getElementById("hit");
var newGameBtn = document.getElementById("new_game");
var money =document.getElementById("uMoney");
var message = document.getElementById("message");
money.innerHTML = moneyData;



function startup(){
    //used the following site to disable buttons so they can not be pushed
    //https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
    betInput.disabled = false;
    standBtn.disabled = true;
    hitBtn.disabled = true;
    newGameBtn.disabled = false;
}


// deals out cards in the game
function cardDeal(cardArray, sideArray, count, upOrdown, Deck)
{
    var temp = new Card();
    var temp = Deck.card;
    if(upOrdown){
        sideArray[count].innerHTML = "<img src ='./Images/PNG-cards-1.3/back.png'></>"
        
    }
    else{
        var v = temp.string;
        tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
        tempcode = "<img src ='".concat(tempstring).concat("'></>");
        sideArray[count].innerHTML = tempcode;
    }
    cardArray[count] = temp;


}

// gets the total value of cards in the hand
function totalNum(hand, count)
{
    var total = 0;
    var ace = false;
    var ace_count = 0;
    for (var i=0; i<count; i++)
    {
        if(hand[i].value == 11|| hand[i].value == 12||hand[i].value == 13)
            total += 10;
        else
        {
            total += Math.min(10, hand[i].value);
            if(hand[i].getValue == 1){
                ace = true;
                ace_count++;
            }
        }
    }
    if ((total + 10 <= 21) && ace && ace_count < 3)
      total += 10;
   return total;
}

// calculates the result after the player is dealt or hits
function calculating()
{
    standBtn.disabled = false;
    hitBtn.disabled = false;
    newGameBtn.disabled = true;
    gameprogress = true;
    var dealTotal = totalNum(dealerCards, dealerCount);
    var playTotal = totalNum(playerCards, playerCount);
    if(dealTotal == 21)
    {
        if (playTotal == 21)
        {
			var v = dealerCards[1].string;
			tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
			tempcode = "<img src ='".concat(tempstring).concat("'></>");
			dealerSide[1].innerHTML = tempcode;
            GameOver(false, "You both have Blackjack, but dealer wins on ties.");
        }
        else
        {
			var v = dealerCards[1].string;
			tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
			tempcode = "<img src ='".concat(tempstring).concat("'></>");
			dealerSide[1].innerHTML = tempcode;
            GameOver(false, "Dealer has Blackjack.");
        }
        
    }
    else if (playTotal == 21){
		var v = dealerCards[1].string;
		tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
		tempcode = "<img src ='".concat(tempstring).concat("'></>");
		dealerSide[1].innerHTML = tempcode;
        GameOver(true, "You have Blackjack.");
	}
    else
        message.innerHTML = "You have " + playTotal +".  Hit or Stand?";

}

//Starts up the game
function startGame(){
    if(!gameprogress)
        return;
    
    if(betInput.value > 0 && Number(betInput.value) <= moneyData && moneyData > 0)
    {
        betInput.disabled = true;
        bet = Number(betInput.value);
    }
    else
    {
        message.innerHTML = "Invalid Bet";
        return;
    }

    for(i = 0; i <5; i++ )
    {
        dealerSide[i].innerHTML=" ";
        playerSide[i].innerHTML=" ";


    }
    Deck.shuffle;
    playerCount = 0;
    dealerCount = 0;
    cardDeal(playerCards, playerSide, playerCount, false, Deck);
    playerCount++;
    cardDeal(dealerCards, dealerSide, dealerCount, false, Deck);
    dealerCount++;
    cardDeal(playerCards, playerSide, playerCount, false, Deck);
    playerCount++;
    cardDeal(dealerCards, dealerSide, dealerCount, true, Deck);
    dealerCount++;
    calculating();

}


// when the player wins or loses this displays the outcome
function GameOver(switchy, string){
    if(switchy)
	{
        moneyData +=bet;
		money.innerHTML = "";
		money.innerHTML = moneyData;
		localStorage.setItem("fromLocal", moneyData);
	}
    else{
        moneyData -=bet;
		money.innerHTML = ""
		money.innerHTML = moneyData;
		localStorage.setItem("fromLocal", moneyData);
	}
    standBtn.disabled = true;
    hitBtn.disabled = true;
    newGameBtn.disabled = false;
	betInput.disabled = false;
    message.innerHTML = string;
    gameprogress = false;
    if(money <=0 )
        message.innerHTML = "busted";
    else{
        
        standBtn.disabled = true;
        hitBtn.disabled = true;
        newGameBtn.disabled = false;
        betInput.disabled = false;
        playerCards = [];
        dealerCards = [];
        dealerCount = 0;
        playerCount = 0;
        
    }
}

// checks to see if the dealer is can hit or has to stay
function dealerCheck()
{
    var dealerTotal = totalNum(dealerCards, dealerCount);
    if(dealerTotal <= 16 && dealerCount < 5)
    {
        cardDeal(dealerCards, dealerSide, dealerCount, false, Deck)
        dealerCount++;
        dealerCheck();
    }
    else if (dealerTotal > 21)
    {
        GameOver(true, "Dealer Busted.");
    }
    else if( dealerCount == 5)
    {
        GameOver(false, "Dealer got five cards he wins.")
    }
    else{
        var playTotal = totalNum(playerCards, playerCount);
        if (playTotal > dealerTotal)
        {
            var v = dealerCards[1].string;
			tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
			tempcode = "<img src ='".concat(tempstring).concat("'></>");
			dealerSide[1].innerHTML = tempcode;
            GameOver(true, "You have "+playTotal +". Dealer has "+dealerTotal + ".")
        }
        else if(dealerTotal > playTotal)
        {
            var v = dealerCards[1].string;
			tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
			tempcode = "<img src ='".concat(tempstring).concat("'></>");
			dealerSide[1].innerHTML = tempcode;
            GameOver(false, "You have "+playTotal +". Dealer has "+dealerTotal + ".")
        }
        else
        {
            var v = dealerCards[1].string;
			tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
			tempcode = "<img src ='".concat(tempstring).concat("'></>");
			dealerSide[1].innerHTML = tempcode;
            GameOver(false, "You both have tied at "+playTotal +" but tie goes to the dealer.")
        }

    }
}
// checks to make sure that the player didnt bust
function checking()
{
    var playTotal = totalNum(playerCards, playerCount);
    if(playTotal > 21)
    {
        GameOver(false, "You went over 21.");
    }
    else if(playerCards.count == 5 && playerTotal < 21)
    {
        GameOver(true, "You got to 5 cards without busting.");
    }
    else if (playTotal == 21)
    {
        var v = dealerCards[1].string;
        tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
        tempcode = "<img src ='".concat(tempstring).concat("'></>");
        dealerSide[1].innerHTML = tempcode;
        dealerCheck();
    }
    else{
        message.innerHTML = "You have "+ playTotal + ". Wanna Hit or Stand?";
        hitBtn.disabled = false;
        standBtn.disabled = false;
    }
}

//the hit function for when the player takes a hit
function hit(){
    if(!gameprogress)
        return;
    standBtn.disabled = true;
    hitBtn.disabled = true;
    cardDeal(playerCards,playerSide, playerCount, false, Deck)
    playerCount++;
    checking();

}

// the stand function for when the player stands
function stand()
{
    if(!gameprogress)
        return;
    hitBtn.disabled = true;
    standBtn.disabled = true;
    var v = dealerCards[1].string;
    tempstring = "./Images/PNG-cards-1.3/".concat(v.concat(".png"));
    tempcode = "<img src ='".concat(tempstring).concat("'></>");
    dealerSide[1].innerHTML = tempcode;
    dealerCheck();
}


//new game button listener
newGameBtn.addEventListener("click", function(){
    gameprogress = true;
    startGame();
})

// hit button listner
hitBtn.addEventListener("click", hit)

// stand button list
standBtn.addEventListener("click", stand)



// found out how to do this here
//https://www.w3schools.com/tags/ev_onload.asp#:~:text=The%20onload%20attribute%20fires%20when,Supported%20HTML%20tags%22%20below).
//this is used to disable buttons so the user can't hit or stand before the game starts
window.onload = startup();
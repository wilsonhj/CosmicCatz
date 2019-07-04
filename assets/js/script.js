$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null; 
var matches = null;

function initializeApp() {
    $('.card-container').click(handleCardClick);
}

function handleCardClick(event){
    console.log(event);
    // $(event.currentTarget).hide();
    $(event.currentTarget).find(".lfz-card").addClass("hidden");
    debugger;
    if(firstCardClicked === null){
        firstCardClicked = $(event.currentTarget);
        return;
        
    }
    secondCardClicked = $(event.currentTarget);
    var secondCardSource = secondCardClicked.find(".match-card").css("background-image");
    var firstCardSource = firstCardClicked.find(".match-card").css("background-image");
    if (firstCardSource === secondCardSource) {
        console.log("cards match");
        matches += 1;
    }
    else {
        setTimeout(() => {
            firstCardClicked.find(".lfz-card").removeClass("hidden");
            secondCardClicked.find(".lfz-card").removeClass("hidden");
            firstCardClicked = null;
            secondCardClicked = null;
        }, 1500);
    }
    
}
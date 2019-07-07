$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null; 
var matches = null;

function initializeApp() {
    // $('.card-container').click(handleCardClick);
    // $('.lfz-card').on('click', handleCardClick);
    $('.card-container').on('click', handleCardClick);
}

function handleCardClick(event){
    console.log(event);
    $(event.currentTarget).find(".lfz-card").addClass("hidden");
    if(firstCardClicked === null){
        firstCardClicked = $(event.currentTarget);
        return;
        
    }
    secondCardClicked = $(event.currentTarget);
    $('.card-container').off('click', handleCardClick); // toggle off click
    var secondCardSource = secondCardClicked.find(".match-card").css("background-image");
    var firstCardSource = firstCardClicked.find(".match-card").css("background-image");
    if (firstCardSource === secondCardSource) {
        console.log("cards match");
        matches += 1;
        // hides elements if matched
        
        // firstCardClicked.addClass("hidden"); 
        // secondCardClicked.addClass("hidden");
        firstCardClicked.hide(3000);
        secondCardClicked.hide(3000);
        // resets cards to null
        firstCardClicked = null;
        secondCardClicked = null;
        
        
        $('.card-container').on('click', handleCardClick);
    }
    else {
        setTimeout(() => {
            firstCardClicked.find(".lfz-card").removeClass("hidden");
            secondCardClicked.find(".lfz-card").removeClass("hidden");
            firstCardClicked = null;
            secondCardClicked = null;
            $('.card-container').on('click', handleCardClick);
        }, 1500);
        
    }
    
}
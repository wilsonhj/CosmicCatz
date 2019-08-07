$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null; 
var matches = 0;
//stats
var attempts = 0;
var games_played = 0;
const max_matches = 9;


function initializeApp() {
    dynamicDOM();
    $('.card-container').on('click', handleCardClick);
}

function handleCardClick(event){
    console.log(event);
    if($(event.currentTarget).hasClass('revealed')){
    
        return;
    }
    // $(event.currentTarget).find(".lfz-card").addClass("hidden");
    $(event.currentTarget).addClass('revealed').find(".lfz-card").fadeOut(500);
    if(firstCardClicked === null){
        firstCardClicked = $(event.currentTarget);
        return;
    }

    secondCardClicked = $(event.currentTarget);
    $('.card-container').off('click', handleCardClick); // toggle off click

    var secondCardSource = secondCardClicked.find(".match-card").css("background-image");
    var firstCardSource = firstCardClicked.find(".match-card").css("background-image");

    attempts += 1; // increment attempted matches 
    
    if (firstCardSource === secondCardSource) {
        matchedCards();
        winCondition();
    }
    else {
        notMatched();
    }
}

function matchedCards(){
    console.log("cards match");
    matches += 1; // successful match
    displayStats();
    // firstCardClicked.hide(3000);
    // secondCardClicked.hide(3000);
    
    firstCardClicked = null; // resets cards to null
    secondCardClicked = null;

    $('.card-container').on('click', handleCardClick);
}

function notMatched(){
    var availableSounds = [
        'http://cd.textfiles.com/mmplatinum/SOUNDS/WAV/MOREWAV2/MEOW.WAV',
        'http://www.agt.net/public/pawspub/sound_and_pics/meow2.wav',
        'http://marge.com/journal/sounds/catmeow.wav',
        'assets/Audio_Catz/TomCat_AudioTail.mp3',
        'assets/Audio_Catz/Alpaca_MatingCall.mp3'
    ]

    firstCardClicked.addClass('wrong');
    secondCardClicked.addClass('wrong');
    var thisSound = availableSounds[ (Math.random() * availableSounds.length)>>0];
    var player = new Audio(thisSound);
    player.play();
    setTimeout(() => {
        displayStats();

        // firstCardClicked.find(".lfz-card").removeClass("hidden");
        // secondCardClicked.find(".lfz-card").removeClass("hidden");
        firstCardClicked.find(".lfz-card").fadeIn(500);
        secondCardClicked.find(".lfz-card").fadeIn(500);
        firstCardClicked = null;
        secondCardClicked = null;
        $('.card-container').on('click', handleCardClick);
        $('.wrong').removeClass('wrong');
        $('.revealed').removeClass('revealed');
    }, 1500);
}

function calculateAccuracy(){
    if(matches === 0 || attempts === 0){ //prevent division by zero
        return 0;
    }
    console.log(attempts, "attempts  ", matches, "matches ");
    return (100 * matches/attempts).toFixed(2) + '%';
}

function displayStats(){
    const accuracy = calculateAccuracy(); // necessary?
    $('#games-played-display').text(games_played);
    $('#accuracy-display').text(accuracy);
    $('#attempts-display').text(attempts);
}

function winCondition(){
    if(matches === max_matches){
        games_played += 1;
        modal();

    }
}
function resetStats(){
    attempts = 0;
    matches = 0;
    displayStats();
    $('.lfz-card').show(2000, function(){
        $('.game-area').empty();
        initializeApp();
    });

}

function modal(){
    const modalShadow = $('.modal-shadow').removeClass('hidden');
    // setInterval(function(){
    //     $('#modal-text').css('color',`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`)
    // }, 2000);
    $('#reset-Btn').on('click', function(){
        modalShadow.addClass('hidden');
        resetStats();
    })
}

function shuffle(array){ //Fisher-Yates shuffle https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#Fisher_and_Yates'_original_method
    for(let i = array.length-1; i >= 0; i--){
        let j = Math.floor(Math.random() * (i+1));
        // console.log(array[i], array[j], i, j);
        [array[i], array[j]] = [array[j], array[i]];
    }
}



function dynamicDOM(){
    let cssClasses = ['spacecat1', 'spacecat2', 'spacecat3', 'spacecat4',
    'spacecat5','spacecat6', 'spacecat7', 'spacecat8', 'spacecat9'];
  
    let cardClasses = [...cssClasses, ...cssClasses];
    shuffle(cardClasses);   
    //generate cards
    for(let c of cardClasses){
        let cardContainer = $('<div>').addClass('card-container');
        let lfzCard = $('<div>').addClass('lfz-card');
        let matchCard = $('<div>').addClass(`match-card ${c}`);  
        var card = cardContainer.append(lfzCard, matchCard);
        $('.game-area').append(card);
        console.log(card);
    }  
}


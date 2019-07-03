$(document).ready(initializeApp);


function initializeApp() {
    $('.lfz-card').click(handleCardClick);

}

function handleCardClick(event){
    console.log(event);
    // $(event.currentTarget).hide();
    $(event.currentTarget).addClass("hidden");

}
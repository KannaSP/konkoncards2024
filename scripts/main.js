import { wallet_open, wallet_close, wallet_open_coin, wallet_close_coin, 
coin_init, coin_enters_target, coin_hovering, coin_drop, coin_position_readjust, coin_leaves_target } 
from "./animations.js";

window.wallet_open = wallet_open;
window.wallet_close = wallet_close;
window.wallet_open_coin = wallet_open_coin;
window.wallet_close_coin = wallet_close_coin;

window.coin_init = coin_init;
window.coin_enters_target = coin_enters_target;
window.coin_hovering = coin_hovering;
window.coin_drop = coin_drop;
window.coin_position_readjust = coin_position_readjust;
window.coin_leaves_target = coin_leaves_target;


function start_game(){
    form_object = document.forms.user_number;
    if(form_object.elements.username.value == "") {
        show_error_dialog("Please insert a username to start the game!");
        return 1;
    }
    if(form_object.elements.last_pull_number.value <= 0) {
        show_error_dialog("Last pull number must be larger than 0!");
        return 2;
    }
    
    document.getElementById('entry_form').classList.add('form_transition');
    const game_section = document.getElementById('game_section');
    game_section.classList.remove('opacity_hidden');
    game_section.classList.add('fade_in_machine_2s');
}

function show_error_dialog(error_msg){
    document.getElementById('error_dialog_popup').classList.remove('error_dialog_hidden');
    document.getElementById('error_dialog_popup').classList.add('error_dialog_show');
    document.getElementById('error_dialog_text').innerHTML = error_msg;
}

function hide_error_dialog(){
    document.getElementById('error_dialog_popup').classList.remove('error_dialog_show');
    document.getElementById('error_dialog_popup').classList.add('error_dialog_hidden');
    document.getElementById('error_dialog_text').innerHTML = 
        ' Sorry, an error occurred! Please notify the administrator for assistance. ';
}

window.start_game = start_game;
window.show_error_dialog = show_error_dialog;
window.hide_error_dialog = hide_error_dialog;
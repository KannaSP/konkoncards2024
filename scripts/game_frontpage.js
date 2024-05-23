function start_game(){
    /* This function is temporarily unused */
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
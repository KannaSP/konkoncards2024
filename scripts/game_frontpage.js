var current_tutorial_page = 1;
var tutorial_image = null;

/* Welcome screen function */
function reveal_game_section(){
    console.log ("Revealing Game Section");
    var welcome_video = document.getElementById("welcome_video");
    welcome_video.classList.add("z_m1");
    welcome_video.classList.add("opacity_0");
    var game_section = document.getElementById("game_section");
    game_section.classList.remove("opacity_0");
    var tutorial_section_container = document.getElementById("tutorial_section_container");
    tutorial_section_container.classList.remove("z_m1");
    tutorial_section_container.classList.remove("opacity_0");
    tutorial_image = document.getElementById("tutorial_image");
    tutorial_image.src = "assets/tutorial/"+current_tutorial_page+".webp";
}

function advance_tutorial(){
    console.log ("Next Tutorial Section");
    if(current_tutorial_page++ >= 6) close_tutorial();
    tutorial_image.src = "assets/tutorial/"+current_tutorial_page+".webp";
}

function close_tutorial(){
    console.log ("Closing Tutorial Section");
    var tutorial_section_container = document.getElementById("tutorial_section_container");
    tutorial_section_container.classList.add("z_m1");
    tutorial_section_container.classList.add("opacity_0");
    current_tutorial_page = 0;
}

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
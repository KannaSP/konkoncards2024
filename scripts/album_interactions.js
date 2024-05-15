var current_last_display_number = 0;
const card_array = [
  { "artist" : "Kinoko", "front_art" : "Kinoko_CardArt.png", "back_art" : "Kinoko_CardBack.png", "orientation": "portrait" },
  { "artist" : "fluffaldog", "front_art" : "fluffaldog_thinking_of_fox.jpg", "back_art" : "nothing", "orientation": "portrait" },
  { "artist" : "moh", "front_art" : "2024-moh-CardCharacter.png", "back_art" : "2024-moh-CardLetter.png", "orientation": "portrait" },
  { "artist" : "mofumofu", "front_art" : "Mohumohu_Image.png", "back_art" : "Mohumohu_Letter.png", "orientation": "landscape" },
  { "artist" : "ikki", "front_art" : "FubuKingdom.png", "back_art" : "FubuLetter.png", "orientation": "portrait" }
];
const card_folder_url_injection = "card_images/";
const template_element_name = "card-collection-";
const cards_per_shelf = 12;
var flip_card_triggered = false;

function switch_down_page(){
    
}

function switch_up_page(){
    
}

var current_card_face = "front";
var next_card_face = "back";

function open_full_size_display() {
    if ( flip_card_triggered == true ) {
        flip_card_triggered = false;
        return;
    }
    else {
        /* unhidden the display div */
        var fullscreen_display = document.getElementById("fullscreen_display");
        fullscreen_display.classList.remove("opacity_0");
        fullscreen_display.classList.remove("z_m1");
        fullscreen_display.classList.add("reveal_opacity");
        fullscreen_display.classList.add("z_100");
        var card_array_number = event.target.dataset.arrnum;
        var fullscreen_image = document.getElementById("fullscreen_image");
        fullscreen_image.src = card_folder_url_injection + card_array[card_array_number].front_art;
        fullscreen_image.style.zIndex = 200;
        
        current_card_face = fullscreen_image.src;
        next_card_face = card_folder_url_injection + card_array[card_array_number].back_art;
    }
}

function close_full_size_display() {
    /* hide the display div */
    var fullscreen_display = document.getElementById("fullscreen_display");
    fullscreen_display.classList.remove("reveal_opacity");
    fullscreen_display.classList.remove("z_100");
    fullscreen_display.classList.add("z_m1");
    var card_array_number = event.target.dataset.arrnum;
    var fullscreen_image = document.getElementById("fullscreen_image");
    fullscreen_image.src = "";
    fullscreen_image.style.zIndex = -2;
}

function flip_card(){
    event.stopPropagation();
    flip_card_triggered = true;
    document.getElementById("fullscreen_image").src = next_card_face;
    temp_card_face = current_card_face;
    current_card_face = next_card_face;
    next_card_face = temp_card_face;
}

/* Testing section before separating into module */


/* import { filenames } from '../card_images/cardlist.js';
 */
/* const card_folder_url_injection = "card_images/";
const card_array = [
  { "artist" : "Kinoko", "front_art" : "Kinoko_CardArt.png", "back_art" : "Kinoko_CardBack.png", "orientation": "portrait" },
  { "artist" : "fluffaldog", "front_art" : "fluffaldog_thinking_of_fox.jpg", "back_art" : "nothing", "orientation": "portrait" },
  { "artist" : "moh", "front_art" : "2024-moh-CardCharacter.png", "back_art" : "2024-moh-CardLetter.png", "orientation": "portrait" },
  { "artist" : "mofumofu", "front_art" : "Mohumohu_Image.png", "back_art" : "Mohumohu_Letter.png", "orientation": "landscape" },
  { "artist" : "ikki", "front_art" : "FubuKingdom.png", "back_art" : "FubuLetter.png", "orientation": "portrait" }
];
const template_element_name = "card-collection-";
const cards_per_shelf = 12; */

function initialize() {
    /* Testing Stubs */
    console.log(card_array[0].artist);
    console.log(card_array[0].front_art);
    console.log(card_array[0].back_art);
    
    var starting_number = 1;
    var element_name = template_element_name + starting_number;
    var counter = 0;
    while( counter < card_array.length )
    {
        var image_element = document.getElementById(element_name);
        image_element.dataset.arrnum = counter;
        counter++;
        element_name = template_element_name + (starting_number + counter);
    }
    current_last_display_number = starting_number + counter;
}

function populate_visible_element(shelf_number) {
    var counter = 0;
    var starting_element_number = ((shelf_number - 1) * cards_per_shelf) + 1;
    var element_name = template_element_name + starting_element_number;
    while( counter < cards_per_shelf )
    {
        /* Adding 1 because to prevent off by one error. You can guess what happened in the album.html */
        image_element = document.getElementById(element_name);
        if(card_array[starting_element_number + counter - 1] == null) break;
        if(image_element == null) break;
        image_element.src = card_folder_url_injection + card_array[starting_element_number + counter - 1].front_art;
        counter++;
        var element_name = template_element_name + (starting_element_number + counter);        
    }
    current_last_display_number = starting_element_number + counter;
}

window.addEventListener("load", (event) => {
    initialize();
    populate_visible_element(1);
});
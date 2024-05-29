import { card_list_initialization } from '../card_images/cardlist.js';

const card_folder_url_injection = "card_images/";
const template_element_name = "card-collection-";
const cards_per_shelf = 12;
var card_array = null;
var next_page_index_number = 0;
var current_shelf_number = 0;
var flip_card_triggered = false;
var reveal_all_card_flag = false;

/* Pagination Logic 
    Animation logic copied from game.js
*/

function CA_transition(elem, transitionStyle) {
  return new Promise((resolve, reject) => {
    function handleTransitionEnd() {
      console.log("Transition Ended...");
      resolve(elem);
    }
    elem.addEventListener("transitionend", handleTransitionEnd, { once: true });
    elem.classList.add(transitionStyle);
  });
}

// common function to apply animations to an element.
function CA_animate(elem, animation, remove_animation = null) {
  return new Promise((resolve, reject) => {
    function handleAnimationEnd() {
      console.log("animation ended...");
      resolve(elem);
    }
    elem.addEventListener("animationend", handleAnimationEnd, { once: true });
    if(remove_animation != null) elem.classList.remove(remove_animation);
    elem.classList.add(animation);
  });
}

async function CA_animation_running() {
  const transition_letter_image = document.getElementById("transition_letter_image");
  const transition_screen = document.getElementById("transition_screen");
  console.log("CA entered");
  // Cascade starts here.
  await CA_animate(transition_letter_image, "animation_01_start01");
  console.log("Slide In");
  await CA_animate(transition_letter_image, "animation_01_end02", "animation_01_start01");
  console.log("Zoom Into");
  await CA_animate(transition_screen, "hidden_opacity", "trscreen_active");
  await CA_animate(transition_letter_image, "hidden_opacity", "animation_01_end02");
  console.log("Hide using opacity");
  await CA_animate(transition_screen, "trscreen_inactive", "hidden_opacity");
  console.log("Resetting status. Page transition completed.");
}

function switch_page(next_page = false){
    event.stopPropagation();
    if(next_page){
        current_shelf_number++;
    }
    else{
        current_shelf_number--;
    }
    if((current_shelf_number*cards_per_shelf)  < 0) {
        current_shelf_number = 0;
        console.log("npin"+next_page_index_number);
        console.log("csnum"+current_shelf_number);
    }
    if((current_shelf_number*cards_per_shelf) >= card_array.length) {
        current_shelf_number--;
        console.log("calen"+card_array.length);
        console.log("csnum"+current_shelf_number);
    }
    /* Deactivating the transition page because it doesn't look good. */
    
    /* activate the transition page */
    /* var transition_screen = document.getElementById('transition_screen');
    transition_screen.classList.toggle('trscreen_inactive');
    transition_screen.classList.toggle('trscreen_active'); */
    /* Async action for letter animation sequence */
    //CA_animation_running();
    /* hide the current page */
    /* async load the thumbnails */
    
    populate_visible_element(current_shelf_number);
}

export function prev_page(){
    switch_page(false);
}

export function next_page(){
    switch_page(true);
}

export function reveal_all_card(){
    reveal_all_card_flag = true;
    populate_visible_element(current_shelf_number);
}

function test_switch_page(){
    var transition_screen = document.getElementById('transition_screen');
    transition_screen.classList.toggle('trscreen_inactive');
    transition_screen.classList.toggle('trscreen_active');
    void transition_screen.offsetWidth;
    document.getElementById("transition_screen").classList.add("animation_01_start01");
}

function test_animation(){
    document.getElementById("transition_screen").classList.add("animation_01_start01");
}

/* Single Card Display and Operation Logic */

var current_card_face = "front";
var next_card_face = "back";
var OLD_hack_toggle_for_rotate = false;
var flag_card_portrait_landscape_toggle = false;
var flag_hidden_controls = false;

var current_card_number = 0;

export function open_full_size_display() {
    if ( flip_card_triggered == true ) {
        flip_card_triggered = false;
        return;
    }
    else {
        /* unhidden the display div */
        var card_array_number = event.target.dataset.arrnum;
        if(card_array_number == -10) return;
        var fullscreen_display = document.getElementById("fullscreen_display");
        fullscreen_display.classList.remove("opacity_0");
        fullscreen_display.classList.remove("z_m1");
        fullscreen_display.classList.add("reveal_opacity");
        fullscreen_display.classList.add("z_100");
        var fullscreen_image = document.getElementById("fullscreen_image");
        if(!card_array[card_array_number].pulled || reveal_all_card_flag){
            
            fullscreen_image.src = card_folder_url_injection + "play_card.png";
            fullscreen_image.style.zIndex = 200;
            current_card_number = card_array_number;
            
            current_card_face = fullscreen_image.src;
            next_card_face = card_folder_url_injection + "play_card.png";
        }
        else{
            fullscreen_image.src = card_folder_url_injection + card_array[card_array_number].front_art;
            fullscreen_image.style.zIndex = 200;
            current_card_number = card_array_number;
            
            current_card_face = fullscreen_image.src;
            next_card_face = card_folder_url_injection + card_array[card_array_number].back_art;
        }
    }
}

export function close_full_size_display() {
    if(flag_hidden_controls == true){
        flag_hidden_controls = false;
        control_bar = document.getElementById("controls_bar");
        control_bar.classList.remove("z_10");
        control_bar.classList.remove("hidden_opacity");
        return;
    }
    
    /* hide the display div */
    var fullscreen_display = document.getElementById("fullscreen_display");
    fullscreen_display.classList.remove("reveal_opacity");
    fullscreen_display.classList.remove("z_100");
    fullscreen_display.classList.add("z_m1");
    var card_array_number = event.target.dataset.arrnum;
    var fullscreen_image = document.getElementById("fullscreen_image");
    fullscreen_image.src = "";
    fullscreen_image.style.zIndex = -2;
    fullscreen_image.classList.remove("rotate_90ccw_animation");
    fullscreen_image.classList.remove("rotate_return_animation");
    flag_card_portrait_landscape_toggle = false;
}

export function flip_card(){
    event.stopPropagation();
    flip_card_triggered = true;
    document.getElementById("fullscreen_image").src = next_card_face;
    temp_card_face = current_card_face;
    current_card_face = next_card_face;
    next_card_face = temp_card_face;
}

export function rotate_card_div(){
    event.stopPropagation();
    var fullscreen_image = document.getElementById("fullscreen_image");
    if(flag_card_portrait_landscape_toggle == false){
        fullscreen_image.classList.toggle("rotate_90ccw_animation");
        flag_card_portrait_landscape_toggle = true;
    }
    else {
        fullscreen_image.classList.toggle("rotate_90ccw_animation");
        fullscreen_image.classList.toggle("rotate_return_animation");
    }
}

export function load_next_card_div(){
    event.stopPropagation();
    var fullscreen_image = document.getElementById("fullscreen_image");
    if(++current_card_number > card_array.length - 1) current_card_number = card_array.length - 1;
    fullscreen_image.src = card_folder_url_injection + card_array[current_card_number].front_art;
}

export function load_prev_card_div(){
    event.stopPropagation();
    var fullscreen_image = document.getElementById("fullscreen_image");
    if(--current_card_number < 0) current_card_number = 0;
    fullscreen_image.src = card_folder_url_injection + card_array[current_card_number].front_art;
}

export function hide_controls_z_dive(){
    event.stopPropagation();
    var control_bar = document.getElementById("controls_bar");
    control_bar.classList.add("z_10");
    control_bar.classList.add("hidden_opacity");
    flag_hidden_controls = true;
}

export function show_controls_z_float(){
    event.stopPropagation();
    document.getElementById("controls_bar").classList.remove("z_10");
    document.getElementById("controls_bar").classList.remove("hidden_opacity");
    flag_hidden_controls = false;
}

/* Testing section before separating into module */


/* import { server_card_list } from '../card_images/cardlist.js';
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
    card_array = card_list_initialization();
    
    /* Testing Stubs */
    console.log(card_array[0].artist);
    console.log(card_array[0].front_art);
    console.log(card_array[0].back_art);
    
    var starting_number = 1;
    var element_name = template_element_name + starting_number;
    var counter = 0;
    while( counter < card_array.length && counter < cards_per_shelf)
    {
        console.log(element_name);
        var image_element = document.getElementById(element_name);
        image_element.dataset.arrnum = counter;
        counter++;
        element_name = template_element_name + ((starting_number + counter)%(cards_per_shelf)+1);
    }
}

function populate_visible_element(shelf_number) {
    var counter = 0;
    var starting_element_number = 1;
    var starting_data_number = shelf_number * cards_per_shelf;
    var element_name = template_element_name + starting_element_number;
    var image_url = ""; var image_element = null;
    console.log("shnum"+shelf_number);
    while( counter < cards_per_shelf )
    {
        var working_index = starting_data_number + counter;
        /* Adding 1 because to prevent off by one error. You can guess what happened in the album.html */
        element_name = template_element_name + (starting_element_number + counter);
        console.log(element_name);
        image_element = document.getElementById(element_name);
        
        if(card_array[working_index] == null){
            image_url = "play_card.png";
            image_element.dataset.arrnum = -10;
        }
        else{
            console.log("Reveal All Cards: "+reveal_all_card_flag);
            if(!card_array[working_index].pulled || reveal_all_card_flag) {
                image_url = card_array[working_index].front_art.replace(".png", ".webp");
            } else {
                console.log("hidden cards");
                image_url = "play_card.png";
            }
            image_element.dataset.arrnum = working_index;
        }
        if(image_element == null){
            console.log("Image element is missing! Please check album_interactions.");
            break;
        }
        image_element.src = card_folder_url_injection + "thumb_" + image_url;
        counter++;
    }
}

window.addEventListener("load", (event) => {
    initialize();
    populate_visible_element(current_shelf_number);
});

window.prev_page = prev_page;
window.next_page = next_page;
window.open_full_size_display = open_full_size_display;
window.close_full_size_display = close_full_size_display;
window.flip_card = flip_card;
window.rotate_card_div = rotate_card_div;
window.load_next_card_div = load_next_card_div;
window.load_prev_card_div = load_prev_card_div;
window.hide_controls_z_dive = hide_controls_z_dive;
window.show_controls_z_float = show_controls_z_float;
window.reveal_all_cards = reveal_all_cards;
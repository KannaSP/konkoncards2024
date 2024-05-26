/* The Process Description and Simple Data Flow Descriptor
    1. Start: Coin interactions. Coin brought to coin hole, triggering coin_drop(ev);
    2. coin_drop(ev) triggering init();
    3. 
*/

import { pull_a_card, save_all_local_data } from './game.js';


/* Wallet Function */
export function wallet_open(ev){
    ev.target.src = "assets/Wallet_Asset_open.png";
    document.getElementById("coin_container").style.opacity = 1;
}

export function wallet_close(ev){
    ev.target.src = "assets/Wallet_Asset_closed.png";
    document.getElementById("coin_container").style.opacity = 0;
}

/* This is actually a wallet - coin interface hack,
written to prevent the coin disappearing as the mouse changes
from the wallet's div to the coin's div. */

export function wallet_open_coin(ev){
    ev.target.style.opacity = 1;
    document.getElementById("wallet_img").src = "assets/machine_assets/Wallet_Asset_open.png";
}

export function wallet_close_coin(ev){
    ev.target.style.opacity = 0;
    document.getElementById("wallet_img").src = "assets/machine_assets/Wallet_interact_cut.png";
}


/* Coin Insert Functions */
/* Dragging Behaviour and Bounding Box Checks for Coins 
Source: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2
*/

export function coin_init(ev){
    ev.dataTransfer.setData("element_class", ev.target.class);
    /* document.getElementById("debug_state_display").innerHTML = "init completed"; */
    console.log("coin initialization completed");
}

export function coin_enters_target(ev){
    /* document.getElementById("debug_state_display").innerHTML = "entering target"; */
}

export function coin_hovering(ev){
    ev.preventDefault();
}

export function coin_drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("element_class");
    if(ev.target.id !== "drop_target"){
        /* document.getElementById("debug_state_display").innerHTML = "dropped outside target"; */
        /* document.getElementById("ev_target_id").innerHTML = ev.target.id; */
        return 10;
    }
    else {
        /* document.getElementById("debug_state_display").innerHTML = "coin dropped"; */
        console.log("coin dropped");
        pull_a_card();
        console.log("card pulled and set, entering animation");
        /* document.getElementById("ev_target_id").innerHTML = ev.target.id; */
        reveal_and_start_transition_video();
        save_all_local_data();
    }
}

export function coin_position_readjust(ev){
    
}

export function coin_leaves_target(ev){
    
}

/* Card Animation Section */
// common function to apply one transition rule
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


/* Knob Turning, Transition, and Card Animation Functions */

function reveal_and_start_transition_video() {
    var transition_video_container = document.getElementById("transition_video_container");
    transition_video_container.classList.remove("z_m1");
    transition_video_container.classList.remove("opacity_0");
    transition_video_container.classList.add("reveal_opacity_video_container");
    var transition_video_content = document.getElementById("transition_video_content");
    transition_video_content.play();
}

function reveal_card_pull_display() {
    console.log("video ended, revealing card display");
    var transition_video_container = document.getElementById("transition_video_container");
    transition_video_container.classList.remove("reveal_opacity_video_container");
    transition_video_container.classList.add("z_m1");
    transition_video_container.classList.add("opacity_0");
    var pulled_card_full_display = document.getElementById("pulled_card_full_display");
    pulled_card_full_display.classList.remove("z_m1");
    pulled_card_full_display.classList.remove("opacity_0");
    pulled_card_full_display.classList.add("z_100");
    pulled_card_full_display.classList.add("reveal_opacity");
}

function card_back_button() {
    var pulled_card_full_display = document.getElementById("pulled_card_full_display");
    pulled_card_full_display.classList.add("z_m1");
    pulled_card_full_display.classList.add("opacity_0");
    pulled_card_full_display.classList.remove("z_100");
    pulled_card_full_display.classList.remove("reveal_opacity");
    
}

async function old_20240524_CA_animation_running() {
    const KNOB = document.getElementById("knob_img");
    await CA_transition(KNOB, "knob_turned");

    const LETTER = document.querySelector(".LETTER");

    // first fadeout text
    await CA_animate(LETTER, "move_down");
    console.log("moving down");
    await CA_animate(LETTER, "flip_and_return", "move_down");
    console.log("flip and return");
    /* You have to realize that this line below have no guarantee it'll run 
        AFTER an AWAIT CA_transition(KNOB, "knob_turned"); function */
    document.getElementById("knob_img").classList.remove("knob_turned");
}

/* Importing Statements */

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
window.reveal_card_pull_display = reveal_card_pull_display;
window.card_back_button = card_back_button;
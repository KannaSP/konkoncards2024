/* The Process Description and Simple Data Flow Descriptor
    1. Start: Coin interactions. Coin brought to coin hole, triggering coin_drop(ev);
    2. coin_drop(ev) triggering init();
    3. 
*/

import { pull_a_card } from './randomizer.js';


/* Wallet Function */
function wallet_open(ev){
    ev.target.src = "assets/Wallet_Asset_open.png";
    document.getElementById("coin_container").style.opacity = 1;
}

function wallet_close(ev){
    ev.target.src = "assets/Wallet_Asset_closed.png";
    document.getElementById("coin_container").style.opacity = 0;
}

/* This is actually a wallet - coin interface hack,
written to prevent the coin disappearing as the mouse changes
from the wallet's div to the coin's div. */

function wallet_open_coin(ev){
    ev.target.style.opacity = 1;
    document.getElementById("wallet_img").src = "assets/Wallet_Asset_open.png";
}

function wallet_close_coin(ev){
    ev.target.style.opacity = 0;
    document.getElementById("wallet_img").src = "assets/Wallet_Asset_closed.png";
}


/* Coin Insert Functions */
/* Dragging Behaviour and Bounding Box Checks for Coins 
Source: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2
*/

function coin_init(ev){
    ev.dataTransfer.setData("element_class", ev.target.class);
    document.getElementById("debug_state_display").innerHTML = "init completed";
    console.log("coin initialization completed");
}

function coin_enters_target(ev){
    document.getElementById("debug_state_display").innerHTML = "entering target";
}

function coin_hovering(ev){
    ev.preventDefault();
}

function coin_drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("element_class");
    if(ev.target.id !== "drop_target"){
        document.getElementById("debug_state_display").innerHTML = "dropped outside target";
        document.getElementById("ev_target_id").innerHTML = ev.target.id;
        return 10;
    }
    else {
        document.getElementById("debug_state_display").innerHTML = "coin dropped";
        pull_a_card();
        document.getElementById("ev_target_id").innerHTML = ev.target.id;
        console.log("coin dropped");
        CA_animation_running();
    }
}

function coin_position_readjust(ev){
    
}

function coin_leaves_target(ev){
    
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


/* Knob and Card Animation Functions */

async function CA_animation_running() {
  const KNOB = document.getElementById("knob_img");
  await CA_transition(KNOB, "knob_turned");
  
  const LETTER = document.querySelector(".LETTER");
  
  // first fadeout text
  await CA_animate(LETTER, "move_down");
  console.log("moving down");
  await CA_animate(LETTER, "flip_and_return", "move_down");
  console.log("flip and return");
  document.getElementById("knob_img").classList.remove("knob_turned");
}



import { wallet_open, wallet_close, wallet_open_coin, wallet_close_coin, 
coin_init, coin_enters_target, coin_hovering, coin_drop, coin_position_readjust, coin_leaves_target } 
from "./animations.js";

window.wallet_open = wallet_open;
window.wallet_close = wallet_open;
window.wallet_open_coin = wallet_open;
window.wallet_close_coin = wallet_open;

window.coin_init = wallet_open;
window.coin_enters_target = wallet_open;
window.coin_hovering = wallet_open;
window.coin_drop = wallet_open;
window.coin_position_readjust = wallet_open;
window.coin_leaves_target = wallet_open;

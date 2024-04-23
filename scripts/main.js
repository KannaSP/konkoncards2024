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

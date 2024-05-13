const mute_button = document.getElementById('mute_button');
const volume_control = document.getElementById('volume_control');
const audio_player = document.getElementById('audioplayer');
const mute_button_navbar = document.getElementById('mute_button_navbar');
const volume_control_navbar = document.getElementById('volume_control_navbar');

function mute_toggle(){
    volume = volume_control_navbar.value;
    audio_player.volume = volume / 100;
    if(audio_player.muted == true) { audio_player.muted = false; } else { audio_player.muted = true; }
    mute_button_navbar.classList.toggle('sound_off');
    mute_button_navbar.classList.toggle('sound_on');
    if(volume_control != null && mute_button != null){
        volume_control.value = volume;
        mute_button.classList.toggle('sound_off');
        mute_button.classList.toggle('sound_on');
    }
    
}

function set_volume(){
    volume = volume_control_navbar.value;
    if(volume_control != null){
        volume_control.value = volume;
    }
    if(volume <= 0) {
        mute_toggle();
    }
    else if(mute_button_navbar.classList.contains('sound_off')) {
        mute_toggle();
    }
    else{
        try{
            audio_player.volume = volume / 100;
        }
        catch (error) {
            console.print('Something is wrong with the Audio Player (Video)');
        }
    }
}

function set_volume_option_controls(){
    volume_control_navbar.value = volume_control.value;
    set_volume();
}
const server_card_list = [
    { "artist" : "Kinoko", "front_art" : "Kinoko_CardArt.png", "back_art" : "Kinoko_CardBack.png", "pulled" : "false" },
    { "artist" : "fluffaldog", "front_art" : "fluffaldog_thinking_of_fox.jpg", "back_art" : "", "pulled" : "false" },
    { "artist" : "moh", "front_art" : "2024-moh-CardCharacter.png", "back_art" : "2024-moh-CardLetter.png", "pulled" : "false" },
    { "artist" : "mofumofu", "front_art" : "Mohumohu_Image.png", "back_art" : "Mohumohu_Letter.png", "pulled" : "false" },
    { "artist" : "ikki", "front_art" : "FubuKingdom.png", "back_art" : "FubuLetter.png", "pulled" : "false" }
];

var persistent_card_list = [];
var persistent_card_list_length_longer_flag = false;

function set_localitem_bulk(){
    var pure_json_text = JSON.stringify(persistent_card_list);
    window.localStorage.setItem("persistent_card_list", pure_json_text);
    console.log("persistent card list built / rebuilt. String length: "+pure_json_text.length);
}

function get_localitem_bulk(){
    var pure_json_text = window.localStorage.getItem("persistent_card_list");
    persistent_card_list = JSON.parse(pure_json_text);
    if(persistent_card_list == null) return null;
    console.log("persistent card list : "+persistent_card_list.length);
    return persistent_card_list;
}

export function card_list_initialization(reinitialization_flag) {
    //Try retrieving previous item, this method could be a reinitialization.
    if( get_localitem_bulk() == null) {
        return persistent_card_list = server_card_list;
    }
    if(persistent_card_list.length == 0) {
        return persistent_card_list = server_card_list;
    }
    if(reinitialization_flag == 1){
        console.log("WARNING! Re-initialization flag triggered! \
            ALL DATA will be synchronized to the server's data");
        localsetitembulk(server_card_list);
        persistent_card_list = server_card_list;
        console.log("Re-initialization completed! All data \
            synchronized to the server's data.");
        reinitialization_flag = 0;
        return persistent_card_list;
    }
    if( check_card_list_integrity() ) {
        console.log("Card list integrity preserved (length-checked) \
        will continue to use old local data.");
    }
    else {
        console.log("Card List Integrity not preserved! \
        resetting localStorage to new server_card_list");
        reinitialization_flag = 1;
        localsetitembulk(server_card_list);
        persistent_card_list = server_card_list;
    }
    return persistent_card_list;
}

function check_card_list_integrity() {
    if(server_card_list != persistent_card_list.length) {
        //Update priority: server_card_list, one-way sync, ADDITION ONLY.
        //Reinitialization can only be called by the server by updating the entire system.
        if(persistent_card_list.length > server_card_list.length){
            persistent_card_list_length_longer_flag = true;
            console.log("localStorage reports having more data than the source. \
                This is not normal, since we don't usually delete submissions. \
                Aborting operation with extreme prejudice. The program will use \
                the old data.")
                return true;
        }
        else persistent_card_list_length_longer_flag = false;
        
            //!! ASSUMPTIONS: server_card_list superset of persistent_card_list !!
        var temporary_array = []; var walkover_counter = 0;
        for(var i = 0; i < server_card_list.length; i++){
            //Checking if the entire entry is the same, if it's not, add to persistent_card_list
            var current_card = server_card_list[i];
            var current_persistent_card = persistent_card_list[i - walkover_counter];
            if(current_card.artist != current_persistent_card.artist 
            || current_card.front_art != current_persistent_card.front_art 
            || current_card.back_art != current_persistent_card.back_art )
            {
                temporary_array[i] = current_card;
                walkover_counter++;
            }
            else{
                //this will preserve the pulled status.
                temporary_array[i] = current_persistent_card;
            }
        }
        persistent_card_list = temporary_array;
        return true;
    }
    else 
    {
        //this is an extremely naive check but I suppose will cover most cases. Better use MD5 but eh.
        //TODO: hashcheck this thing.
        if( JSON.stringify(server_card_list).length === JSON.stringify(persistent_card_list).length )
            return true;
        else return false;
    }
}

export function save_current_data_to_localstorage(){
    set_localitem_bulk();
}

/* Use localstorage to store this data because of the pulled property.
reasoning: https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/
I got 10MB of storage (just need a few KB probs)
It's not a security nightmare
this is all security insensitive data

    Create mechanism, initialization.
        First init: download and write. writenew()
        Subsequent init request: ignore.
        re-initialization: download and overwrite.  {filename} exists? {removeall() -> writenew()}
        Create mechanism, data addition
            We don't start from 0 because The First Init was already run, but if we do, throw an exception.
                Exception: Expected a file from the first init, but file was not found / corrupted.
            Subsequent data addition, whole list update
                Check length > current collection's length
                    for every line
                    Check content by matching artist name == artist name
                    AND Check the front_art != front art file name in filename
                    AND Check back_art name !=  back art file name in filename
                        -> copy content from the new array up to the current position to a temporary list
                    -> copy content from the old array to in the current position to a temporary list
                Quit program (I assume there's no submission removal, for now)
    Read mechanism, data request
        export const cardlist = JSON.parse(filename)
    Update mechanism, data modification
    (the method should be bulk update instead of direct single element editing)
        direct access -> use array number to access the data.
    Deletion mechanism, bulk data update.

 */
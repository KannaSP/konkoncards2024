var SHUFFLE_STATE = "not_shuffled";var rearranged_array = [];var current_pull_position = 0;const ASSET_URL = "../card_images/";const filenames = ["kumarang_-1753780069288546428-01.jpg",
"kumarang_-1755004946372825504-01.jpg",
 "kumarang_-1757769813890633749-01.jpg",
"kumarang_-1758101118520009167-01.jpg",
"kumarang_-1763834816192229488-01.jpg",
"kumarang_-1763871181772595314-01.jpg",
"kumarang_-1764867432932577661-01.jpg",
"kumarang_-1764867432932577661-02.jpg",
"kumarang_-1765025175161196574-01.jpg",
"kumarang_-1765350819489300646-01.jpg",
"kumarang_-1766355348456374447-01.jpg",
"kumarang_-1766376193241260511-01.jpg",
"kumarang_-1766409668971376975-01.jpg",
"kumarang_-1772915630561194139-01.jpg",
"kumarang_-1773862709966062021-01.jpg",
"kumarang_-1773921058934099980-01.jpg",
"kumarang_-1774444271648813227-01.jpg",
"kumarang_-1775112338959728925-01.jpg",
"kumarang_-1775408730068369804-01.jpg",
"kumarang_-1775750434260762752-01.jpg",
"kumarang_-1775755564146118879-01.jpg",
"kumarang_-1775834920897954038-01.jpg",
"kumarang_-1775849241686229437-01.jpg",
"kumarang_-1775890072728187056-01.jpg",
"kumarang_-1777992694058639450-01.jpg",
"kumarang_-1779163478584185115-01.jpg",
"kumarang_-1781662565724299344-01.jpg",
"kumarang_-1781685342481133683-01.jpg",
"kumarang_-1781704831847309548-01.jpg",
"kuwapu12-1759184830368297011-01.jpg",
"KW7MD8FEWT7lMXx-1775886595541078319-01.jpg",
"lemon_mito-1766729903792361769-01.jpg",
"Luvniji1-1776805412085662133-01.jpg",
"l_illust45-1781589761175761131-01.jpg",
"mahyo0712-1776520791993258140-01.jpg",
"maruminn_-1766542610993217881-01.jpg",
"maskedrider_w-1775899833859289263-01.jpg",
"mato_ekaki-1766528249365217687-01.jpg",
"mayumaaaaaro-1781643024755470596-01.jpg",
"mikannsisyou-1773628663969304736-01.jpg",
"MimihachiBnbn-1750972024682651757-01.jpg",
"MinamotoJONNY-1766451960474218646-01.jpg",
"Minase_Nami73-1766705121172635808-01.jpg",
"misosirutarou-1760494367276732921-01.jpg",
"mitarashi_neko-1771456655982551461-01.jpg",
"mitarashi_neko-1781881600848130127-01.jpg",
"miya_azn-1776596475251667037-01.jpg",
"miyukiiii__-1753637864376873392-01.jpg",
"moka_cone-1753717558539436262-01.jpg",
"moka_cone-1764998836035137599-01.jpg",
"moka_cone-1775876129834123673-01.jpg",
"morishi2000-1772788533117456562-01.jpg",
"mugicha__61-1759115334785912975-01.jpg",
"nagare_fuc-1766544378477056451-01.jpg",
"nagare_fuc-1779758930610229755-01.jpg",
"Naga_rae-1758778366537404544-01.jpg",
"Naga_rae-1775865909498019982-01.jpg",
"namekokujira1-1775632264476664142-01.jpg",
"nashino53-1781928742484611275-01.jpg",
"natsuiromatsuri-1774556263814435296-01.jpg",
"Natsu_1936-1766672832036225520-01.jpg",
"nat_hat_gyutto-1781911770330005706-01.jpg",
"neko_yama-1753386372390604873-01.jpg",
"neko_yama-1766475018865885660-01.jpg",
"neko_yama-1772918818714587478-01.jpg",
"neko_yama-1773302203408666701-01.jpg",
"neko_yama-1781688884306596289-01.jpg",
"nekumiro-1773012742514860523-01.jpg",
"NemyuNike-1779079579917033727-01.jpg",
"N_Akahosi_797-1764969114433450091-01.jpg",
"N_Akahosi_797-1772911709734236161-01.jpg",
"N_Akahosi_797-1774269275374764353-01.jpg",
"OKEGAWAN-1779411061013430279-01.jpg",
"onihime_takun-1781598990515294266-01.jpg",
"otu_kairi-1773001117695386089-01.jpg",
"OyOy12345678-1775882957301137555-01.jpg",
"peperonnyaki-1765716890691989923-01.jpg",
"Phantom72667270-1781596446439125145-01.jpg",
"pino_shirokuma-1781634440973922326-01.jpg",
"pino_shirokuma-1781981366458183978-01.jpg",
"porunium-1781653082365210962-01.jpg",
"potemaL_-1766838273614467348-01.jpg",
"rappiyade-1772919018825171283-01.jpg",
"ren_mon4-1775721201140187563-01.jpg",
"retrocreature_-1764765532035960996-01.jpg",
"Rijeka1918-1760609671298347261-01.jpg",
"sakuramt6-1644714796582060035-01.jpg",
"sakuramt6-1763913017039949831-01.jpg",
"sakuramt6-1774061394935324682-01.jpg",
"sen42724788-1776797002208301133-01.jpg",
"ShigatsuBaka4-1766660255751299484-01.jpg",
"shihonana_-1781875203787944388-01.jpg",
"shiki_olie-1781616544935743982-01.jpg",
"shino2121-1772904499390107857-01.jpg",
"Shin__insh-1759153730883403951-01.jpg",
"shirai_yu_-1766433150300000416-01.jpg",
"shirai_yu_-1781650315424764152-01.jpg",
"shirakamifubuki-1754119626194313268-01.jpg",
"shirakamifubuki-1762061411805745600-01.jpg",
"shirakamifubuki-1764616010106282000-01.jpg"];/* Snipping array according to cycle_array and last known position. Taking asset_url just to be sure. Known image list in JSON must be hard-coded.*/function snip_array(cycle_array, url, last_position){    if(url !== "card_images/")    {        document.getElementById("satollo_result").innerHTML = "Recheck the URL";    }        if(cycle_array == null)    {        throw new Error('cycle_array is empty! Please initialize the array first.');    }        cycle_array.forEach((item) => {        item = item.concat(url, "/", item);    });        return cycle_array.slice(last_position, cycle_array.length);}/*Input: Variables: Name and Last Known Position.Statics: asset url, known image name list in json, known number of images.Processes:1. hash(name)2. cycle(hash)3. snip_array(cycle, asset_url, last_position)4. return snipped_arrayOutput: 1. An array of snipped to length image urls.*/function generate_array(){    var testing_randomizer = new Alea("test");    if(testing_randomizer() != 0.5442283214069903){        window.alert('There\' seem to be a problem in the PRNG, so we can not continue the operations. Please notify the admin. We\'re sorry for the inconviniences.');        throw new Error('Inconsistencies in PRNG! Aborting operations.');    }    if(testing_randomizer() != 0.7071346458978951){        window.alert('There\' seem to be a problem in the PRNG, so we can not continue the operations. Please notify the admin. We\'re sorry for the inconviniences.');        throw new Error('Inconsistencies in PRNG! Aborting operations.');    }    if(testing_randomizer() != 0.7247104682028294){        window.alert('There\' seem to be a problem in the PRNG, so we can not continue the operations. Please notify the admin. We\'re sorry for the inconviniences.');        throw new Error('Inconsistencies in PRNG! Aborting operations.');    }    console.log('randomizer testing completed.');    var form_object = document.forms.user_number;    var last_known_position = form_object.elements.last_pull_number.value;    var name = form_object.elements.username.value;    console.log(name+" pullnumber="+last_known_position);    current_pull_position = last_known_position;        if(last_known_position <= 0){        throw new Error('Last known position is less then one. Exiting function.');    }        if(last_known_position > filenames.length){        throw new Error('Last position larger than array size.');    }    if(name == ""){        throw new Error('You have to write a name.');    }           document.getElementById("username_input").setAttribute("disabled", "disabled");    document.getElementById("last_pull_number_input").setAttribute("disabled", "disabled");        rearranged_array = sattoloCycle(filenames, name);    SHUFFLE_STATE = "shuffled";    /* document.getElementById("satollo_result").innerHTML = rearranged_array;    var final_snipped_array = snip_array(rearranged_array, ASSET_URL, last_known_position);    document.getElementById("result").innerHTML = final_snipped_array;    shuffled_cards = final_snipped_array; */    return 0;}function reset_start_button(){    document.getElementById("username_input").removeAttribute("disabled");    document.getElementById("last_pull_number_input").removeAttribute("disabled");    document.getElementById("start_button").removeAttribute("disabled");    document.getElementById("card_image").src = "blank.jpg";    return 0;}function pull_a_card(){    if( SHUFFLE_STATE === "shuffled" ) {        document.getElementById("username_input").setAttribute("disabled", "disabled");        document.getElementById("last_pull_number_input").setAttribute("disabled", "disabled");        //Just in case something goes wrong somewhere.        if(current_pull_position<0) throw new Error("Critical error: pull position lower than 0 or not an integer");         var currentimage = rearranged_array[current_pull_position++]; //something wrong here.        document.getElementById("card_image").src = ASSET_URL+currentimage;        return 0;    }    else {        generate_array();        pull_a_card();        return 0;    }    }export { pull_a_card };/* Hash function for unicode to hash int_32Source: https://github.com/nquinlan/better-random-numbers-for-javascript-mirror/blob/master/support/js/Mash.jsfrom the works of Nick Quinlan at Github, which he took from someone else from a now defunct website.*/// From http://baagoe.com/en/RandomMusings/javascript/// Johannes Baagøe <baagoe@baagoe.com>, 2010function Mash() {  var n = 0xefc8249d;  var mash = function(data) {    data = data.toString();    for (var i = 0; i < data.length; i++) {      n += data.charCodeAt(i);      var h = 0.02519603282416938 * n;      n = h >>> 0;      h -= n;      h *= n;      n = h >>> 0;      h -= n;      n += h * 0x100000000; // 2^32    }    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32  };  mash.version = 'Mash 0.9';  return mash;}/* Taken from https://github.com/nquinlan/better-random-numbers-for-javascript-mirror/blob/master/support/js/Alea.jsfrom the works of Nick Quinlan at Github, which he took from someone else from a now defunct website.Modified a little bit for consistency and annotations. */// From http://baagoe.com/en/RandomMusings/javascript/function Alea() {  return (function(args) {    // Johannes Baagøe <baagoe@baagoe.com>, 2010    var s0 = 0;    var s1 = 0;    var s2 = 0;    var c = 1;    if (args.length == 0) {      //args = [+new Date]; //This is the original code.      throw new Error('RNG, 0 argument. Check randomizer.');    }    var mash = Mash();    s0 = mash(' ');    s1 = mash(' ');    s2 = mash(' ');    for (var i = 0; i < args.length; i++) {      s0 -= mash(args[i]);      if (s0 < 0) {        s0 += 1;      }      s1 -= mash(args[i]);      if (s1 < 0) {        s1 += 1;      }      s2 -= mash(args[i]);      if (s2 < 0) {        s2 += 1;      }    }    mash = null; //destroyed the instance for collection.    var random = function() {      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32      s0 = s1;      s1 = s2;      return s2 = t - (c = t | 0);    };    random.uint32 = function() {      return random() * 0x100000000; // 2^32    };    random.fract53 = function() {      return random() +         (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53    };    random.version = 'Alea 0.9';    random.args = args;    return random;  } (Array.prototype.slice.call(arguments)));}/* RNG Function by David Bau:https://github.com/davidbau/seedrandomSattolo's Shuffling Algorithm sources:https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shufflehttps://danluu.com/sattolo/https://rosettacode.org/wiki/Sattolo_cycle */function sattoloCycle(items, seed) {    var alearng = new Alea(seed);    for (var i = items.length-1; i > 0; i--) {        var j = Math.floor(alearng() * i);        var tmp = items[i];        items[i] = items[j];        items[j] = tmp;    }    return items;}
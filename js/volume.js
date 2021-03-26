

let volume_change = document.getElementById("volume_change")
let volume_numeric_display = document.getElementById("volume_numeric_display")
let volume_level_display = document.getElementById("volume_level_display")
let mute_cont = document.getElementById("mute_cont")

volume_change.addEventListener("wheel",handleVolumeChange)

mute_cont.addEventListener("click",toggleMute)

fromMain.start_realtime_data = function(data){
    console.log("start_realtime_data");
    STATE.realtime = true

}
fromMain.stop_realtime_data = function(data){
    console.log("stop_realtime_data");
    STATE.realtime = false

}
fromMain.config_definition = function(data){
    console.log("config_definition");
    config = data.data
}
fromMain.volume_change = function(data){
    console.log("volume_change");
    actl.setVolume(data.value)
}

/*
fromMain.position_size_update_pass = function(data){
    console.log("position_size_update_pass",data);
}
*/

function handleVolumeChange(event) {
    //console.log("handleVolumeChange",event);
    let updown = "+"
    if (event.deltaY > 0) {
        console.log("volume down",event.deltaY);
        updown = "-"
    } else {
        console.log("volume up",event.deltaY);
    }
    actl.setVolume(updown)



}

function toggleMute(event) {
    actl.setVolume("toggle")
}

function handleVolumeUpdate(data) {
    if (data.mute === true){
        mute_cont.style.color = "red"
        mute_cont.textContent = "Un-Mute"
    } else {
        mute_cont.style.color = "white"
        mute_cont.textContent = "Mute"
    }
    volume_numeric_display.textContent = data.level
    volume_level_display.style.height = (data.level * 2) + "px"
}

function handleVolumeError(data) {
    console.log(data);
}


//-----------------------window buttons----------------------------------------
// menu and main button listeners
let window_buttons = document.getElementsByClassName("window_btn");
for (var i = 0; i < window_buttons.length; i++) {
    window_buttons[i].addEventListener("click", handleWindowButton);
}


// minimum/maximize/close
function handleWindowButton(event) {
    let btn_id
    if (typeof(event) === "string") {
        btn_id = event
    } else {
        btn_id = event.target.id
    }
    console.log("win-button", btn_id);
    lsh.send("hud_window",{type:"window_button", button:btn_id, hudid: hudid })
}

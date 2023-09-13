const TPClient = new (require('touchportal-api').Client)();
var exec = require('child_process').exec;


const pluginId = 'TouchPortal_MessageKeyPress';

let settings = {};

const typeMessage = (tpmessage) => {
    let command = 'MessageKeyPress.exe "' + tpmessage.data[0].value + '"';

    return exec(command, {}, function(error, stdout, stderr) {
        if( error != null ) {
            TPClient.logIt("ERROR", error);
        }
    });
}

TPClient.on("Action", (message,hold) => {
    console.log(pluginId, ": DEBUG : ACTION ", JSON.stringify(message), "hold", hold);
    switch(message.actionId) {
        case 'message_keypress_type_message':
            typeMessage(message);
            break;
        default:
            logIt('WARN',`Unknown action of ${message.actionId}`);
    }
});

TPClient.on("Settings",(data) => {
    logIt('DEBUG',JSON.stringify(data));
    if( data ) {
        data.forEach( (setting) => {
          let key = Object.keys(setting)[0];
          if( settings[key] === setting[key] ) return;
          settings[key] = setting[key];
        });
    }
});

TPClient.on("Info", (data) => {
    //TP Is connected now
    logIt('DEBUG','We are connected, received Info message');
});

function logIt() {
    var curTime = new Date().toISOString();
    var message = [...arguments];
    var type = message.shift();
    console.log(curTime,":",pluginId,":"+type+":",message.join(" "));
}
    
TPClient.connect({ pluginId });
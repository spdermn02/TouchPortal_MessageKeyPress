const TPClient = new (require('touchportal-api').Client)();
var ks = require('node-key-sender');

/* var robot = require("kbm-robot");

robot.startJar(); */

const pluginId = 'TouchPortal_MessageKeyPress';

let settings = {};

var accentsMap = {
    'ã': '@514-a',
    'ẽ': '@514 e',
    'ĩ': '@514 i',
    'õ': '@514 o',
    'ũ': '@514 u',
    'Ã': '@514 A',
    'Ẽ': '@514 E',
    'Ĩ': '@514 I',
    'Õ': '@514 O',
    'Ũ': '@514 U',
    'â': 'shift-@514 a',
    'ê': 'shift-@514 e',
    'î': 'shift-@514 i',
    'ô': 'shift-@514 o',
    'û': 'shift-@514 u',
    'Â': 'shift-@514 A',
    'Ê': 'shift-@514 E',
    'Î': 'shift-@514 I',
    'Ô': 'shift-@514 O',
    'Û': 'shift-@514 U',
    'à': 'shift-@192 a',
    'è': 'shift-@192 e',
    'ì': 'shift-@192 i',
    'ò': 'shift-@192 o',
    'ù': 'shift-@192 u',
    'À': 'shift-@192 A',
    'È': 'shift-@192 E',
    'Ì': 'shift-@192 I',
    'Ò': 'shift-@192 O',
    'Ù': 'shift-@192 U',
    'á': '@192 a',
    'é': '@192 e',
    'í': '@192 i',
    'ó': '@192 o',
    'ú': '@192 u',
    'Á': '@192 A',
    'É': '@192 E',
    'Í': '@192 I',
    'Ó': '@192 O',
    'Ú': '@192 U',
    'ç': '@192 c',
    'Ç': '@192 C',
    'ä': 'shift-@54 a',
    'ë': 'shift-@54 e',
    'ï': 'shift-@54 i',
    'ö': 'shift-@54 o',
    'ü': 'shift-@54 u',
    'Ä': 'shift-@54 A',
    'Ë': 'shift-@54 E',
    'Ï': 'shift-@54 I',
    'Ö': 'shift-@54 O',
    'Ü': 'shift-@54 O'
};
var keyboardLayout = { '~': 'shift-@192', '!': 'shift-1', '@': 'shift-2', '#': 'shift-3', '$': 'shift-4', 
'%': 'shift-5', '^': 'shift-6', '&': 'shift-7', '*': 'shift-8', '(': 'shift-9', ')': 'shift-0', 
'_': 'shift-@45', '+': 'shift-@61', '{': 'shift-@91', '}': 'shift-@93', ':': 'shift-@59', 
'"': "shift-@222", '|': 'shift-@92', '<': 'shift-@44', '>': 'shift-@46', '?': 'shift-@47', '`': '@192',
}

ks.aggregateKeyboardLayout(accentsMap);
ks.aggregateKeyboardLayout(keyboardLayout);

const typeMessage = (tpmessage) => {
    /* ks.startBatch()
      .batchTypeText(tpmessage.data[0].value)
      .sendBatch(); */
    ks.sendText(tpmessage.data[0].value);
      /* robot.typeString(tpmessage.data[0].value).go(); */
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
let modifiers = ["Alt", "Ctrl", "Shift", "Command", "MacCtrl"];
let shortcut = document.querySelector("#shortcut");
let isValidShortcut;

var shortcutKeys;

function startCapturing() {
    console.log('startCapturing');
    shortcutKeys = [];
    shortcut.value = '';
    isValidShortcut = true
}

function captureKey(event) {
    event.stopPropagation();
    event.preventDefault();

    keyStr = event.key == 'Control' ? 'Ctrl' : event.key

    switch (shortcutKeys.length) {
        case 0:
            if (modifiers.includes(keyStr)) {
                shortcutKeys.push(keyStr);
            }
            break;
        case 1:
            if ((modifiers.includes(keyStr) && keyStr != shortcutKeys[0]) || (event.keyCode >= 48 && event.keyCode <= 123)) {
                shortcutKeys.push(keyStr);
            }
            break
        case 2:
            if (modifiers.includes(shortcutKeys[1]) && event.keyCode >= 48 && event.keyCode <= 123) {
                shortcutKeys.push(keyStr);
            }
            break
        default:
            console.log(`****Invalid shortcut****`)
            isValidShortcut = false;
            break;
    }
    console.log(`startCaptureShortcut: key: ${event.key}, keycode: ${event.keyCode}, array: ${shortcutKeys}, lenght ${shortcutKeys.length}`);
}

function endCaptureShortcut() {
    //console.log(`************endCaptureShortcut: ${isValidShortcut}`)
    let shortcutValue;
    if (isValidShortcut) {
        switch (shortcutKeys.length) {
            case 2:
                shortcutValue = `${shortcutKeys[0]}+${shortcutKeys[1].toUpperCase()}`
                break;
            case 3:
                shortcutValue = `${shortcutKeys[0]}+${shortcutKeys[1]}+${shortcutKeys[2].toUpperCase()}`
                break;
            default:
                console.log
        }
        console.log(`final value: ${shortcutValue}`);
        shortcut.value = shortcutValue;
    }
} 
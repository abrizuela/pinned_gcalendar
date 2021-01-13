const commandName = '_execute_browser_action';

/**
 * Update the UI: set the value of the shortcut textbox.
 */
async function updateUI() {
    let commands = await browser.commands.getAll();
    for (command of commands) {
        if (command.name === commandName) {
            document.querySelector('#shortcut').value = command.shortcut;
        }
    }
}

/**
 * Show and hide a message when the changes are saved
 */
async function msgUpdated() {
    var updatedMessage = document.querySelector("#updatedMessage");
    updatedMessage.classList.replace("hidden", "shown");
    setTimeout(function () { updatedMessage.classList.replace("shown", "hidden"); }, 3000);
}

/**
 * Update the shortcut based on the value in the textbox.
 */
async function updateShortcut() {
    await browser.commands.update({
        name: commandName,
        shortcut: document.querySelector('#shortcut').value
    });
    updateUI();
    msgUpdated();
}

/**
 * Reset the shortcut and update the textbox.
 */
async function resetShortcut() {
    await browser.commands.reset(commandName);
    updateUI();
}

/**
 * Update the UI when the page loads.
 */
document.addEventListener('DOMContentLoaded', updateUI);

/**
 * Handle update and reset button clicks
 */
document.querySelector('#shortcut').addEventListener('blur', updateShortcut)
document.querySelector('#reset').addEventListener('click', resetShortcut)

//No está funcionando bien cuando cambio la pestaña sin que se haya guardado antes

/**
 * Handle the keyboard shortcut capture events
 */
document.querySelector('#shortcut').addEventListener('focus', startCapturing);
document.querySelector('#shortcut').addEventListener('keydown', captureKey);
document.querySelector('#shortcut').addEventListener('keyup', endCaptureShortcut);
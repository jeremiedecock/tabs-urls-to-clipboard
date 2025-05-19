// Add localization strings for the options page
function localizeUI() {
  document.getElementById("options-title").textContent = browser.i18n.getMessage("optionsTitle");
  document.getElementById("include-title-label").textContent = browser.i18n.getMessage("includeTabTitles");
  document.getElementById("notification-label").textContent = browser.i18n.getMessage("showNotification");
  document.getElementById("save-button").textContent = browser.i18n.getMessage("saveButton");
  
  // Label for the format selector
  const formatLabel = document.querySelector('label[for="format-select"]');
  if (formatLabel) {
    formatLabel.textContent = browser.i18n.getMessage("outputFormat");
  }
}

// Save user options
function saveOptions(e) {
  e.preventDefault();
  
  browser.storage.sync.set({
    format: document.querySelector("#format-select").value,
    includeTitle: document.querySelector("#include-title").checked,
    showNotification: document.querySelector("#copy-notification").checked
  }).then(() => {
    // Display confirmation message
    const statusMessage = document.querySelector("#status-message");
    statusMessage.textContent = browser.i18n.getMessage("optionsSaved");
    statusMessage.style.display = "block";
    setTimeout(() => {
      statusMessage.textContent = "";
      statusMessage.style.display = "none";
    }, 2000);
  }).catch(error => {
    console.error(`Error saving options: ${error}`);
  });
}

// Load saved options
function restoreOptions() {
  browser.storage.sync.get({
    // Default values
    format: "markdown",
    includeTitle: true,
    showNotification: true
  }).then((result) => {
    document.querySelector("#format-select").value = result.format;
    document.querySelector("#include-title").checked = result.includeTitle;
    document.querySelector("#copy-notification").checked = result.showNotification;
  }).catch((error) => {
    console.error(`Error loading options: ${error}`);
  });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  localizeUI();
  restoreOptions();
});
document.querySelector("#options-form").addEventListener("submit", saveOptions);
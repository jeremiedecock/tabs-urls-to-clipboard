// Timeout duration for displaying the status message (in milliseconds)
const STATUS_MESSAGE_TIMEOUT_MS = 2000;

/**
 * Save user options to browser storage.
 * 
 * This function is triggered when the user submits the options form. It saves the selected options 
 * (format, includeTitle, showNotification) to the browser's sync storage. After saving, it displays 
 * a confirmation message to the user for a short duration.
 * 
 * @param {Event} e - The event object associated with the form submission.
 */
function saveOptions(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  
  // Save options to browser storage
  browser.storage.sync.set({
    format: document.querySelector("#format-select").value,                // Selected format (e.g., markdown, plain text)
    includeTitle: document.querySelector("#include-title").checked,        // Whether to include the page title
    showNotification: document.querySelector("#copy-notification").checked // Whether to show a notification after copying
  }).then(() => {
    // Display a confirmation message to the user
    const statusMessage = document.querySelector("#status-message");
    statusMessage.textContent = browser.i18n.getMessage("optionsSaved");   // Localized message for "Options saved"
    statusMessage.style.display = "block";                                 // Show the message
    setTimeout(() => {
      statusMessage.textContent = "";        // Clear the message after the timeout
      statusMessage.style.display = "none";  // Hide the message
    }, STATUS_MESSAGE_TIMEOUT_MS);
  }).catch(error => {
    // Log an error if saving options fails
    console.error(`Error saving options: ${error}`);
  });
}

/**
 * Load saved options from browser storage.
 * 
 * This function is called when the options page is loaded. It retrieves the saved options 
 * from the browser's sync storage and updates the UI elements (dropdowns, checkboxes) accordingly.
 * 
 * @returns {void}
 */
function restoreOptions() {
  browser.storage.sync.get({
    // Default values for options if none are saved
    format: "markdown",     // Default format is markdown
    includeTitle: true,     // Include title by default
    showNotification: true  // Show notification by default
  }).then((result) => {
    // Update the UI with the retrieved options
    document.querySelector("#format-select").value = result.format;
    document.querySelector("#include-title").checked = result.includeTitle;
    document.querySelector("#copy-notification").checked = result.showNotification;
  }).catch((error) => {
    // Log an error if loading options fails
    console.error(`Error loading options: ${error}`);
  });
}

/**
 * Initialize internationalization (i18n) for the options page.
 * 
 * This function replaces all i18n message placeholders in the HTML with their localized strings.
 * It looks for elements with specific IDs and updates their text content with the corresponding
 * localized messages.
 */
function initializeI18n() {
  // Set the title of the options page
  document.getElementById("options-title").textContent = browser.i18n.getMessage("optionsTitle");
  
  // Set labels for form elements
  const outputFormatLabel = document.querySelector("[for='format-select']");
  if (outputFormatLabel) {
    outputFormatLabel.textContent = browser.i18n.getMessage("outputFormat");
  }
  
  // Set the plain text option label
  const plainTextOption = document.querySelector("option[value='plaintext']");
  if (plainTextOption && browser.i18n.getMessage("plainTextFormat")) {
    plainTextOption.textContent = browser.i18n.getMessage("plainTextFormat");
  }
  
  // Set checkboxes labels
  document.getElementById("include-title-label").textContent = browser.i18n.getMessage("includeTabTitles");
  document.getElementById("notification-label").textContent = browser.i18n.getMessage("showNotification");
  
  // Set button text
  document.getElementById("save-button").textContent = browser.i18n.getMessage("saveButton");
}

// Event listeners ////////////////////////////////////////////////////////////

/**
 * Initialize the options page.
 * 
 * This event listener is triggered when the DOM content is fully loaded.
 * It restores the saved options to ensure the UI reflects the user's preferences.
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeI18n(); // Initialize i18n strings
  restoreOptions(); // Restore options when the DOM is fully loaded
});

/**
 * Attach a submit event listener to the options form.
 * 
 * This listener triggers the saveOptions function when the user submits the form.
 */
document.querySelector("#options-form").addEventListener("submit", saveOptions);
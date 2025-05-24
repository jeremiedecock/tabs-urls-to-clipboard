/**
 * Retrieves the currently highlighted tabs in the current browser window.
 * 
 * This function queries the browser's tabs API to get all tabs that are
 * currently highlighted in the active window.
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of tab objects.
 */
function getCurrentWindowTabs() {
  return browser.tabs.query({ currentWindow: true, highlighted: true });
}

/**
 * Formats the URLs of the currently highlighted tabs and copies them to the clipboard.
 * 
 * This function retrieves user preferences from storage, formats the URLs of the
 * highlighted tabs according to the selected format (Markdown, HTML, or plain text),
 * and copies the formatted string to the clipboard. Optionally, it displays a notification
 * indicating success or failure.
 */
function listTabs() {
  // Retrieve user options from storage with default values
  browser.storage.sync.get({
    format: "markdown",       // Default format is Markdown
    includeTitle: true,       // Include tab titles by default
    showNotification: true    // Show notifications by default
  }).then(options => {
    getCurrentWindowTabs().then((tabs) => {
      let tabsListStr = "";

      // Format the tabs list based on user preferences
      for (let tab of tabs) {
        if (options.format === "markdown") {
          // Markdown format
          if (options.includeTitle) {
            tabsListStr += `- [${tab.title}](${tab.url})\n`;
          } else {
            tabsListStr += `- ${tab.url}\n`;
          }
        } else if (options.format === "html") {
          // HTML format
          if (options.includeTitle) {
            tabsListStr += `<a href="${tab.url}">${tab.title}</a><br>\n`;
          } else {
            tabsListStr += `<a href="${tab.url}">${tab.url}</a><br>\n`;
          }
        } else {
          // Plain text format
          if (options.includeTitle) {
            tabsListStr += `${tab.title}: ${tab.url}\n`;
          } else {
            tabsListStr += `${tab.url}\n`;
          }
        }
      }

      // Copy the formatted string to the clipboard
      navigator.clipboard.writeText(tabsListStr).then(function() {
        // Display a success notification if enabled
        if (options.showNotification) {
          browser.notifications.create({
            type: "basic",
            iconUrl: browser.runtime.getURL("icons/icon-48.png"),
            title: browser.i18n.getMessage("extensionName"),
            message: browser.i18n.getMessage("copySuccess")
          });
        }
      }, function() {
        // Display a failure notification if enabled
        if (options.showNotification) {
          browser.notifications.create({
            type: "basic",
            iconUrl: browser.runtime.getURL("icons/icon-48.png"),
            title: browser.i18n.getMessage("extensionName"),
            message: browser.i18n.getMessage("copyFailure")
          });
        }
      });
    });
  });
}

/**
 * Handles keyboard shortcut commands.
 * 
 * This function listens for specific commands (e.g., "copy-tabs-urls") and
 * triggers the corresponding functionality, such as copying tab URLs to the clipboard.
 * 
 * @param {string} command - The command triggered by the user.
 */
browser.commands.onCommand.addListener((command) => {
  if (command === "copy-tabs-urls") {
    listTabs();
  }
});

/**
 * Initializes the extension.
 * 
 * This function sets up any necessary listeners or initializations required
 * when the extension is loaded.
 */
function init() {
  console.log("Tabs' URLs to Clipboard initialized");
}

// Execute the initialization function
init();
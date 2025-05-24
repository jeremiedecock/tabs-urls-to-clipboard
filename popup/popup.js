/**
 * Formats a list of tabs into a string based on the specified options.
 * 
 * @param {Array} tabs - The list of tabs to format. Each tab is an object with `title` and `url` properties.
 * @param {Object} options - Formatting options.
 * @param {string} options.format - The desired format ("markdown", "html", or "plaintext").
 * @param {boolean} options.includeTitle - Whether to include the tab's title in the output.
 * @returns {string} - The formatted string representation of the tabs.
 */
function formatTabsAsText(tabs, options) {
  let tabsListStr = "";

  for (let tab of tabs) {
    switch (options.format) {
      case "markdown":
        // Format as Markdown list items
        if (options.includeTitle) {
          tabsListStr += `- [${tab.title}](${tab.url})\n`;
        } else {
          tabsListStr += `- ${tab.url}\n`;
        }
        break;
      case "html":
        // Format as HTML anchor tags
        if (options.includeTitle) {
          tabsListStr += `<a href="${tab.url}">${tab.title}</a><br>\n`;
        } else {
          tabsListStr += `<a href="${tab.url}">${tab.url}</a><br>\n`;
        }
        break;
      case "plaintext":
      default:
        // Default to plain text format
        if (options.includeTitle) {
          tabsListStr += `${tab.title}: ${tab.url}\n`;
        } else {
          tabsListStr += `${tab.url}\n`;
        }
    }
  }

  return tabsListStr;
}


/**
 * Copies the URLs of the currently selected tabs to the clipboard.
 * The format and inclusion of titles are determined by user preferences stored in browser storage.
 */
function copySelectedTabsToClipboard() {
  // Retrieve user options from browser storage
  browser.storage.sync.get({
    // Default values for options
    format: "markdown",
    includeTitle: true,
    showNotification: true
  }).then(options => {
    // Query the currently highlighted tabs in the current window
    browser.tabs.query({ currentWindow: true, highlighted: true }).then((tabs) => {
      const tabsListStr = formatTabsAsText(tabs, options);

      // Write the formatted tabs list to the clipboard
      navigator.clipboard.writeText(tabsListStr).then(() => {
        // Notify the user of success
        document.getElementById("status").textContent = browser.i18n.getMessage("copySuccess");
        setTimeout(() => {
          document.getElementById("status").textContent = "";
          window.close(); // Automatically close the popup after a short delay
        }, 1500);
      }).catch((error) => {
        // Handle clipboard write errors
        console.error("Clipboard write error:", error);
        document.getElementById("status").textContent = browser.i18n.getMessage("copyFailure");
      });
    }).catch(error => {
      // Handle errors querying tabs
      console.error("Error querying tabs:", error);
    });
  }).catch(error => {
    // Handle errors retrieving storage options
    console.error("Error getting storage:", error);
  });
}


/**
 * Updates the copy button text to include the keyboard shortcut.
 * 
 * Retrieves the configured keyboard shortcut for the "copy-tabs-urls" command
 * and appends it to the button text.
 */
function updateButtonWithShortcut() {
  // Get the base text from i18n
  const baseText = browser.i18n.getMessage("copyFeature");
  const copyButton = document.getElementById("copy-tabs");
  
  // Try to get the commands to find the shortcut
  browser.commands.getAll().then(commands => {
    const copyCommand = commands.find(cmd => cmd.name === "copy-tabs-urls");
    
    if (copyCommand && copyCommand.shortcut) {
      // If shortcut exists, add it to the button text
      copyButton.textContent = `${baseText} (${copyCommand.shortcut})`;
    } else {
      // Fallback to just the base text
      copyButton.textContent = baseText;
    }
  }).catch(error => {
    console.error("Error getting commands:", error);
    copyButton.textContent = baseText;
  });
}


document.addEventListener("DOMContentLoaded", () => {
  // Initialize internationalization
  document.getElementById("popup-title").textContent = browser.i18n.getMessage("popupTitle");
  
  // Dynamically set the "copy-tabs" button text (to display the keyboard shortcut)
  updateButtonWithShortcut();
  
  // Set up the event handler for the "Copy Tabs" button
  const copyButton = document.getElementById("copy-tabs");
  copyButton.addEventListener("click", copySelectedTabsToClipboard);
});
function formatTabsAsText(tabs, options) {
  let tabsListStr = "";
  
  for (let tab of tabs) {
    switch(options.format) {
      case "markdown":
        if (options.includeTitle) {
          tabsListStr += `- [${tab.title}](${tab.url})\n`;
        } else {
          tabsListStr += `- ${tab.url}\n`;
        }
        break;
      case "html":
        if (options.includeTitle) {
          tabsListStr += `<a href="${tab.url}">${tab.title}</a><br>\n`;
        } else {
          tabsListStr += `<a href="${tab.url}">${tab.url}</a><br>\n`;
        }
        break;
      case "plaintext":
      default:
        if (options.includeTitle) {
          tabsListStr += `${tab.title}: ${tab.url}\n`;
        } else {
          tabsListStr += `${tab.url}\n`;
        }
    }
  }
  
  return tabsListStr;
}

function copySelectedTabsToClipboard() {
  // Retrieve user options
  browser.storage.sync.get({
    // Default values
    format: "markdown",
    includeTitle: true,
    showNotification: true
  }).then(options => {
    browser.tabs.query({ currentWindow: true, highlighted: true }).then((tabs) => {
      const tabsListStr = formatTabsAsText(tabs, options);

      navigator.clipboard.writeText(tabsListStr).then(() => {
        document.getElementById("status").textContent = browser.i18n.getMessage("copySuccess");
        setTimeout(() => {
          document.getElementById("status").textContent = "";
          window.close(); // Automatically close the popup after a few seconds
        }, 1500);
      }).catch((error) => {
        console.error("Clipboard write error:", error);
        document.getElementById("status").textContent = browser.i18n.getMessage("copyFailure");
      });
    }).catch(error => {
      console.error("Error querying tabs:", error);
    });
  }).catch(error => {
    console.error("Error getting storage:", error);
  });
}

// Initialize the user interface with localized strings
function initUI() {
  document.getElementById("popup-title").textContent = browser.i18n.getMessage("popupTitle");
  document.getElementById("copy-tabs").textContent = browser.i18n.getMessage("toggleFeature");
}

// Initialization when the document loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the user interface with localized strings
  initUI();
  
  // Set up event handlers
  const copyButton = document.getElementById("copy-tabs");
  copyButton.addEventListener("click", copySelectedTabsToClipboard);
});
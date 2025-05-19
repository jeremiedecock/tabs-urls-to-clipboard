// Function to get currently highlighted tabs in current window
function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true, highlighted: true});
}

// Format and copy tabs to clipboard based on user preferences
function listTabs() {
  // Retrieve user options
  browser.storage.sync.get({
    // Default values
    format: "markdown",
    includeTitle: true,
    showNotification: true
  }).then(options => {
    getCurrentWindowTabs().then((tabs) => {
      let tabsListStr = "";
      
      // Format according to user preferences
      for (let tab of tabs) {
        if (options.format === "markdown") {
          if (options.includeTitle) {
            tabsListStr += `- [${ tab.title }](${ tab.url })\n`;
          } else {
            tabsListStr += `- ${ tab.url }\n`;
          }
        } else if (options.format === "html") {
          if (options.includeTitle) {
            tabsListStr += `<a href="${tab.url}">${tab.title}</a><br>\n`;
          } else {
            tabsListStr += `<a href="${tab.url}">${tab.url}</a><br>\n`;
          }
        } else {
          // plaintext format
          if (options.includeTitle) {
            tabsListStr += `${tab.title}: ${tab.url}\n`;
          } else {
            tabsListStr += `${tab.url}\n`;
          }
        }
      }

      navigator.clipboard.writeText(tabsListStr).then(function() {
        // Display notification only if the option is enabled
        if (options.showNotification) {
          browser.notifications.create({
            type: "basic",
            iconUrl: browser.runtime.getURL("icons/icon-48.png"),
            title: browser.i18n.getMessage("extensionName"),
            message: browser.i18n.getMessage("copySuccess")
          });
        }
      }, function() {
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

// Listen for keyboard shortcut command
browser.commands.onCommand.addListener((command) => {
  if (command === "toggle-feature") {
    listTabs();
  }
});

// Initialize extension
function init() {
  // Register any listeners needed at startup
  console.log("Firefox Tab Manager initialized");
}

// Execute initialization
init();
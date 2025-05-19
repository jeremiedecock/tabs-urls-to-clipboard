# Firefox Tab Manager

A simple Firefox extension to copy the URL of selected tabs to the clipboard as a list in Markdown, HTML, or plain text format.

## Features

- Copy selected tabs' URLs to the clipboard
- Configurable keyboard shortcut (default: Ctrl+Shift+U)
- Format options: Markdown, HTML, or plain text
- Option to include or exclude tab titles
- Customizable notifications
- Multilingual support (EN, FR)

## Installation

### From the Mozilla Add-ons Store (recommended)

1. Visit the extension page on [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/firefox-tab-manager/)
2. Click on "Add to Firefox"
3. Confirm the installation when prompted

### Manual Installation (development)

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click on "This Firefox"
4. Click on "Load Temporary Add-on..."
5. Select the `manifest.json` file in the extension folder

## Usage

### Via Keyboard Shortcut

1. Select the tabs you want to copy the URLs from (hold Ctrl or Shift for multiple selection)
2. Press Ctrl+Shift+U (or the shortcut you've configured)
3. The URLs are copied to your clipboard in the configured format

### Via the Extension Icon

1. Select the tabs you want to copy the URLs from
2. Click on the extension icon in the toolbar
3. Click on the "Copy selected tabs" button

## Customization Options

1. Click on the extension icon
2. Click on the gear icon (⚙️) or go to about:addons and find the extension options
3. Customize according to your preferences:
   - Output format (Markdown, HTML, plain text)
   - Tab title inclusion
   - Notification display

## License

MIT

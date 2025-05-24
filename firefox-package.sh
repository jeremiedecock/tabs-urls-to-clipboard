#!/bin/bash

# Script to package the Tabs' URLs to Clipboard extension for submission
# Created on: May 19, 2025
# Author: Jérémie Decock

echo "Creating the extension package for Firefox..."

# Check if we're in the correct directory
if [ ! -f "manifest.json" ]; then
    echo "Error: This script must be executed from the extension's root directory (containing manifest.json)."
    exit 1
fi

# Remove the old ZIP file if it exists
if [ -f "../tabs-urls-to-clipboard.zip" ]; then
    echo "Removing previous package..."
    rm ../tabs-urls-to-clipboard.zip
fi

# Create the ZIP file with all necessary files
echo "Creating new package..."
zip -r ../tabs-urls-to-clipboard.zip . -x "*.git*" -x "*.DS_Store" -x "*__MACOSX*" -x "*.zip" -x "firefox-package.sh"

# Verify that the package was created successfully
if [ -f "../tabs-urls-to-clipboard.zip" ]; then
    echo "Package created successfully: ../tabs-urls-to-clipboard.zip"
    echo "Package size: $(du -h ../tabs-urls-to-clipboard.zip | cut -f1)"
else
    echo "Error creating package."
    exit 1
fi

echo "You can now submit this package to Mozilla Add-ons."
echo "https://addons.mozilla.org/en-US/developers/"
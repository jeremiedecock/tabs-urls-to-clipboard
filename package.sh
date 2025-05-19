#!/bin/bash

# Script to package the Firefox Tab Manager extension for submission
# Created on: May 19, 2025
# Author: JD

echo "Creating Firefox Tab Manager package..."

# Check if we're in the correct directory
if [ ! -f "manifest.json" ]; then
    echo "Error: This script must be executed from the extension's root directory (containing manifest.json)."
    exit 1
fi

# Remove the old ZIP file if it exists
if [ -f "../firefox-tab-manager.zip" ]; then
    echo "Removing previous package..."
    rm ../firefox-tab-manager.zip
fi

# Create the ZIP file with all necessary files
echo "Creating new package..."
zip -r ../firefox-tab-manager.zip . -x "*.git*" -x "*.DS_Store" -x "*__MACOSX*" -x "*.zip" -x "package.sh"

# Verify that the package was created successfully
if [ -f "../firefox-tab-manager.zip" ]; then
    echo "Package created successfully: ../firefox-tab-manager.zip"
    echo "Package size: $(du -h ../firefox-tab-manager.zip | cut -f1)"
else
    echo "Error creating package."
    exit 1
fi

echo "You can now submit this package to Mozilla Add-ons."
echo "https://addons.mozilla.org/en-US/developers/"
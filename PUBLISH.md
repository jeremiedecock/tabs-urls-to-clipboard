# How to Publish the Extension on the Mozilla Add-ons Store

Documentation:
- https://extensionworkshop.com/documentation/publish/
- https://extensionworkshop.com/documentation/publish/firefox-add-on-distribution-agreement/
- https://extensionworkshop.com/documentation/publish/add-on-policies/
- https://extensionworkshop.com/documentation/publish/package-your-extension/
- https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/


## Package Preparation

1. Make sure your code is ready and tested
2. Verify that your manifest.json is up to date and contains all required information
3. Create a ZIP file containing all extension files:

```bash
zip -r tabs-urls-to-clipboard.zip . -x "*.git*" -x "*.DS_Store" -x "*__MACOSX*"
```

## Extension Submission

1. Create an account on [Mozilla Add-ons Developer Hub](https://addons.mozilla.org/en-US/developers/)
2. Log in and click on "Submit a New Add-on"
3. Follow the instructions to upload your ZIP file
4. Fill in the required information:
   - Extension name
   - Short and long descriptions
   - Category
   - Screenshots (at least one is recommended)
   - Support and privacy policy URLs (if applicable)
5. Submit your extension for review

## Review Process

1. Your extension will be reviewed by the Mozilla team
2. The process usually takes between a few days and a few weeks
3. If issues are detected, you will receive an email with details
4. Once approved, your extension will be published on the Mozilla Add-ons Store

## Updates

To update your extension:
1. Modify your code and increment the version number in `manifest.json`
2. Create a new ZIP file
3. Access your extension in the Developer Hub
4. Submit the new version
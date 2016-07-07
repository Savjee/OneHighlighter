#!/bin/bash

##
# CONFIG
##
APP_PATH="build/OneHighlighter-mas-x64/OneHighlighter.app"
RESULT_PATH="build/OneHighlighter.pkg"
INSTALLER_KEY="3rd Party Mac Developer Installer: Xavier Decuyper (KN76H2AC7V)"


##
# First package the app
##
electron-packager src/ OneHighlighter --platform=mas --arch=x64 --icon=designs/icon.icns --app-bundle-id=be.savjee.onehighlighter --overwrite --build-version="1.0.0" --app-version=1.0.0 --out=build/

##
# Fix the permissions
##
cd "$APP_PATH/Contents/Resources/" && find . -type f -exec chmod 664 {} \;

##
# Now sign it
##
cd ../../../../../
electron-osx-sign "$APP_PATH"

##
# Build a package for MAS
##
productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
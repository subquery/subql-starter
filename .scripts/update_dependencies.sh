#!/bin/bash

# Root directory
ROOT_DIR="."

# Dependency to add
DEPENDENCY_NAME="@subql/node"
DEPENDENCY_VERSION="latest"

# Loop through each project directory
for PROJECT_DIR in "$ROOT_DIR"/*/**/; do
  PACKAGE_JSON="$PROJECT_DIR/package.json"

  if [ -f "$PACKAGE_JSON" ]; then
    # Check if "@subql/node": "latest" is already in devDependencies
    if ! grep -q "\"$DEPENDENCY_NAME\": \"$DEPENDENCY_VERSION\"" "$PACKAGE_JSON"; then
      # Added dependencies to devDependencies
      jq --arg DEPENDENCY_NAME "$DEPENDENCY_NAME" --arg DEPENDENCY_VERSION "$DEPENDENCY_VERSION" \
        '.devDependencies[$DEPENDENCY_NAME] = $DEPENDENCY_VERSION' "$PACKAGE_JSON" > tmp.json && mv tmp.json "$PACKAGE_JSON"
      echo "Added \"$DEPENDENCY_NAME\": \"$DEPENDENCY_VERSION\" to $PACKAGE_JSON"
    else
      echo "\"$DEPENDENCY_NAME\": \"$DEPENDENCY_VERSION\" already exists in $PACKAGE_JSON"
    fi
  else
    echo "No package.json found in $PROJECT_DIR"
  fi
done

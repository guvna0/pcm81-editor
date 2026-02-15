# 4. Where is the Code?

If you want to look at the code or make changes, here is a simple map of the folders.

## Vital Folders

- **`src/`** (Source): This is where almost all the code lives.
  - **`src/renderer/`**: The code for what you _see_ in the window (buttons, knobs, colors). This is React code.
  - **`src/main/`**: The "backend" code that talks to the computer system (like opening files or MIDI).
- **`dist/`** (Distribution): The computer creates this folder when you run the program. You can ignore it.
- **`node_modules/`**: This folder contains thousands of small code libraries downloaded from the internet. **Never touch this folder!** It is managed automatically.

## Important Files

- **`package.json`**: This is the "ID card" for the project. It lists the project name and all the other libraries it needs.
- **`README.md`**: The main cover page for the project.

## Making Changes

If you want to change the text or colors, you will mostly be working inside `src/renderer`. The file changes will appear in the app immediately if it is running!

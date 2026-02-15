# 2. Setup

Before you can run the program, you need to set up your computer. You only need to do this once.

## Step 1: Install Node.js

This program is built with Node.js. If you haven't installed it yet:

1. Go to [nodejs.org](https://nodejs.org/).
2. Download the "LTS" (Long Term Support) version for your Mac.
3. Run the installer and follow the prompts.

## Step 2: Open the Terminal

1. If you have VSCode installed, you can open the Terminal by:
   - Pressing `Control + Shift + P` on your keyboard.
   - Type `focus on terminal view` and press Enter.
2. If you don't have VSCode, you can open the Terminal by:
   - Pressing the Windows key on your keyboard to open the Run dialog.
   - Type `cmd` and press Enter.
   - You will see a window with a text prompt.

## Step 3: Go to the Project Folder

If you opened the Terminal using VSCode, it should already be in the right folder.

If you opened the Terminal using the Run dialog, you need to tell the Terminal where this project is located.
Type the following command and press Enter:

```bash
cd "path/to/folder/pcm81-editor"
```

## Step 4: Install Dependencies

The program needs some extra code libraries to work. These are called "dependencies".
Type this command and press Enter:

```bash
npm install
```

You will see a lot of text scrolling by. This is normal! Wait until it stops and gives you the prompt again.

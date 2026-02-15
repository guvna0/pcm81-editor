# 3. Running the Program

Once you have finished the setup, you can run the program anytime.

## How to Start

1. Open your **Terminal**.
2. Navigate to the project folder (if you aren't there already):
   ```bash
   cd "path/to/folder/pcm81-editor"
   ```
3. Type this command and press Enter:
   ```bash
   npm run dev
   ```

"npm run dev" stands for **Development Mode**. This starts the program in a special mode where if you change any code, the app updates instantly.

## What Happens Next?

- A new window should pop up. That is the PCM81 Editor!
- You should see controls like knobs and buttons.
- You can now use the program.

## How to Stop

When you are done:

1. Close the Editor window.
2. Go back to your Terminal window.
3. Press `Control + C` on your keyboard to stop the background process.

## Troubleshooting

- **Error: "command not found"**: This usually means Node.js is not installed. See the Setup guide.
- **Error: "address already in use"**: This means the program might already be running in another terminal window. Close other terminals and try again.

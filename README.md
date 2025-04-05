# Start Homework - Retro Edition

A gamified, retro-styled homework experience built with Next.js and TypeScript. The app simulates an old computer system where users interact with a malfunctioning AI assistant to complete homework assignments.

## Features

- 🎮 Retro-styled interface with CRT effects
- 🤖 Comical AI assistant that needs "motivation"
- 📝 Three goofy homework assignments
- 🔊 Retro sound effects
- 🎨 Authentic old-school UI elements
- 📱 Mobile-responsive design
- ⌨️ Letter-by-letter typing animation
- 🔄 Review system with wrong and correct answers

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/start-homework.git
cd start-homework
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Add sound effects:
Place the following sound files in the `public/sounds` directory:
- `boot.mp3` - System boot sound
- `whip.mp3` - Whip sound effect
- `typing.mp3` - Keyboard typing sound
- `review.mp3` - Answer review sound

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Click the "Start Homework" button to begin the boot sequence
2. After loading, you'll see three homework assignments
3. Click on an assignment to open it
4. The AI will start typing an answer (which will likely be wrong)
5. Click "Review Answer" to check if the answer is correct
6. If wrong, whip the AI and try again
7. After whipping the AI enough times (3-5), it will eventually give the correct answer

## Technologies Used

- Next.js 14
- TypeScript
- TailwindCSS
- Framer Motion
- Howler.js

## Project Structure

```
start-homework/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── Desktop.tsx
│   └── styles/
├── public/
│   └── sounds/
└── package.json
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
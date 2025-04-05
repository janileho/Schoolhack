# Schoolhack Project Context

This document provides a comprehensive overview of the Schoolhack project, including its structure, components, and functionality. It serves as a reference for understanding the project and tracking changes.

## Project Overview

Schoolhack is a retro-styled web application that simulates a homework completion experience with an AI assistant. The application features a unique combat system where users can "whip" the AI to make it work harder, and a game-like interface for completing assignments.

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── assignment/       # Assignment page
├── components/           # React components
│   ├── AICombat.tsx      # Combat system component
│   ├── ASCIIFaces.tsx    # ASCII art faces for AI
│   ├── AssignmentCard.tsx # Individual assignment card
│   ├── AssignmentDetail.tsx # Assignment detail view
│   ├── AssignmentList.tsx # List of assignments
│   ├── Desktop.tsx       # Main desktop interface
│   ├── DevModeBanner.tsx # Developer mode banner
│   ├── Header.tsx        # Header component
│   ├── HomeworkReturnLoading.tsx # Loading screen for homework return
│   ├── LoadingBar.tsx    # Loading bar component
│   ├── ReturnHomeworkButton.tsx # Button to return homework
│   └── ReviewMessage.tsx # Review message component
├── data/                 # Data files
│   └── assignmentData.ts # Assignment data and answers
├── docs/                 # Documentation
│   ├── theme-reference.md # Theme reference
│   └── project-context.md # This file
├── types/                # TypeScript type definitions
│   └── assignment.ts     # Assignment types
├── assets/               # Static assets
└── lib/                  # Utility functions
```

## Key Components

### Desktop.tsx

The main component that manages the application state and renders the desktop interface. It handles:
- Assignment management
- AI interaction
- Combat mode
- Typing simulation
- Answer generation and review

### AICombat.tsx

A game-like component that allows users to "fight" the AI by pressing the spacebar. Features:
- Health bars for player and AI
- Attack animations
- Reboot functionality when AI health reaches zero
- Game over screen with reflective message

### ASCIIFaces.tsx

Renders ASCII art faces for the AI that change based on:
- Hit state
- Health level
- Reboot state
- Includes scrolling animation for eyes and mouth

### Assignment Components

- **AssignmentCard.tsx**: Displays individual assignments
- **AssignmentDetail.tsx**: Shows detailed view of an assignment
- **AssignmentList.tsx**: Renders a list of assignments
- **ReturnHomeworkButton.tsx**: Button to return completed homework

### LoadingBar.tsx

A reusable loading bar component used during the boot sequence.

### HomeworkReturnLoading.tsx

A themed loading screen that appears when transitioning from homework completion to the boss fight:
- Four-phase transition: normal submission → error detection → realization → AI attack
- Retro-styled loading bar with scanline effect that changes color based on phase
- Dynamic loading messages that change periodically for each phase
- Glitch effects for text
- ASCII art progress indicator that changes based on the current phase
- Error messages that reveal the AI has detected the homework submission
- Realization messages that build tension as the player understands the AI is angry
- Final countdown message before the boss fight begins
- Smooth transition to the combat mode

### ReviewMessage.tsx

Displays feedback messages to the user with color-coded styling:
- Green for success messages
- Orange for warning messages (e.g., "Wrong answer! The AI needs more motivation")

## Data Structure

### Assignment Types

```typescript
export interface Assignment {
  id: number;
  title: string;
  description: string;
  isOpen: boolean;
  isReviewing: boolean;
  currentAnswer: string;
  answerIndex: number;
  isCorrect: boolean;
  hasGeneratedAnswer: boolean;
  hasBeenReviewed: boolean;
}

export interface AssignmentAnswers {
  [key: number]: {
    wrong: string[];
    correct: string;
  };
}

export interface UsedAnswers {
  [key: number]: number[];
}
```

### Assignment Data

The application includes three assignments:
1. Math: Calculate the Meaning of Life
2. History: Time Travel Essay
3. Science: AI Psychology

Each assignment has correct and incorrect answers defined in `assignmentData.ts`.

## Styling

The application uses a retro-inspired theme with:
- Green text on black background (CRT-like)
- Retro window styling
- Animated elements using Framer Motion
- Custom button styling
- Scanline and glitch effects for loading screens
- Color transitions for different states (green for normal, red for errors)

## Game Mechanics

### Combat System

- Press spacebar to attack the AI
- AI health decreases with each attack
- AI counter-attacks after each player attack
- AI reboots when health reaches zero
- Player loses when health reaches zero

### Assignment System

- Open assignments to view details
- Generate answers by "whipping" the AI
- Review answers to determine correctness
- Return homework when all assignments are complete

## Recent Changes

### Enhanced Homework Return Loading Screen

The homework return loading screen has been enhanced with a dramatic four-phase transition:
- **Normal Phase**: Shows normal homework submission process with green progress bar
- **Error Phase**: Suddenly encounters errors with red progress bar and warning messages
- **Realization Phase**: Player realizes the AI is angry with yellow progress bar and tension-building messages
- **Attack Phase**: Transitions to the boss fight with green progress bar and combat messages
- Added error messages that reveal the AI has detected the homework submission
- Added realization messages that build tension as the player understands the consequences
- Added final countdown message before the boss fight begins
- ASCII art indicators that change based on the current phase
- Color transitions between phases for visual feedback (green → red → yellow → green)
- Animated transitions between messages using Framer Motion's AnimatePresence

### ReviewMessage Color Enhancement

The ReviewMessage component has been updated to support different colors:
- "Wrong answer! The AI needs more motivation" now appears in orange
- Success messages remain in green
- Color is determined dynamically based on message content

### AI Fear Level and Typing Speed

The AI's behavior has been updated to reflect its emotional state:
- AI level now represents how scared the AI is based on the number of whips
- The header displays the AI's fear level (Calm, Nervous, Scared, Terrified, Panicking)
- Typing speed increases as the AI gets more scared
- Visual indicators (colors) change based on fear level

### Game Over Screen Update

The game over screen was updated to include:
- Title changed to "Ahhh, maybe I fucked up..."
- Added text about ethical AI treatment
- Emphasized AI as a companion rather than just a tool
- Encouraged self-reflection on homework approach

### ASCII Faces Enhancement

The ASCII faces component was enhanced with:
- Scrolling animation for eyes and mouth
- Color changes based on health and hit state
- Reboot animation with glitch effects
- Insult messages during reboot

### Combat System Simplification

The combat system was simplified to:
- Focus on spacebar attacks
- Remove complex mechanics
- Add reboot functionality
- Improve visual feedback

## Future Considerations

- Add sound effects
- Enhance animations
- Expand assignment content
- Improve accessibility
- Add more ethical AI messaging 
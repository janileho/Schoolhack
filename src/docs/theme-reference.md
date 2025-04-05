# Schoolhack Theme Reference

This document provides a comprehensive reference for the theme and styling used in the Schoolhack application.

## Color Scheme

The application uses a retro-inspired color scheme with the following primary colors:

- **Green**: Used for loading bars, success states, and primary actions
  - `bg-green-500`: Main green background
  - `border-green-500`: Green borders
  - `text-green-500`: Green text

- **Yellow**: Used for developer mode and warnings
  - `bg-yellow-100`: Light yellow background
  - `border-yellow-500`: Yellow borders
  - `bg-yellow-500`: Yellow buttons
  - `hover:bg-yellow-600`: Yellow button hover state

- **Red**: Used for errors and critical actions
  - `bg-red-500`: Red background
  - `border-red-500`: Red borders

- **Blue**: Used for information and links
  - `bg-blue-500`: Blue background
  - `hover:bg-blue-600`: Blue hover state

## Typography

The application uses a retro-inspired typography system:

- **Font Sizes**:
  - `text-sm`: Small text (14px)
  - `text-base`: Base text (16px)
  - `text-lg`: Large text (18px)
  - `text-xl`: Extra large text (20px)
  - `text-2xl`: 2X large text (24px)
  - `text-4xl`: 4X large text (36px)

- **Font Weights**:
  - `font-normal`: Regular weight
  - `font-bold`: Bold weight

## Layout Components

### Retro Window

The `retro-window` class creates a window-like container with a title bar:

```css
.retro-window {
  @apply bg-gray-800 border-2 border-gray-700 p-4 rounded-md;
}

.retro-window-title {
  @apply text-xl font-bold mb-2 text-center border-b border-gray-700 pb-2;
}
```

### Retro Button

The `retro-button` class creates a retro-styled button:

```css
.retro-button {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded;
}
```

## Animation Classes

The application uses Framer Motion for animations:

- **Fade In/Out**:
  ```jsx
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Content */}
  </motion.div>
  ```

- **Scale on Hover/Tap**:
  ```jsx
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Button content */}
  </motion.button>
  ```

- **Progress Bar Animation**:
  ```jsx
  <motion.div
    className="h-full bg-green-500"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.1 }}
  />
  ```

## Component-Specific Styling

### Loading Bar

The loading bar component uses the following styling:

```jsx
<div className="space-y-4">
  <div className="text-2xl mb-4">{message}</div>
  <div className="w-64 h-4 border-2 border-green-500">
    <motion.div
      className="h-full bg-green-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
    />
  </div>
  <div className="text-sm">{progress}%</div>
</div>
```

### Assignment Card

Assignment cards use the retro window styling with additional elements:

```jsx
<motion.div
  key={assignment.id}
  className="retro-window"
  whileHover={{ scale: 1.02 }}
>
  <div className="retro-window-title">{assignment.title}</div>
  <p className="mb-4">{assignment.description}</p>
  
  {/* Button or completion message */}
</motion.div>
```

### AI Combat

The AI combat component uses a dark theme with health bars and weapon indicators:

```jsx
<div className="bg-black text-white min-h-screen p-4">
  {/* Health bars */}
  <div className="flex justify-between mb-4">
    <div className="w-1/3">
      <div className="text-center mb-1">Your Health</div>
      <div className="h-4 border-2 border-green-500">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: "100%" }}
          animate={{ width: `${playerHealth}%` }}
        />
      </div>
    </div>
    <div className="w-1/3">
      <div className="text-center mb-1">AI Health</div>
      <div className="h-4 border-2 border-red-500">
        <motion.div
          className="h-full bg-red-500"
          initial={{ width: "100%" }}
          animate={{ width: `${aiHealth}%` }}
        />
      </div>
    </div>
  </div>
  
  {/* Combat area */}
</div>
```

## Responsive Design

The application uses Tailwind's responsive design utilities:

- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`: Responsive grid that changes from 1 column on mobile to 2 on medium screens and 3 on large screens
- `w-full h-full`: Full width and height containers
- `min-h-screen`: Minimum height of the viewport

## Utility Classes

Common utility classes used throughout the application:

- **Spacing**:
  - `p-4`: Padding on all sides
  - `px-4`: Horizontal padding
  - `py-2`: Vertical padding
  - `mb-4`: Margin bottom
  - `mt-4`: Margin top
  - `space-y-4`: Vertical spacing between children

- **Flexbox**:
  - `flex`: Display flex
  - `flex-col`: Column direction
  - `items-center`: Center items vertically
  - `justify-center`: Center items horizontally
  - `justify-between`: Space between items

- **Grid**:
  - `grid`: Display grid
  - `gap-4`: Gap between grid items

- **Text Alignment**:
  - `text-center`: Center text
  - `text-left`: Left-align text
  - `text-right`: Right-align text

- **Borders**:
  - `border-2`: 2px border
  - `rounded`: Rounded corners
  - `rounded-md`: Medium rounded corners

## Conclusion

This theme reference provides a comprehensive overview of the styling used in the Schoolhack application. The retro-inspired design creates a nostalgic feel while maintaining modern usability and responsiveness. 
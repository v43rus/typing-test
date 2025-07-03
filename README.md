# Typing Test

[Live Preview](https://v43rus.github.io/typing-test/)

This project is a cyberpunk-themed typing speed test application. Test your typing skills with a 60-second timer, real-time accuracy tracking, and a futuristic visual experience complete with animated background video and cyberpunk effects. Built with vanilla JavaScript, HTML, and CSS.

## Features

- **60-Second Typing Test:** Standard one-minute typing challenge with live timer countdown.
- **Real-time WPM Calculation:** Displays words per minute with error adjustment for accurate results.
- **Live Visual Feedback:** Cyberpunk-style highlighting for correct/incorrect characters with glitch effects.
- **Error Tracking:** Real-time error counting that affects final WPM score.
- **Randomized Word Pool:** Uses a curated JSON file with 250+ words, shuffled for each test.
- **Animated Background:** Dynamic video background for immersive experience.
- **Custom Typography:** Features CoubraFont for authentic cyberpunk aesthetics.
- **Mobile Detection:** Automatically detects mobile devices and displays desktop-only message.
- **Responsive Design:** Optimized for desktop browsers with smooth scrolling text display.

## Getting Started

No installation is required—simply download the files and open `index.html` in your browser.

### To run locally

1. Clone or download the repository files
2. Ensure all files are in the same directory:
   - `index.html`
   - `script.js`
   - `style.css`
   - `words.json`
   - `bg.mp4`
   - `CoubraFont-Demo.otf`
   - `favicon.png`
3. Open `index.html` in your browser

## Usage

- **Start typing** to begin the 60-second timer automatically
- **Backspace** to correct mistakes (affects your accuracy score)
- **Try Again** button appears after time expires to reset the test
- View your final **WPM score** which factors in typing speed and accuracy

## Technical Implementation

### Core Technologies
- **Vanilla JavaScript:** Pure JS for all functionality, no external libraries
- **HTML5:** Semantic markup with video background support
- **CSS3:** Advanced styling with gradients, animations, and custom fonts

### Key Features
- **Dynamic Text Rendering:** Characters are wrapped in spans for individual styling
- **Async Word Loading:** JSON file loading with fallback word array
- **Scroll Management:** Automatic horizontal scrolling as user progresses
- **Timer System:** Precise countdown with automatic test termination
- **Animation Effects:** CSS keyframe animations for cyberpunk aesthetic

### Performance Optimizations
- **Efficient DOM Manipulation:** Minimal reflows with targeted element updates
- **Memory Management:** Proper cleanup of intervals and event listeners
- **Error Handling:** Graceful fallbacks for failed resource loading

## File Structure

```
typing-test/
├── index.html          # Main HTML structure
├── script.js           # Core typing test logic
├── style.css          # Cyberpunk-themed styling
├── words.json         # Word pool for randomization
├── bg.mp4            # Background video
├── CoubraFont-Demo.otf # Custom cyberpunk font
├── favicon.png       # Site icon
└── README.md         # Project documentation
```

## Browser Compatibility

- **Chrome/Edge:** Full support with optimal performance
- **Firefox:** Full support with smooth animations
- **Safari:** Compatible with all core features
- **Mobile:** Displays desktop-only message (intentional limitation)

---

Made with ❤️ using vanilla JavaScript, HTML, CSS, and cyberpunk aesthetics

# Love in Air 💕

A beautiful, minimal frontend-only website with a romantic and modern theme. Experience dreamy animations, a 3D music carousel, and an elegant custom cursor.

## ✨ Features

- **Dreamy Animated Background**: Soft, floating gradient blobs with smooth animations
- **3D Music Carousel**: Interactive card stack with smooth transitions and glowing effects
- **Custom Cursor**: Elegant glowing circle cursor with pulse and ripple effects
- **Romantic Design**: Beautiful color palette with blush pink, lavender, and plum
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **No Backend**: Pure frontend demo - no login or server required

## 🎨 Design Elements

- **Colors**: Blush Pink (#FFC0CB), Lavender (#E6E6FA), Deep Plum (#673147), Soft White (#F8F8FF)
- **Fonts**: Google Fonts - Great Vibes, Dancing Script, Parisienne
- **Animations**: Smooth blob animations, card transitions, and cursor effects
- **Layout**: Centered 3D carousel with overlapping music cards

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd love_in_air
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## 🎵 How to Use

- **Navigate Cards**: Click the left/right arrow buttons or click directly on cards
- **Play Music**: Click the play/pause button on any card
- **Watch Progress**: Each card shows a simulated progress bar
- **Enjoy Cursor**: Move your mouse to see the custom glowing cursor

## 🛠️ Technologies Used

- **React 19**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework
- **Vanilla JavaScript**: Custom cursor and animations
- **Google Fonts**: Romantic typography
- **Unsplash Images**: Beautiful placeholder images

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color palette:
```javascript
colors: {
  blush: '#FFC0CB',
  lavender: '#E6E6FA',
  plum: '#673147',
  softwhite: '#F8F8FF',
}
```

### Music Cards
Add or modify songs in `src/App.js`:
```javascript
const songs = [
  {
    title: 'Your Song Title',
    artist: 'Artist Name',
    image: 'image-url-here',
  },
  // ... more songs
];
```

### Animations
Customize animations in `tailwind.config.js`:
```javascript
keyframes: {
  blob: {
    '0%, 100%': { transform: 'translateY(0) scale(1)' },
    '50%': { transform: 'translateY(-20px) scale(1.1)' },
  },
}
```

## 🌟 Features in Detail

### Animated Background
- Three floating gradient blobs with different sizes and colors
- Smooth up-and-down animation with scaling effects
- Staggered animation delays for natural movement

### Music Carousel
- 5 music cards in a 3D stacked layout
- Active card is centered with glow effect
- Side cards are scaled down and positioned
- Smooth transitions between cards

### Custom Cursor
- Glowing circle with soft pink border
- Pulse effect on hover over interactive elements
- Ripple animation on click
- Automatically disabled on touch devices

### Progress Simulation
- Each card has a progress bar that fills when "playing"
- Progress resets when song completes
- Only one song can play at a time

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Made with 💕 for romantic souls who love beautiful design and smooth interactions. 
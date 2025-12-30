# Games Icons

This directory contains games/sports/recreation icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2011:3237&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select a games icon in Figma (e.g., Basketball, GameController, Trophy)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `Basketball.svg`, `GameController.svg`, `Trophy.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "Games" group in Figma
2. Right-click → **Export Selection**
3. Choose **SVG** format
4. Figma will export all icons with their original names
5. Move all exported files to this directory

### Export Settings

- **Format**: SVG
- **Size**: 32x32px (as per design specs)
- **Color**: Use `currentColor` in SVG (for easy theming)
- **Optimization**: Enable "Outline stroke" if available (converts strokes to fills)

### SVG Optimization

After exporting, it's recommended to optimize the SVGs for theming:

```svg
<!-- Before -->
<path fill="#343330" ... />

<!-- After -->
<path fill="currentColor" ... />
```

This allows icons to inherit text color from their parent elements.

## Icon Naming Convention

Icons should be named using PascalCase matching the Figma component names:
- `Basketball.svg`
- `GameController.svg`
- `Trophy.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available games icon names organized by category.

## Games Icon Categories

The games icons are organized into the following categories:

### Sports Equipment & Balls
- Basketball, Baseball, SoccerBall, TennisBall, Volleyball, Football, BowlingBall, BeachBall, Golf, Hockey, Cricket, BaseballHelmet, FootballHelmet, Racquet, PingPong, CourtBasketball, BoxingGlove, Boules

### Gaming Equipment & Controllers
- GameController, Joystick, PuzzlePiece, Checkerboard

### Cards & Dice
- DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix, PokerChip, Spade, Club, Diamond

### Hearts & Emotions
- Heart, HeartBreak, HeartHalf, HeartStraight, HeartStraightBreak, MaskHappy, MaskSad

### Fantasy & Adventure
- Sword, Crown, CrownCross, CrownSimple, TreasureChest, CastleTurret, Ghost, Skull, Alien, FlyingSaucer, Bomb, Scroll, Strategy, Target

### Virtual Reality
- VirtualReality, GoogleCardboardLogo

### Achievements & Awards
- Trophy, Medal, MedalMilitary, Ranking

### Recreation & Activities
- Parachute, PersonSimpleSki, PersonSimpleSnowboard, Horse, TreePalm

### Toys & Fun Items
- Lego, LegoSmiley, Pinwheel, Confetti, DiscoBall, Spiral, FinnTheHuman, CubeFocus, Drone

## Usage Examples

```tsx
import Icon from "@/components/Icon";

// Basic usage with auto-detection
<Icon name="Basketball" size="md" />

// Explicit category
<Icon name="GameController" category="games" size="lg" />

// With custom styling
<Icon 
  name="Trophy" 
  size={32} 
  className="text-yellow-500" 
/>
```

## Theming

Games icons use `currentColor` by default, allowing them to inherit text color from their parent elements:

```tsx
// Icon will be blue
<div className="text-blue-500">
  <Icon name="Basketball" size="md" />
</div>
```

## Notes

- All icons are 32x32px by default
- Icons can be scaled using the `size` prop (sm, md, lg, xl, or a number)
- Icons maintain aspect ratio when resizing
- Use `inline={true}` (default) for theming support with `currentColor`
- Use `inline={false}` if you need to use the Next.js Image component


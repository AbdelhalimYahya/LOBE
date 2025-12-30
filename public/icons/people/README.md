# People Icons

This directory contains people, user, and human-related icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2012:3243&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select a people icon in Figma (e.g., User, Person, Hand)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `User.svg`, `Person.svg`, `Hand.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "People" group in Figma
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
- `User.svg`
- `Person.svg`
- `Hand.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available people icon names organized by category.

## People Icon Categories

The people icons are organized into the following categories:

### Users
Users, UsersFour, UsersThree

### User
User, UserCheck, UserCircle, UserCircleCheck, UserCircleDashed, UserCircleGear, UserCircleMinus, UserCirclePlus, UserFocus, UserGear, UserList, UserMinus, UserPlus, UserRectangle, UserSound, UserSquare, UserSwitch

### Person
Person, PersonArmsSpread

### PersonSimple
PersonSimple, PersonSimpleBike, PersonSimpleCircle, PersonSimpleHike, PersonSimpleRun, PersonSimpleSwim, PersonSimpleTaiChi, PersonSimpleThrow, PersonSimpleWalk

### Smiley
Smiley, SmileyAngry, SmileyBlank, SmileyMeh, SmileyMelting, SmileyNervous, SmileySad, SmileySticker, SmileyWink, SmileyXEyes

### Hand
Hand, HandArrowDown, HandArrowUp, HandDeposit, HandEye, HandFist, HandGrabbing, HandPalm, HandPeace, HandPointing, HandWaving, HandWithdraw

### Hands
HandsClapping, HandsPraying, Handshake

### Gender
GenderFemale, GenderIntersex, GenderMale, GenderNeuter, GenderNonbinary, GenderTransgender

### Identification
IdentificationBadge, IdentificationCard

### Wheelchair
Wheelchair, WheelchairMotion

### Other
Baby, Eyes, Footprints

## Usage Examples

```tsx
import Icon from "@/components/Icon";

// Basic usage with auto-detection
<Icon name="User" size="md" />

// Explicit category
<Icon name="Person" category="people" size="lg" />

// With custom styling
<Icon 
  name="Hand" 
  size={32} 
  className="text-blue-500" 
/>
```

## Theming

People icons use `currentColor` by default, allowing them to inherit text color from their parent elements:

```tsx
// Icon will be blue
<div className="text-blue-500">
  <Icon name="User" size="md" />
</div>
```

## Notes

- All icons are 32x32px by default
- Icons can be scaled using the `size` prop (sm, md, lg, xl, or a number)
- Icons maintain aspect ratio when resizing
- Use `inline={true}` (default) for theming support with `currentColor`
- Use `inline={false}` if you need to use the Next.js Image component


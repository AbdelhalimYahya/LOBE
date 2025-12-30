# Time Icons

This directory contains time-related icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2014-3246&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select a time icon in Figma (e.g., Clock, Calendar, Timer)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `Clock.svg`, `Calendar.svg`, `Timer.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "Time" group in Figma
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
- `Clock.svg`
- `Calendar.svg`
- `Timer.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available time icon names organized by category.

## Time Icon Categories

### Clock
Clock, ClockAfternoon, ClockClockwise, ClockCounterClockwise, ClockCountdown, ClockUser

### Hourglass
Hourglass, HourglassHigh, HourglassLow, HourglassMedium, HourglassSimple, HourglassSimpleHigh, HourglassSimpleLow, HourglassSimpleMedium

### Calendar
Calendar, CalendarBlank, CalendarCheck, CalendarDot, CalendarDots, CalendarHeart, CalendarMinus, CalendarPlus, CalendarSlash, CalendarStar, CalendarX

### Other Time
Alarm, Timer, Watch

## Usage Examples

```tsx
import Icon from "@/components/Icon";

// Basic usage with auto-detection
<Icon name="Clock" size="md" />

// Explicit category
<Icon name="Calendar" category="time" size="lg" />

// With custom styling
<Icon 
  name="Timer" 
  size={32} 
  className="text-primary-500" 
/>
```

## Theming

Time icons use `currentColor` by default, allowing them to inherit text color from their parent elements:

```tsx
// Icon will be blue
<div className="text-blue-500">
  <Icon name="Clock" size="md" />
</div>

// Icon will be red
<div className="text-red-500">
  <Icon name="Alarm" size="md" />
</div>
```

## Notes

- All icons are 32x32px by default
- Icons can be scaled using the `size` prop (sm, md, lg, xl, or a number)
- Icons maintain aspect ratio when resizing
- Use `inline={true}` (default) for theming support with `currentColor`
- Use `inline={false}` if you need to use the Next.js Image component


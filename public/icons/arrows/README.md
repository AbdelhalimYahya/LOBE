# Arrow Icons

This directory contains arrow icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2009-3231&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select an icon in Figma
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `CaretUp.svg`, `ArrowRight.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "Arrows icons" group/frame
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

After exporting, ensure SVG files use `currentColor` for the fill/stroke:

```svg
<!-- Before -->
<path fill="#343330" ... />

<!-- After -->
<path fill="currentColor" ... />
```

This allows icons to inherit text color from their parent elements.

## Icon Naming Convention

Icons should be named using PascalCase matching the Figma component names:
- `CaretUp.svg`
- `ArrowRight.svg`
- `ArrowsMerge.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available icon names.


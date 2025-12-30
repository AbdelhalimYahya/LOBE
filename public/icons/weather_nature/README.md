# Weather & Nature Icons

This directory contains weather and nature-related icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2014-3247&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select a weather or nature icon in Figma (e.g., Cloud, Sun, Tree, Bird)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `Cloud.svg`, `Sun.svg`, `Tree.svg`, `Bird.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "weather_nature" group in Figma
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
- `Cloud.svg`
- `Sun.svg`
- `Tree.svg`
- `Bird.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available weather & nature icon names organized by category.

## Weather & Nature Icon Categories

### Weather
Cloud, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Rainbow, RainbowCloud, Sun, SunDim, SunHorizon, Moon, MoonStars, Thermometer, ThermometerCold, ThermometerHot, ThermometerSimple, Tornado, Hurricane, Wind, Waves, Snowflake, Drop, DropSimple, Umbrella, UmbrellaSimple, Flame, Fire, FireSimple

### Nature & Plants
Tree, TreeEvergreen, Leaf, Flower, FlowerLotus, FlowerTulip, Plant, Clover, Cactus, Acorn, Log

### Animals
Bird, Butterfly, Cat, Cow, Dog, Fish, FishSimple, PawPrint, Rabbit, Shrimp

### Celestial & Space
Atom, Meteor, Planet, ShootingStar, Sparkle, StarFour

### Landscape
Island, Mountains

### Other
Bone, Campfire, Feather

## Usage Examples

```tsx
import Icon from "@/components/Icon";

// Basic usage with auto-detection
<Icon name="Cloud" size="md" />

// Explicit category
<Icon name="Sun" category="weather" size="lg" />

// With custom styling
<Icon 
  name="Tree" 
  size={32} 
  className="text-green-500" 
/>
```

## Theming

Weather & nature icons use `currentColor` by default, allowing them to inherit text color from their parent elements:

```tsx
// Icon will be blue
<div className="text-blue-500">
  <Icon name="Cloud" size="md" />
</div>

// Icon will be yellow
<div className="text-yellow-500">
  <Icon name="Sun" size="md" />
</div>

// Icon will be green
<div className="text-green-500">
  <Icon name="Tree" size="md" />
</div>
```

## Notes

- All icons are 32x32px by default
- Icons can be scaled using the `size` prop (sm, md, lg, xl, or a number)
- Icons maintain aspect ratio when resizing
- Use `inline={true}` (default) for theming support with `currentColor`
- Use `inline={false}` if you need to use the Next.js Image component


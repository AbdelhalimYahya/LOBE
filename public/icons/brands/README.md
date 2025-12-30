# Brand Icons

This directory contains brand logo icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2009-3231&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select a brand icon in Figma (e.g., YoutubeLogo, XLogo)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `YoutubeLogo.svg`, `XLogo.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "Brands" group in Figma
2. Right-click → **Export Selection**
3. Choose **SVG** format
4. Figma will export all icons with their original names
5. Move all exported files to this directory

### Export Settings

- **Format**: SVG
- **Size**: 32x32px (as per design specs)
- **Color**: Use `currentColor` in SVG (for easy theming) OR preserve brand colors when appropriate
- **Optimization**: Enable "Outline stroke" if available (converts strokes to fills)

### SVG Optimization

After exporting, you have two options:

#### Option 1: Use currentColor (for theming)
```svg
<!-- Before -->
<path fill="#343330" ... />

<!-- After -->
<path fill="currentColor" ... />
```

#### Option 2: Preserve Brand Colors (for brand recognition)
Some brand icons should maintain their brand colors (e.g., Facebook blue, Instagram gradient). In these cases, keep the original colors.

This allows icons to either inherit text color from their parent elements or display brand colors.

## Icon Naming Convention

Icons should be named using PascalCase matching the Figma component names:
- `YoutubeLogo.svg`
- `XLogo.svg`
- `FacebookLogo.svg`
- `GoogleLogo.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available brand icon names organized by category.

## Brand Icon Categories

- **Social Media & Communication**: YouTube, X, Twitter, WhatsApp, Instagram, Facebook, etc.
- **Google Services**: Google, Chrome, Drive, Photos, Play, Podcasts
- **Microsoft Services**: Windows, Office suite (Word, Excel, PowerPoint, Outlook, Teams)
- **Development & Tech**: GitHub, GitLab, CodePen, CodeSandbox, Figma, Framer, etc.
- **Cloud & Storage**: Dropbox, Stripe
- **Media & Entertainment**: Spotify, SoundCloud, Twitch, Steam, etc.
- **E-commerce & Payment**: PayPal, Amazon, Patreon
- **Productivity & Tools**: Notion, Slack, Skype, Sketch, OpenAI, etc.


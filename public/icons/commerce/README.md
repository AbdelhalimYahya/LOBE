# Commerce Icons

This directory contains commerce/product icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2010-3233&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select a commerce icon in Figma (e.g., ShoppingCart, Wallet, Pizza)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `ShoppingCart.svg`, `Wallet.svg`, `Pizza.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "Commerce" group in Figma
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

After exporting, replace fixed colors with `currentColor` for theming:

```svg
<!-- Before -->
<path fill="#343330" ... />

<!-- After -->
<path fill="currentColor" ... />
```

This allows icons to inherit text color from their parent elements, making them easy to theme.

## Icon Naming Convention

Icons should be named using PascalCase matching the Figma component names:
- `ShoppingCart.svg`
- `ShoppingBag.svg`
- `Wallet.svg`
- `Pizza.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available commerce icon names organized by category.

## Commerce Icon Categories

### Clothing & Fashion
- TShirt, Sunglasses, Sock, SneakerMove, Sneaker, ShirtFolded, Pants

### Shopping & Retail
- Storefront, ShoppingCartSimple, ShoppingCart, ShoppingBagOpen, ShoppingBag, ToteSimple, Tote, TagSimple, TagChevron, Tag, ReceiptX, Receipt, Package, Wallet

### Tools & Hardware
- Wrench, Toolbox, Tire, Shovel, Screwdriver, PipeWrench, Pipe

### Food & Beverage
- Wine, TeaBag, Popsicle, Popcorn, Pizza, PintGlass, Pepper, OrangeSlice, Orange

### Home & Furniture
- Windmill, WashingMachine, Warehouse, Towel, Stool, Stairs, SolarRoof, SolarPanel, Shower, Rug, PottedPlant, PicnicTable, Oven

### Transportation
- TruckTrailer, Tractor, Seatbelt

### Miscellaneous
- Yarn, TipJar, Ticket, TrademarkRegistered, Trademark, Scales, PixLogo, PiggyBank

## Usage

```tsx
import Icon from "@/components/Icon";

// Commerce icons are automatically detected
<Icon name="ShoppingCart" size="md" />
<Icon name="Wallet" size="lg" className="text-primary-500" />

// Or explicitly specify category
<Icon name="Pizza" category="commerce" size="xl" />
```

## Icon Specifications

- **Size**: 32x32px (can be scaled via CSS/Tailwind classes)
- **Default Color**: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
- **Stroke Weight**: 0.125 (very fine line weight)

## Notes

- Icons use `currentColor` for easy theming via Tailwind classes
- Icons maintain aspect ratio when resizing
- All icons are optimized for inline SVG usage with color inheritance


# Design Icons

This directory contains design/design tool icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2011-3234&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select a design icon in Figma (e.g., Pencil, Circle, PaintBrush)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `Pencil.svg`, `Circle.svg`, `PaintBrush.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "Design" group in Figma
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
- `Pencil.svg`
- `Circle.svg`
- `PaintBrush.svg`
- `AlignTop.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available design icon names organized by category.

## Design Icon Categories

### Basic Shapes
- Circle, CircleDashed, CircleHalf, CircleHalfTilt, CircleNotch
- Square, SquareHalf, SquareHalfBottom, SquareSplitHorizontal, SquareSplitVertical
- Rectangle, RectangleDashed
- Triangle, TriangleDashed
- Polygon, Pentagon, Pentagram, Hexagon, Octagon, Parallelogram
- Sphere, Cube, CubeTransparent, Cylinder

### Drawing & Pen Tools
- Pencil, PencilCircle, PencilLine, PencilRuler, PencilSimple, PencilSimpleLine, PencilSimpleSlash, PencilSlash
- Pen, PenNib, PenNibStraight
- Eraser
- Highlighter, HighlighterCircle
- MarkerCircle

### Paint & Color Tools
- PaintBrush, PaintBrushBroad, PaintBrushHousehold
- PaintBucket, PaintRoller
- Palette, Swatches
- Eyedropper, EyedropperSample
- Gradient
- SprayBottle

### Selection Tools
- Selection, SelectionAll, SelectionBackground, SelectionForeground, SelectionInverse, SelectionPlus, SelectionSlash
- Lasso
- BoundingBox

### Layout & Grid
- Layout
- GridFour, GridNine
- SquaresFour
- Columns, ColumnsPlusLeft, ColumnsPlusRight
- Rows, RowsPlusBottom, RowsPlusTop
- Sidebar, SidebarSimple
- Stack, StackMinus, StackPlus, StackSimple

### Alignment
- AlignBottom, AlignBottomSimple
- AlignCenterHorizontal, AlignCenterHorizontalSimple
- AlignCenterVertical, AlignCenterVerticalSimple
- AlignLeft, AlignLeftSimple
- AlignRight, AlignRightSimple
- AlignTop, AlignTopSimple

### Transform & Edit
- Resize
- FlipHorizontal, FlipVertical
- Crop
- Ruler
- Scissors
- Placeholder
- Blueprint
- Perspective

### Path Operations
- Unite, UniteSquare
- Subtract, SubtractSquare
- Intersect, IntersectSquare, IntersectThree
- Exclude, ExcludeSquare

### Line & Curve Tools
- LineSegment, LineSegments, LineVertical
- BezierCurve
- Scribble, ScribbleLoop

### Shape Groups & Patterns
- Shapes
- CirclesThree, CirclesThreePlus, CirclesFour
- DiamondsFour
- Notches

### Special Tools
- MagicWand
- CompassTool
- Angle
- Stamp
- Vignette
- TextAUnderline

### Split & Drop
- SplitHorizontal, SplitVertical
- DropHalf, DropHalfBottom, DropSlash

### View & Display
- Eye, EyeClosed, EyeSlash

## Usage

```tsx
import Icon from "@/components/Icon";

// Design icons are automatically detected
<Icon name="Pencil" size="md" />
<Icon name="Circle" size="lg" className="text-primary-500" />

// Or explicitly specify category
<Icon name="PaintBrush" category="design" size="xl" />
```

## Icon Specifications

- **Size**: 32x32px (can be scaled via CSS/Tailwind classes)
- **Default Color**: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
- **Stroke Weight**: 0.125 (very fine line weight)

## Notes

- Icons use `currentColor` for easy theming via Tailwind classes
- Icons maintain aspect ratio when resizing
- All icons are optimized for inline SVG usage with color inheritance


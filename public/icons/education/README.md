# Education Icons

This directory contains education/learning icons exported from Figma.

## Exporting Icons from Figma

To export icons from the [Figma design](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=2011-3236&t=venuAvxsjX6XolYc-0):

### Method 1: Export Individual Icons

1. Select an education icon in Figma (e.g., Book, GraduationCap, Student)
2. Right-click → **Export** (or use the Export panel on the right)
3. Choose **SVG** format
4. Click **Export [IconName]**
5. Save the file to this directory with the naming convention: `[IconName].svg` (e.g., `Book.svg`, `GraduationCap.svg`, `Student.svg`)

### Method 2: Batch Export (Recommended)

1. Select the entire "Education" group in Figma
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
- `Book.svg`
- `GraduationCap.svg`
- `Student.svg`
- `Chalkboard.svg`
- etc.

See `lib/design-tokens.ts` for the complete list of available education icon names organized by category.

## Education Icon Categories

### Books & Reading
- Book, BookBookmark, BookOpen, BookOpenText, BookOpenUser, Books

### Bookmarks
- Bookmark, BookmarkSimple, Bookmarks, BookmarksSimple

### Classroom & Teaching
- Chalkboard, ChalkboardSimple, ChalkboardTeacher, Lectern

### Learning & Assessment
- Exam, Certificate, GraduationCap

### People
- Student

### Media
- Video

## Usage

```tsx
import Icon from "@/components/Icon";

// Education icons are automatically detected
<Icon name="Book" size="md" />
<Icon name="GraduationCap" size="lg" className="text-primary-500" />

// Or explicitly specify category
<Icon name="Student" category="education" size="xl" />
```

## Icon Specifications

- **Size**: 32x32px (can be scaled via CSS/Tailwind classes)
- **Default Color**: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
- **Stroke Weight**: 0.125 (very fine line weight)

## Notes

- Icons use `currentColor` for easy theming via Tailwind classes
- Icons maintain aspect ratio when resizing
- All icons are optimized for inline SVG usage with color inheritance


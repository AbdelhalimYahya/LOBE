/**
 * Design Tokens extracted from Figma
 * This file documents the design system tokens for reference
 */

/**
 * Primary Brand Color - Fuchsia Palette (Light Mode)
 * Extracted from: "Color Design System / Light Mood" frame
 */
export const fuchsiaColors = {
  50: "#f8e6ef",
  100: "#f1cddf",
  200: "#e8b4cf",
  300: "#e09bc0",
  400: "#d682b0",
  500: "#cc68a1", // Main brand color
  600: "#a75784",
  700: "#834668",
  800: "#61364e",
  900: "#412635",
  950: "#24171e",
} as const;

/**
 * Color Usage:
 * - primary-500: Main brand color for buttons, links, accents
 * - primary-50-100: Light backgrounds, hover states
 * - primary-600-700: Hover states on primary buttons
 * - primary-800-950: Dark text/headings on light backgrounds
 */

/**
 * Tailwind Usage Examples:
 *
 * Background: bg-primary, bg-primary-500, bg-primary-100
 * Text: text-primary-500, text-primary-700
 * Borders: border-primary-300, border-primary-500
 * Hover: hover:bg-primary-600, hover:text-primary-700
 */

/**
 * Input Component Design Tokens
 * Extracted from: "Buttons components" / "Forms" / "Input" frame
 */
export const inputTokens = {
  // Dimensions
  height: {
    sm: "40px", // h-10
    md: "44px", // h-11 (Figma spec)
    lg: "48px", // h-12
  },
  // Border
  borderRadius: "8px", // rounded-lg
  borderColor: "#e5e5e5", // border-border
  // Colors
  backgroundColor: "#ffffff", // bg-background
  textColor: "#2a2a2a", // text-foreground-muted (rgb(0.1647, 0.1647, 0.1647))
  placeholderColor: "#666666", // text-foreground-secondary
  // Spacing
  paddingX: {
    sm: "12px", // px-3
    md: "16px", // px-4 (Figma spec)
    lg: "20px", // px-5
  },
  iconSize: "20px", // w-5 h-5
  iconGap: "8px", // gap between icon and text
  // States
  focusRingColor: "#cc68a1", // ring-primary-500
  focusBorderColor: "#cc68a1", // border-primary-500
  hoverBorderColor: "#e5e5e5", // Same as default (border-border)
} as const;

/**
 * Input Variants:
 * - Label: Yes/No (optional label prop)
 * - Icon: No icon / Left / Right / Left-Right
 * - State: Default / Hover / Focus / Error
 */

/**
 * Spacing Design System
 * Extracted from: "المسافات - Spacing" frame
 *
 * The spacing scale is based on 4px increments (4px base unit)
 * Tailwind's default spacing scale covers most of these values:
 * - Tailwind spacing-1 = 4px (0.25rem)
 * - Tailwind spacing-2 = 8px (0.5rem)
 * - Tailwind spacing-3 = 12px (0.75rem)
 * - Tailwind spacing-4 = 16px (1rem)
 * - Tailwind spacing-5 = 20px (1.25rem)
 * - Tailwind spacing-6 = 24px (1.5rem)
 * - Tailwind spacing-7 = 28px (1.75rem)
 * - Tailwind spacing-8 = 32px (2rem)
 * - Tailwind spacing-9 = 36px (2.25rem)
 * - Tailwind spacing-10 = 40px (2.5rem)
 * - Tailwind spacing-11 = 44px (2.75rem)
 * - Tailwind spacing-12 = 48px (3rem)
 * - Tailwind spacing-14 = 56px (3.5rem)
 * - Tailwind spacing-16 = 64px (4rem)
 */
export const spacingTokens = {
  4: "4px", // spacing-1 (0.25rem)
  8: "8px", // spacing-2 (0.5rem)
  12: "12px", // spacing-3 (0.75rem)
  16: "16px", // spacing-4 (1rem)
  20: "20px", // spacing-5 (1.25rem)
  24: "24px", // spacing-6 (1.5rem)
  28: "28px", // spacing-7 (1.75rem)
  32: "32px", // spacing-8 (2rem)
  36: "36px", // spacing-9 (2.25rem)
  40: "40px", // spacing-10 (2.5rem)
  44: "44px", // spacing-11 (2.75rem)
  48: "48px", // spacing-12 (3rem)
  52: "52px", // Custom spacing (not in default Tailwind scale)
  56: "56px", // spacing-14 (3.5rem)
  60: "60px", // Custom spacing (not in default Tailwind scale)
  64: "64px", // spacing-16 (4rem)
} as const;

/**
 * Spacing Usage in Tailwind:
 *
 * Standard spacing utilities (covered by Tailwind default scale):
 * Padding: p-1, p-2, p-3, p-4, p-5, p-6, p-7, p-8, p-9, p-10, p-11, p-12, p-14, p-16
 * Margin: m-1, m-2, m-3, m-4, m-5, m-6, m-7, m-8, m-9, m-10, m-11, m-12, m-14, m-16
 * Gap: gap-1, gap-2, gap-3, gap-4, gap-5, gap-6, gap-7, gap-8, gap-9, gap-10, gap-11, gap-12, gap-14, gap-16
 *
 * Custom spacing utilities (added to Tailwind config):
 * - p-13, m-13, gap-13, etc. = 52px
 * - p-15, m-15, gap-15, etc. = 60px
 */

/**
 * Arrow Icons Design System
 * Extracted from: "Arrows icons" frame
 *
 * All icons are 32x32px with a color of rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104)
 * which is approximately #343330 (dark gray/black)
 *
 * Icon Categories:
 */

/**
 * Basic Caret Icons (simple directional indicators)
 */
export const caretIcons = [
  "CaretUp",
  "CaretDown",
  "CaretLeft",
  "CaretRight",
  "CaretUpDown",
  "CaretLineUp",
  "CaretLineDown",
  "CaretLineLeft",
  "CaretLineRight",
] as const;

/**
 * Double Caret Icons (double arrows)
 */
export const doubleCaretIcons = [
  "CaretDoubleUp",
  "CaretDoubleDown",
  "CaretDoubleLeft",
  "CaretDoubleRight",
] as const;

/**
 * Circle Caret Icons (carets within circles)
 */
export const circleCaretIcons = [
  "CaretCircleUp",
  "CaretCircleDown",
  "CaretCircleLeft",
  "CaretCircleRight",
  "CaretCircleUpDown",
  "CaretCircleDoubleUp",
  "CaretCircleDoubleDown",
  "CaretCircleDoubleLeft",
  "CaretCircleDoubleRight",
] as const;

/**
 * Basic Arrow Icons (simple arrows)
 */
export const basicArrowIcons = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUpLeft",
  "ArrowUpRight",
  "ArrowDownLeft",
  "ArrowDownRight",
] as const;

/**
 * Line Arrow Icons (arrows with lines)
 */
export const lineArrowIcons = [
  "ArrowLineUp",
  "ArrowLineDown",
  "ArrowLineLeft",
  "ArrowLineRight",
  "ArrowLineUpLeft",
  "ArrowLineUpRight",
  "ArrowLineDownLeft",
  "ArrowLineDownRight",
] as const;

/**
 * Square Arrow Icons (arrows within squares)
 */
export const squareArrowIcons = [
  "ArrowSquareUp",
  "ArrowSquareDown",
  "ArrowSquareLeft",
  "ArrowSquareRight",
  "ArrowSquareUpLeft",
  "ArrowSquareUpRight",
  "ArrowSquareDownLeft",
  "ArrowSquareDownRight",
  "ArrowSquareIn",
  "ArrowSquareOut",
] as const;

/**
 * Circle Arrow Icons (arrows within circles)
 */
export const circleArrowIcons = [
  "ArrowCircleUp",
  "ArrowCircleDown",
  "ArrowCircleLeft",
  "ArrowCircleRight",
  "ArrowCircleUpLeft",
  "ArrowCircleUpRight",
  "ArrowCircleDownLeft",
  "ArrowCircleDownRight",
] as const;

/**
 * U-Shaped Arrow Icons (curved arrows)
 */
export const uArrowIcons = [
  "ArrowUUpLeft",
  "ArrowUUpRight",
  "ArrowURightUp",
  "ArrowURightDown",
  "ArrowULeftUp",
  "ArrowULeftDown",
  "ArrowUDownRight",
  "ArrowUDownLeft",
] as const;

/**
 * Elbow Arrow Icons (L-shaped arrows)
 */
export const elbowArrowIcons = [
  "ArrowElbowUpLeft",
  "ArrowElbowUpRight",
  "ArrowElbowRightUp",
  "ArrowElbowRightDown",
  "ArrowElbowLeftUp",
  "ArrowElbowLeftDown",
  "ArrowElbowDownRight",
  "ArrowElbowDownLeft",
  "ArrowElbowRight",
  "ArrowElbowLeft",
] as const;

/**
 * Bend Arrow Icons (curved bend arrows)
 */
export const bendArrowIcons = [
  "ArrowBendUpRight",
  "ArrowBendUpLeft",
  "ArrowBendRightUp",
  "ArrowBendRightDown",
  "ArrowBendLeftUp",
  "ArrowBendLeftDown",
  "ArrowBendDownRight",
  "ArrowBendDownLeft",
  "ArrowBendDoubleUpRight",
  "ArrowBendDoubleUpLeft",
] as const;

/**
 * Arc Arrow Icons (arc-shaped arrows)
 */
export const arcArrowIcons = ["ArrowArcRight", "ArrowArcLeft"] as const;

/**
 * Fat Arrow Icons (thick/bold arrows)
 */
export const fatArrowIcons = [
  "ArrowFatUp",
  "ArrowFatDown",
  "ArrowFatLeft",
  "ArrowFatRight",
  "ArrowFatLineUp",
  "ArrowFatLineDown",
  "ArrowFatLineLeft",
  "ArrowFatLineRight",
  "ArrowFatLinesUp",
  "ArrowFatLinesDown",
  "ArrowFatLinesLeft",
  "ArrowFatLinesRight",
] as const;

/**
 * Directional Arrow Icons (combination arrows)
 */
export const directionalArrowIcons = [
  "ArrowsHorizontal",
  "ArrowsVertical",
  "ArrowsLeftRight",
  "ArrowsDownUp",
] as const;

/**
 * In/Out Arrow Icons (expand/collapse indicators)
 */
export const inOutArrowIcons = [
  "ArrowsIn",
  "ArrowsOut",
  "ArrowsInSimple",
  "ArrowsOutSimple",
  "ArrowsInCardinal",
  "ArrowsOutCardinal",
  "ArrowsInLineHorizontal",
  "ArrowsInLineVertical",
  "ArrowsOutLineHorizontal",
  "ArrowsOutLineVertical",
] as const;

/**
 * Special Arrow Icons (merge, split, rotate)
 */
export const specialArrowIcons = [
  "ArrowsMerge",
  "ArrowsSplit",
  "ArrowsClockwise",
  "ArrowsCounterClockwise",
  "ArrowClockwise",
  "ArrowCounterClockwise",
  "Recycle",
  "VectorTwo",
  "VectorThree",
] as const;

/**
 * All Arrow Icon Names
 * Combined list of all available arrow icons
 */
export const allArrowIcons = [
  ...caretIcons,
  ...doubleCaretIcons,
  ...circleCaretIcons,
  ...basicArrowIcons,
  ...lineArrowIcons,
  ...squareArrowIcons,
  ...circleArrowIcons,
  ...uArrowIcons,
  ...elbowArrowIcons,
  ...bendArrowIcons,
  ...arcArrowIcons,
  ...fatArrowIcons,
  ...directionalArrowIcons,
  ...inOutArrowIcons,
  ...specialArrowIcons,
] as const;

/**
 * Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/arrows/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

/**
 * Brand Icons Design System
 * Extracted from: "Brands" group
 *
 * All brand icons are 32x32px with a color of rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104)
 * which is approximately #343330 (dark gray/black)
 *
 * Icon Categories:
 */

/**
 * Social Media & Communication Icons
 */
export const socialMediaIcons = [
  "YoutubeLogo",
  "XLogo",
  "TwitterLogo",
  "WhatsappLogo",
  "WechatLogo",
  "TiktokLogo",
  "ThreadsLogo",
  "TelegramLogo",
  "SnapchatLogo",
  "RedditLogo",
  "PinterestLogo",
  "MessengerLogo",
  "MastodonLogo",
  "LinkedinLogo",
  "InstagramLogo",
  "FacebookLogo",
  "DiscordLogo",
] as const;

/**
 * Google Services Icons
 */
export const googleIcons = [
  "GoogleLogo",
  "GoogleChromeLogo",
  "GoogleDriveLogo",
  "GooglePhotosLogo",
  "GooglePlayLogo",
  "GooglePodcastsLogo",
] as const;

/**
 * Microsoft Services Icons
 */
export const microsoftIcons = [
  "WindowsLogo",
  "MicrosoftWordLogo",
  "MicrosoftTeamsLogo",
  "MicrosoftPowerpointLogo",
  "MicrosoftOutlookLogo",
  "MicrosoftExcelLogo",
] as const;

/**
 * Development & Tech Icons
 */
export const developmentIcons = [
  "GithubLogo",
  "GitlabLogo",
  "GitlabLogoSimple",
  "CodepenLogo",
  "CodesandboxLogo",
  "DevToLogo",
  "StackOverflowLogo",
  "FigmaLogo",
  "FramerLogo",
  "AngularLogo",
  "AndroidLogo",
] as const;

/**
 * Cloud & Storage Icons
 */
export const cloudIcons = ["DropboxLogo", "StripeLogo"] as const;

/**
 * Media & Entertainment Icons
 */
export const mediaIcons = [
  "SpotifyLogo",
  "SoundcloudLogo",
  "TidalLogo",
  "TwitchLogo",
  "TumblrLogo",
  "SteamLogo",
  "ApplePodcastsLogo",
] as const;

/**
 * E-commerce & Payment Icons
 */
export const commerceIcons = [
  "PaypalLogo",
  "AmazonLogo",
  "PatreonLogo",
] as const;

/**
 * Productivity & Tools Icons
 */
export const productivityIcons = [
  "NotionLogo",
  "SlackLogo",
  "SkypeLogo",
  "SketchLogo",
  "ReplitLogo",
  "ReadCvLogo",
  "PhosphorLogo",
  "OpenAiLogo",
  "NyTimesLogo",
  "MediumLogo",
  "LinktreeLogo",
  "LinuxLogo",
  "LastfmLogo",
  "GoodreadsLogo",
  "FediverseLogo",
  "DribbbleLogo",
  "BehanceLogo",
  "CodaLogo",
  "AppStoreLogo",
  "AppleLogo",
  "SquareLogo",
  "MetaLogo",
] as const;

/**
 * All Brand Icon Names
 * Combined list of all available brand icons
 */
export const allBrandIcons = [
  ...socialMediaIcons,
  ...googleIcons,
  ...microsoftIcons,
  ...developmentIcons,
  ...cloudIcons,
  ...mediaIcons,
  ...commerceIcons,
  ...productivityIcons,
] as const;

/**
 * Brand Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/brands/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 * - Brand icons may have specific brand colors that should be preserved when appropriate
 */

/**
 * Commerce Icons Design System
 * Extracted from: "Commerce" group
 *
 * All commerce icons are 32x32px with a color of rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104)
 * which is approximately #343330 (dark gray/black)
 *
 * Icon Categories:
 */

/**
 * Clothing & Fashion Icons
 */
export const clothingIcons = [
  "TShirt",
  "Sunglasses",
  "Sock",
  "SneakerMove",
  "Sneaker",
  "ShirtFolded",
  "Pants",
] as const;

/**
 * Shopping & Retail Icons
 */
export const shoppingIcons = [
  "Storefront",
  "ShoppingCartSimple",
  "ShoppingCart",
  "ShoppingBagOpen",
  "ShoppingBag",
  "ToteSimple",
  "Tote",
  "TagSimple",
  "TagChevron",
  "Tag",
  "ReceiptX",
  "Receipt",
  "Package",
  "Wallet",
] as const;

/**
 * Tools & Hardware Icons
 */
export const toolsIcons = [
  "Wrench",
  "Toolbox",
  "Tire",
  "Shovel",
  "Screwdriver",
  "PipeWrench",
  "Pipe",
] as const;

/**
 * Food & Beverage Icons
 */
export const foodIcons = [
  "Wine",
  "TeaBag",
  "Popsicle",
  "Popcorn",
  "Pizza",
  "PintGlass",
  "Pepper",
  "OrangeSlice",
  "Orange",
] as const;

/**
 * Home & Furniture Icons
 */
export const homeIcons = [
  "Windmill",
  "WashingMachine",
  "Warehouse",
  "Towel",
  "Stool",
  "Stairs",
  "SolarRoof",
  "SolarPanel",
  "Shower",
  "Rug",
  "PottedPlant",
  "PicnicTable",
  "Oven",
] as const;

/**
 * Transportation Icons
 */
export const transportationIcons = [
  "TruckTrailer",
  "Tractor",
  "Seatbelt",
] as const;

/**
 * Miscellaneous Commerce Icons
 */
export const miscellaneousCommerceIcons = [
  "Yarn",
  "TipJar",
  "Ticket",
  "TrademarkRegistered",
  "Trademark",
  "Scales",
  "PixLogo",
  "PiggyBank",
] as const;

/**
 * All Commerce Icon Names
 * Combined list of all available commerce icons
 */
export const allCommerceIcons = [
  ...clothingIcons,
  ...shoppingIcons,
  ...toolsIcons,
  ...foodIcons,
  ...homeIcons,
  ...transportationIcons,
  ...miscellaneousCommerceIcons,
] as const;

/**
 * Commerce Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/commerce/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

/**
 * Design Icons Design System
 * Extracted from: "Design" group
 *
 * All design icons are 32x32px with a color of rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104)
 * which is approximately #343330 (dark gray/black)
 *
 * Icon Categories:
 */

/**
 * Basic Shapes Icons
 */
export const basicShapesIcons = [
  "Circle",
  "CircleDashed",
  "CircleHalf",
  "CircleHalfTilt",
  "CircleNotch",
  "Square",
  "SquareHalf",
  "SquareHalfBottom",
  "SquareSplitHorizontal",
  "SquareSplitVertical",
  "Rectangle",
  "RectangleDashed",
  "Triangle",
  "TriangleDashed",
  "Polygon",
  "Pentagon",
  "Pentagram",
  "Hexagon",
  "Octagon",
  "Parallelogram",
  "Sphere",
  "Cube",
  "CubeTransparent",
  "Cylinder",
] as const;

/**
 * Drawing & Pen Tools Icons
 */
export const drawingToolsIcons = [
  "Pencil",
  "PencilCircle",
  "PencilLine",
  "PencilRuler",
  "PencilSimple",
  "PencilSimpleLine",
  "PencilSimpleSlash",
  "PencilSlash",
  "Pen",
  "PenNib",
  "PenNibStraight",
  "Eraser",
  "Highlighter",
  "HighlighterCircle",
  "MarkerCircle",
] as const;

/**
 * Paint & Color Tools Icons
 */
export const paintToolsIcons = [
  "PaintBrush",
  "PaintBrushBroad",
  "PaintBrushHousehold",
  "PaintBucket",
  "PaintRoller",
  "Palette",
  "Swatches",
  "Eyedropper",
  "EyedropperSample",
  "Gradient",
  "SprayBottle",
] as const;

/**
 * Selection Tools Icons
 */
export const selectionToolsIcons = [
  "Selection",
  "SelectionAll",
  "SelectionBackground",
  "SelectionForeground",
  "SelectionInverse",
  "SelectionPlus",
  "SelectionSlash",
  "Lasso",
  "BoundingBox",
] as const;

/**
 * Layout & Grid Icons
 */
export const layoutIcons = [
  "Layout",
  "GridFour",
  "GridNine",
  "SquaresFour",
  "Columns",
  "ColumnsPlusLeft",
  "ColumnsPlusRight",
  "Rows",
  "RowsPlusBottom",
  "RowsPlusTop",
  "Sidebar",
  "SidebarSimple",
  "Stack",
  "StackMinus",
  "StackPlus",
  "StackSimple",
] as const;

/**
 * Alignment Icons
 */
export const alignmentIcons = [
  "AlignBottom",
  "AlignBottomSimple",
  "AlignCenterHorizontal",
  "AlignCenterHorizontalSimple",
  "AlignCenterVertical",
  "AlignCenterVerticalSimple",
  "AlignLeft",
  "AlignLeftSimple",
  "AlignRight",
  "AlignRightSimple",
  "AlignTop",
  "AlignTopSimple",
] as const;

/**
 * Transform & Edit Icons
 */
export const transformIcons = [
  "Resize",
  "FlipHorizontal",
  "FlipVertical",
  "Crop",
  "Ruler",
  "Scissors",
  "Placeholder",
  "Blueprint",
  "Perspective",
] as const;

/**
 * Path Operations Icons
 */
export const pathOperationsIcons = [
  "Unite",
  "UniteSquare",
  "Subtract",
  "SubtractSquare",
  "Intersect",
  "IntersectSquare",
  "IntersectThree",
  "Exclude",
  "ExcludeSquare",
] as const;

/**
 * Line & Curve Tools Icons
 */
export const lineToolsIcons = [
  "LineSegment",
  "LineSegments",
  "LineVertical",
  "BezierCurve",
  "Scribble",
  "ScribbleLoop",
] as const;

/**
 * Shape Groups & Patterns Icons
 */
export const shapePatternsIcons = [
  "Shapes",
  "CirclesThree",
  "CirclesThreePlus",
  "CirclesFour",
  "DiamondsFour",
  "Notches",
] as const;

/**
 * Special Tools Icons
 */
export const specialToolsIcons = [
  "MagicWand",
  "CompassTool",
  "Angle",
  "Stamp",
  "Vignette",
  "TextAUnderline",
] as const;

/**
 * Split & Drop Icons
 */
export const splitDropIcons = [
  "SplitHorizontal",
  "SplitVertical",
  "DropHalf",
  "DropHalfBottom",
  "DropSlash",
] as const;

/**
 * View & Display Icons
 */
export const viewIcons = ["Eye", "EyeClosed", "EyeSlash"] as const;

/**
 * All Design Icon Names
 * Combined list of all available design icons
 */
export const allDesignIcons = [
  ...basicShapesIcons,
  ...drawingToolsIcons,
  ...paintToolsIcons,
  ...selectionToolsIcons,
  ...layoutIcons,
  ...alignmentIcons,
  ...transformIcons,
  ...pathOperationsIcons,
  ...lineToolsIcons,
  ...shapePatternsIcons,
  ...specialToolsIcons,
  ...splitDropIcons,
  ...viewIcons,
] as const;

/**
 * Design Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/design/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

/**
 * Development Icons Design System
 * Extracted from: "Development" group
 *
 * All development icons are 32x32px with a color of rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104)
 * which is approximately #343330 (dark gray/black)
 *
 * Icon Categories:
 */

/**
 * Code & Syntax Icons
 */
export const codeSyntaxIcons = [
  "Code",
  "CodeBlock",
  "CodeSimple",
  "BracketsAngle",
  "BracketsCurly",
  "BracketsRound",
  "BracketsSquare",
] as const;

/**
 * Git Operations Icons
 */
export const gitIcons = [
  "GitBranch",
  "GitCommit",
  "GitDiff",
  "GitFork",
  "GitMerge",
  "GitPullRequest",
] as const;

/**
 * Terminal & Console Icons
 */
export const terminalIcons = ["Terminal", "TerminalWindow"] as const;

/**
 * Hardware & Components Icons
 */
export const hardwareIcons = [
  "Cpu",
  "GraphicsCard",
  "Database",
  "Magnet",
  "MagnetStraight",
] as const;

/**
 * Data Structures & Algorithms Icons
 */
export const dataStructureIcons = ["Binary", "TreeStructure"] as const;

/**
 * Bug & Debug Icons
 */
export const bugDebugIcons = ["Bug", "BugBeetle", "BugDroid", "Robot"] as const;

/**
 * Miscellaneous Development Icons
 */
export const miscellaneousDevelopmentIcons = [
  "HeadCircuit",
  "MarkdownLogo",
  "WebhooksLogo",
] as const;

/**
 * All Development Icon Names
 * Combined list of all available development icons
 */
export const allDevelopmentIcons = [
  ...codeSyntaxIcons,
  ...gitIcons,
  ...terminalIcons,
  ...hardwareIcons,
  ...dataStructureIcons,
  ...bugDebugIcons,
  ...miscellaneousDevelopmentIcons,
] as const;

/**
 * Development Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/development/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

/**
 * Education Icons Design System
 * Extracted from: "Education" group
 *
 * All education icons are 32x32px with a color of rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104)
 * which is approximately #343330 (dark gray/black)
 *
 * Icon Categories:
 */

/**
 * Books & Reading Icons
 */
export const booksIcons = [
  "Book",
  "BookBookmark",
  "BookOpen",
  "BookOpenText",
  "BookOpenUser",
  "Books",
] as const;

/**
 * Bookmarks Icons
 */
export const bookmarksIcons = [
  "Bookmark",
  "BookmarkSimple",
  "Bookmarks",
  "BookmarksSimple",
] as const;

/**
 * Classroom & Teaching Icons
 */
export const classroomIcons = [
  "Chalkboard",
  "ChalkboardSimple",
  "ChalkboardTeacher",
  "Lectern",
] as const;

/**
 * Learning & Assessment Icons
 */
export const learningIcons = ["Exam", "Certificate", "GraduationCap"] as const;

/**
 * People Icons
 */
export const peopleEducationIcons = ["Student"] as const;

/**
 * Media Icons
 */
export const mediaEducationIcons = ["Video"] as const;

/**
 * All Education Icon Names
 * Combined list of all available education icons
 */
export const allEducationIcons = [
  ...booksIcons,
  ...bookmarksIcons,
  ...classroomIcons,
  ...learningIcons,
  ...peopleEducationIcons,
  ...mediaEducationIcons,
] as const;

/**
 * Education Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/education/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// GAMES ICONS
// ============================================================================

/**
 * Sports Equipment & Balls Icons
 */
export const sportsEquipmentIcons = [
  "Basketball",
  "Baseball",
  "SoccerBall",
  "TennisBall",
  "Volleyball",
  "Football",
  "BowlingBall",
  "BeachBall",
  "Golf",
  "Hockey",
  "Cricket",
  "BaseballHelmet",
  "FootballHelmet",
  "Racquet",
  "PingPong",
  "CourtBasketball",
  "BoxingGlove",
  "Boules",
] as const;

/**
 * Gaming Equipment & Controllers Icons
 */
export const gamingEquipmentIcons = [
  "GameController",
  "Joystick",
  "PuzzlePiece",
  "Checkerboard",
] as const;

/**
 * Cards & Dice Icons
 */
export const cardsDiceIcons = [
  "DiceOne",
  "DiceTwo",
  "DiceThree",
  "DiceFour",
  "DiceFive",
  "DiceSix",
  "PokerChip",
  "Spade",
  "Club",
  "Diamond",
] as const;

/**
 * Hearts & Emotions Icons
 */
export const heartsEmotionsIcons = [
  "Heart",
  "HeartBreak",
  "HeartHalf",
  "HeartStraight",
  "HeartStraightBreak",
  "MaskHappy",
  "MaskSad",
] as const;

/**
 * Fantasy & Adventure Icons
 */
export const fantasyAdventureIcons = [
  "Sword",
  "Crown",
  "CrownCross",
  "CrownSimple",
  "TreasureChest",
  "CastleTurret",
  "Ghost",
  "Skull",
  "Alien",
  "FlyingSaucer",
  "Bomb",
  "Scroll",
  "Strategy",
  "Target",
] as const;

/**
 * Virtual Reality Icons
 */
export const virtualRealityIcons = [
  "VirtualReality",
  "GoogleCardboardLogo",
] as const;

/**
 * Achievements & Awards Icons
 */
export const achievementsAwardsIcons = [
  "Trophy",
  "Medal",
  "MedalMilitary",
  "Ranking",
] as const;

/**
 * Recreation & Activities Icons
 */
export const recreationActivitiesIcons = [
  "Parachute",
  "PersonSimpleSki",
  "PersonSimpleSnowboard",
  "Horse",
  "TreePalm",
] as const;

/**
 * Toys & Fun Items Icons
 */
export const toysFunItemsIcons = [
  "Lego",
  "LegoSmiley",
  "Pinwheel",
  "Confetti",
  "DiscoBall",
  "Spiral",
  "FinnTheHuman",
  "CubeFocus",
  "Drone",
] as const;

/**
 * All Games Icon Names
 * Combined list of all available games icons
 */
export const allGamesIcons = [
  ...sportsEquipmentIcons,
  ...gamingEquipmentIcons,
  ...cardsDiceIcons,
  ...heartsEmotionsIcons,
  ...fantasyAdventureIcons,
  ...virtualRealityIcons,
  ...achievementsAwardsIcons,
  ...recreationActivitiesIcons,
  ...toysFunItemsIcons,
] as const;

/**
 * Games Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/games/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// HEALTH & WELLNESS ICONS
// ============================================================================

/**
 * Medical Equipment & Tools Icons
 */
export const medicalEquipmentIcons = [
  "Stethoscope",
  "Microscope",
  "TestTube",
  "Flask",
  "Syringe",
  "Prescription",
] as const;

/**
 * Medications & Treatments Icons
 */
export const medicationsTreatmentsIcons = [
  "Pill",
  "FirstAid",
  "FirstAidKit",
  "Bandaids",
  "Lifebuoy",
] as const;

/**
 * Body Parts & Anatomy Icons
 */
export const bodyPartsAnatomyIcons = [
  "Brain",
  "Dna",
  "Tooth",
  "Heartbeat",
  "Pulse",
] as const;

/**
 * Emergency Services Icons
 */
export const emergencyServicesIcons = [
  "Ambulance",
  "FireTruck",
  "Asclepius",
] as const;

/**
 * Wellness & Hygiene Icons
 */
export const wellnessHygieneIcons = [
  "HandSoap",
  "HandHeart",
  "FaceMask",
  "Toilet",
  "ToiletPaper",
  "Bed",
] as const;

/**
 * Fitness & Exercise Icons
 */
export const fitnessExerciseIcons = ["Barbell"] as const;

/**
 * Health Conditions Icons
 */
export const healthConditionsIcons = ["Virus"] as const;

/**
 * All Health & Wellness Icon Names
 * Combined list of all available health & wellness icons
 */
export const allHealthIcons = [
  ...medicalEquipmentIcons,
  ...medicationsTreatmentsIcons,
  ...bodyPartsAnatomyIcons,
  ...emergencyServicesIcons,
  ...wellnessHygieneIcons,
  ...fitnessExerciseIcons,
  ...healthConditionsIcons,
] as const;

/**
 * Health & Wellness Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/health/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// MAPS & TRAVEL ICONS
// ============================================================================

/**
 * Vehicles & Transportation Icons
 */
export const vehiclesTransportationIcons = [
  "Airplane",
  "AirplaneInFlight",
  "AirplaneLanding",
  "AirplaneTakeoff",
  "AirplaneTaxiing",
  "AirplaneTilt",
  "Bicycle",
  "Boat",
  "Bus",
  "CableCar",
  "Car",
  "CarProfile",
  "CarSimple",
  "Jeep",
  "Motorcycle",
  "Moped",
  "MopedFront",
  "Scooter",
  "Taxi",
  "Tram",
  "Train",
  "TrainRegional",
  "TrainSimple",
  "Truck",
  "Van",
] as const;

/**
 * Maps & Navigation Icons
 */
export const mapsNavigationIcons = [
  "MapPin",
  "MapPinArea",
  "MapPinLine",
  "MapPinPlus",
  "MapPinSimple",
  "MapPinSimpleArea",
  "MapPinSimpleLine",
  "MapTrifold",
  "NavigationArrow",
  "Gps",
  "GpsFix",
  "GpsSlash",
  "Compass",
  "CompassRose",
  "Crosshair",
  "CrosshairSimple",
] as const;

/**
 * Globes & World Icons
 */
export const globesWorldIcons = [
  "Globe",
  "GlobeHemisphereEast",
  "GlobeHemisphereWest",
  "GlobeSimple",
  "GlobeSimpleX",
  "GlobeStand",
  "GlobeX",
] as const;

/**
 * Flags Icons
 */
export const flagsIcons = [
  "Flag",
  "FlagBanner",
  "FlagBannerFold",
  "FlagCheckered",
  "FlagPennant",
] as const;

/**
 * Buildings & Landmarks Icons
 */
export const buildingsLandmarksIcons = [
  "Church",
  "Hospital",
  "House",
  "HouseLine",
  "HouseSimple",
  "Lighthouse",
  "Mosque",
  "Synagogue",
] as const;

/**
 * Travel & Luggage Icons
 */
export const travelLuggageIcons = [
  "Suitcase",
  "SuitcaseRolling",
  "SuitcaseSimple",
  "Trolley",
  "TrolleySuitcase",
  "Lockers",
] as const;

/**
 * Camping & Outdoor Icons
 */
export const campingOutdoorIcons = [
  "Tent",
  "Tipi",
  "Anchor",
  "AnchorSimple",
] as const;

/**
 * Road & Traffic Icons
 */
export const roadTrafficIcons = [
  "TrafficCone",
  "TrafficSign",
  "TrafficSignal",
  "RoadHorizon",
  "Path",
  "Park",
  "Barricade",
  "Signpost",
  "Steps",
] as const;

/**
 * Fuel & Energy Icons
 */
export const fuelEnergyIcons = [
  "GasCan",
  "GasPump",
  "ChargingStation",
  "Engine",
] as const;

/**
 * Public Transport Icons
 */
export const publicTransportIcons = [
  "Subway",
  "Elevator",
  "EscalatorDown",
  "EscalatorUp",
  "Seat",
] as const;

/**
 * Space Travel Icons
 */
export const spaceTravelIcons = ["Rocket", "RocketLaunch"] as const;

/**
 * Miscellaneous Travel Icons
 */
export const miscellaneousTravelIcons = [
  "AirTrafficControl",
  "Headlights",
  "SteeringWheel",
  "ShippingContainer",
  "SwimmingPool",
  "Sailboat",
  "Goggles",
] as const;

/**
 * All Maps & Travel Icon Names
 * Combined list of all available maps & travel icons
 */
export const allMapsIcons = [
  ...vehiclesTransportationIcons,
  ...mapsNavigationIcons,
  ...globesWorldIcons,
  ...flagsIcons,
  ...buildingsLandmarksIcons,
  ...travelLuggageIcons,
  ...campingOutdoorIcons,
  ...roadTrafficIcons,
  ...fuelEnergyIcons,
  ...publicTransportIcons,
  ...spaceTravelIcons,
  ...miscellaneousTravelIcons,
] as const;

/**
 * Maps & Travel Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/maps/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// MATH & FINANCE ICONS
// ============================================================================

/**
 * Numbers Icons
 */
export const numbersIcons = [
  "NumberZero",
  "NumberOne",
  "NumberTwo",
  "NumberThree",
  "NumberFour",
  "NumberFive",
  "NumberSix",
  "NumberSeven",
  "NumberEight",
  "NumberNine",
] as const;

/**
 * Number Circles Icons
 */
export const numberCirclesIcons = [
  "NumberCircleZero",
  "NumberCircleOne",
  "NumberCircleTwo",
  "NumberCircleThree",
  "NumberCircleFour",
  "NumberCircleFive",
  "NumberCircleSix",
  "NumberCircleSeven",
  "NumberCircleEight",
  "NumberCircleNine",
] as const;

/**
 * Number Squares Icons
 */
export const numberSquaresIcons = [
  "NumberSquareZero",
  "NumberSquareOne",
  "NumberSquareTwo",
  "NumberSquareThree",
  "NumberSquareFour",
  "NumberSquareFive",
  "NumberSquareSix",
  "NumberSquareSeven",
  "NumberSquareEight",
  "NumberSquareNine",
] as const;

/**
 * Basic Math Operations Icons
 */
export const basicMathOperationsIcons = [
  "Plus",
  "PlusCircle",
  "PlusSquare",
  "PlusMinus",
  "Minus",
  "MinusCircle",
  "MinusSquare",
  "Divide",
  "Equals",
  "NotEquals",
  "ApproximateEquals",
] as const;

/**
 * Comparison Operators Icons
 */
export const comparisonOperatorsIcons = [
  "GreaterThan",
  "GreaterThanOrEqual",
  "LessThan",
  "LessThanOrEqual",
] as const;

/**
 * Set Theory Icons
 */
export const setTheoryIcons = [
  "SubsetOf",
  "SubsetProperOf",
  "SupersetOf",
  "SupersetProperOf",
  "NotSubsetOf",
  "NotSupersetOf",
  "MemberOf",
  "NotMemberOf",
  "Intersection",
  "Union",
  "Empty",
] as const;

/**
 * Mathematical Symbols Icons
 */
export const mathematicalSymbolsIcons = [
  "Pi",
  "Sigma",
  "Infinity",
  "Radical",
  "Function",
  "Tilde",
  "Percent",
] as const;

/**
 * Charts & Graphs Icons
 */
export const chartsGraphsIcons = [
  "ChartBar",
  "ChartBarHorizontal",
  "ChartLine",
  "ChartLineUp",
  "ChartLineDown",
  "ChartPie",
  "ChartPieSlice",
  "ChartDonut",
  "ChartPolar",
  "ChartScatter",
  "Graph",
] as const;

/**
 * Financial Icons
 */
export const financialIcons = [
  "Bank",
  "Calculator",
  "TrendUp",
  "TrendDown",
  "Table",
] as const;

/**
 * X & Close Icons
 */
export const xCloseIcons = ["X", "XCircle", "XSquare"] as const;

/**
 * All Math & Finance Icon Names
 * Combined list of all available math & finance icons
 */
export const allMathIcons = [
  ...numbersIcons,
  ...numberCirclesIcons,
  ...numberSquaresIcons,
  ...basicMathOperationsIcons,
  ...comparisonOperatorsIcons,
  ...setTheoryIcons,
  ...mathematicalSymbolsIcons,
  ...chartsGraphsIcons,
  ...financialIcons,
  ...xCloseIcons,
] as const;

/**
 * Math & Finance Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/math/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// OFFICE & EDITING ICONS
// ============================================================================

/**
 * Files Icons
 */
export const filesIcons = [
  "File",
  "FileArchive",
  "FileArrowDown",
  "FileArrowUp",
  "FileAudio",
  "FileC",
  "FileCSharp",
  "FileCloud",
  "FileCode",
  "FileCpp",
  "FileCss",
  "FileCsv",
  "FileDashed",
  "FileDoc",
  "FileHtml",
  "FileImage",
  "FileIni",
  "FileJpg",
  "FileJs",
  "FileJsx",
  "FileLock",
  "FileMagnifyingGlass",
  "FileMd",
  "FileMinus",
  "FilePdf",
  "FilePlus",
  "FilePng",
  "FilePpt",
  "FilePy",
  "FileRs",
  "FileSql",
  "FileSvg",
  "FileText",
  "FileTs",
  "FileTsx",
  "FileTxt",
  "FileVideo",
  "FileVue",
  "FileX",
  "FileXls",
  "FileZip",
  "Files",
] as const;

/**
 * Folders Icons
 */
export const foldersIcons = [
  "Folder",
  "FolderDashed",
  "FolderLock",
  "FolderMinus",
  "FolderOpen",
  "FolderPlus",
  "FolderSimple",
  "FolderSimpleDashed",
  "FolderSimpleLock",
  "FolderSimpleMinus",
  "FolderSimplePlus",
  "FolderSimpleStar",
  "FolderSimpleUser",
  "FolderStar",
  "FolderUser",
  "Folders",
] as const;

/**
 * Text Formatting Icons
 */
export const textFormattingIcons = [
  "TextAa",
  "TextAlignCenter",
  "TextAlignJustify",
  "TextAlignLeft",
  "TextAlignRight",
  "TextB",
  "TextColumns",
  "TextH",
  "TextHFour",
  "TextHFive",
  "TextHOne",
  "TextHSix",
  "TextHThree",
  "TextHTwo",
  "TextIndent",
  "TextItalic",
  "TextOutdent",
  "TextStrikethrough",
  "TextSubscript",
  "TextSuperscript",
  "TextT",
  "TextTSlash",
  "TextUnderline",
  "Textbox",
] as const;

/**
 * Lists Icons
 */
export const listsIcons = [
  "List",
  "ListBullets",
  "ListChecks",
  "ListDashes",
  "ListNumbers",
  "ListPlus",
] as const;

/**
 * Clipboard & Copy Icons
 */
export const clipboardCopyIcons = [
  "Clipboard",
  "ClipboardText",
  "Copy",
  "CopySimple",
] as const;

/**
 * Notes Icons
 */
export const notesIcons = [
  "Note",
  "NoteBlank",
  "NotePencil",
  "Notebook",
  "Notepad",
] as const;

/**
 * Archive & Storage Icons
 */
export const archiveStorageIcons = [
  "Archive",
  "BoxArrowDown",
  "BoxArrowUp",
  "Briefcase",
  "BriefcaseMetal",
] as const;

/**
 * Cards Icons
 */
export const cardsIcons = ["Cards", "CardsThree"] as const;

/**
 * Filters Icons
 */
export const filtersIcons = [
  "Funnel",
  "FunnelSimple",
  "FunnelSimpleX",
  "FunnelX",
] as const;

/**
 * Kanban Icons
 */
export const kanbanIcons = ["Kanban"] as const;

/**
 * Paperclip Icons
 */
export const paperclipIcons = ["Paperclip", "PaperclipHorizontal"] as const;

/**
 * Paragraph Icons
 */
export const paragraphIcons = ["Paragraph"] as const;

/**
 * Presentations Icons
 */
export const presentationsIcons = [
  "Presentation",
  "PresentationChart",
  "ProjectorScreen",
  "ProjectorScreenChart",
] as const;

/**
 * Printer Icons
 */
export const printerIcons = ["Printer"] as const;

/**
 * Push Pins Icons
 */
export const pushPinsIcons = [
  "PushPin",
  "PushPinSimple",
  "PushPinSimpleSlash",
  "PushPinSlash",
] as const;

/**
 * Sort Icons
 */
export const sortIcons = ["SortAscending", "SortDescending"] as const;

/**
 * Tray Icons
 */
export const trayIcons = ["Tray", "TrayArrowDown", "TrayArrowUp"] as const;

/**
 * Trash Icons
 */
export const trashIcons = ["Trash", "TrashSimple"] as const;

/**
 * Floppy Disk Icons
 */
export const floppyDiskIcons = ["FloppyDisk", "FloppyDiskBack"] as const;

/**
 * Cursor Icons
 */
export const cursorIcons = ["CursorText"] as const;

/**
 * All Office & Editing Icon Names
 * Combined list of all available office & editing icons
 */
export const allOfficeIcons = [
  ...filesIcons,
  ...foldersIcons,
  ...textFormattingIcons,
  ...listsIcons,
  ...clipboardCopyIcons,
  ...notesIcons,
  ...archiveStorageIcons,
  ...cardsIcons,
  ...filtersIcons,
  ...kanbanIcons,
  ...paperclipIcons,
  ...paragraphIcons,
  ...presentationsIcons,
  ...printerIcons,
  ...pushPinsIcons,
  ...sortIcons,
  ...trayIcons,
  ...trashIcons,
  ...floppyDiskIcons,
  ...cursorIcons,
] as const;

/**
 * Office & Editing Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/office/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// PEOPLE ICONS
// ============================================================================

/**
 * Users Icons
 */
export const usersIcons = ["Users", "UsersFour", "UsersThree"] as const;

/**
 * User Icons
 */
export const userIcons = [
  "User",
  "UserCheck",
  "UserCircle",
  "UserCircleCheck",
  "UserCircleDashed",
  "UserCircleGear",
  "UserCircleMinus",
  "UserCirclePlus",
  "UserFocus",
  "UserGear",
  "UserList",
  "UserMinus",
  "UserPlus",
  "UserRectangle",
  "UserSound",
  "UserSquare",
  "UserSwitch",
] as const;

/**
 * Person Icons
 */
export const personIcons = ["Person", "PersonArmsSpread"] as const;

/**
 * PersonSimple Icons
 */
export const personSimpleIcons = [
  "PersonSimple",
  "PersonSimpleBike",
  "PersonSimpleCircle",
  "PersonSimpleHike",
  "PersonSimpleRun",
  "PersonSimpleSwim",
  "PersonSimpleTaiChi",
  "PersonSimpleThrow",
  "PersonSimpleWalk",
] as const;

/**
 * Smiley Icons
 */
export const smileyIcons = [
  "Smiley",
  "SmileyAngry",
  "SmileyBlank",
  "SmileyMeh",
  "SmileyMelting",
  "SmileyNervous",
  "SmileySad",
  "SmileySticker",
  "SmileyWink",
  "SmileyXEyes",
] as const;

/**
 * Hand Icons
 */
export const handIcons = [
  "Hand",
  "HandArrowDown",
  "HandArrowUp",
  "HandDeposit",
  "HandEye",
  "HandFist",
  "HandGrabbing",
  "HandPalm",
  "HandPeace",
  "HandPointing",
  "HandWaving",
  "HandWithdraw",
] as const;

/**
 * Hands Icons
 */
export const handsIcons = [
  "HandsClapping",
  "HandsPraying",
  "Handshake",
] as const;

/**
 * Gender Icons
 */
export const genderIcons = [
  "GenderFemale",
  "GenderIntersex",
  "GenderMale",
  "GenderNeuter",
  "GenderNonbinary",
  "GenderTransgender",
] as const;

/**
 * Identification Icons
 */
export const identificationIcons = [
  "IdentificationBadge",
  "IdentificationCard",
] as const;

/**
 * Wheelchair Icons
 */
export const wheelchairIcons = ["Wheelchair", "WheelchairMotion"] as const;

/**
 * Other People Icons
 */
export const otherPeopleIcons = ["Baby", "Eyes", "Footprints"] as const;

/**
 * All People Icon Names
 * Combined list of all available people icons
 */
export const allPeopleIcons = [
  ...usersIcons,
  ...userIcons,
  ...personIcons,
  ...personSimpleIcons,
  ...smileyIcons,
  ...handIcons,
  ...handsIcons,
  ...genderIcons,
  ...identificationIcons,
  ...wheelchairIcons,
  ...otherPeopleIcons,
] as const;

/**
 * People Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/people/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// SECURITY & WARNINGS ICONS
// ============================================================================

/**
 * Warning Icons
 */
export const warningIcons = [
  "Warning",
  "WarningCircle",
  "WarningDiamond",
  "WarningOctagon",
] as const;

/**
 * Shield Icons
 */
export const shieldIcons = [
  "Shield",
  "ShieldCheck",
  "ShieldCheckered",
  "ShieldChevron",
  "ShieldPlus",
  "ShieldSlash",
  "ShieldStar",
  "ShieldWarning",
] as const;

/**
 * Seal Icons
 */
export const sealIcons = [
  "Seal",
  "SealCheck",
  "SealPercent",
  "SealQuestion",
  "SealWarning",
] as const;

/**
 * Lock Icons
 */
export const lockIcons = [
  "Lock",
  "LockKey",
  "LockKeyOpen",
  "LockLaminated",
  "LockLaminatedOpen",
  "LockOpen",
  "LockSimple",
  "LockSimpleOpen",
] as const;

/**
 * Key Icons
 */
export const keyIcons = ["Key", "Keyhole", "Password"] as const;

/**
 * Security Icons
 */
export const securityIcons = [
  "Detective",
  "Fingerprint",
  "FingerprintSimple",
  "SecurityCamera",
  "Vault",
  "Wall",
] as const;

/**
 * Prohibit Icons
 */
export const prohibitIcons = ["Prohibit", "ProhibitInset"] as const;

/**
 * Question Icons
 */
export const questionIcons = ["Question", "QuestionMark"] as const;

/**
 * Other Security Icons
 */
export const otherSecurityIcons = [
  "Biohazard",
  "ExclamationMark",
  "FalloutShelter",
  "FireExtinguisher",
  "Info",
  "Radioactive",
  "Siren",
] as const;

/**
 * All Security & Warnings Icon Names
 * Combined list of all available security & warnings icons
 */
export const allSecurityIcons = [
  ...warningIcons,
  ...shieldIcons,
  ...sealIcons,
  ...lockIcons,
  ...keyIcons,
  ...securityIcons,
  ...prohibitIcons,
  ...questionIcons,
  ...otherSecurityIcons,
] as const;

/**
 * Security & Warnings Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/security/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// TIME ICONS
// ============================================================================

/**
 * Clock Icons
 */
export const clockIcons = [
  "Clock",
  "ClockAfternoon",
  "ClockClockwise",
  "ClockCounterClockwise",
  "ClockCountdown",
  "ClockUser",
] as const;

/**
 * Hourglass Icons
 */
export const hourglassIcons = [
  "Hourglass",
  "HourglassHigh",
  "HourglassLow",
  "HourglassMedium",
  "HourglassSimple",
  "HourglassSimpleHigh",
  "HourglassSimpleLow",
  "HourglassSimpleMedium",
] as const;

/**
 * Calendar Icons
 */
export const calendarIcons = [
  "Calendar",
  "CalendarBlank",
  "CalendarCheck",
  "CalendarDot",
  "CalendarDots",
  "CalendarHeart",
  "CalendarMinus",
  "CalendarPlus",
  "CalendarSlash",
  "CalendarStar",
  "CalendarX",
] as const;

/**
 * Other Time Icons
 */
export const otherTimeIcons = ["Alarm", "Timer", "Watch"] as const;

/**
 * All Time Icon Names
 * Combined list of all available time icons
 */
export const allTimeIcons = [
  ...clockIcons,
  ...hourglassIcons,
  ...calendarIcons,
  ...otherTimeIcons,
] as const;

/**
 * Time Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/time/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

// ============================================================================
// WEATHER & NATURE ICONS
// ============================================================================

/**
 * Weather Icons
 */
export const weatherIcons = [
  "Cloud",
  "CloudFog",
  "CloudLightning",
  "CloudMoon",
  "CloudRain",
  "CloudSnow",
  "CloudSun",
  "Rainbow",
  "RainbowCloud",
  "Sun",
  "SunDim",
  "SunHorizon",
  "Moon",
  "MoonStars",
  "Thermometer",
  "ThermometerCold",
  "ThermometerHot",
  "ThermometerSimple",
  "Tornado",
  "Hurricane",
  "Wind",
  "Waves",
  "Snowflake",
  "Drop",
  "DropSimple",
  "Umbrella",
  "UmbrellaSimple",
  "Flame",
  "Fire",
  "FireSimple",
] as const;

/**
 * Nature & Plants Icons
 */
export const natureIcons = [
  "Tree",
  "TreeEvergreen",
  "Leaf",
  "Flower",
  "FlowerLotus",
  "FlowerTulip",
  "Plant",
  "Clover",
  "Cactus",
  "Acorn",
  "Log",
] as const;

/**
 * Animal Icons
 */
export const animalIcons = [
  "Bird",
  "Butterfly",
  "Cat",
  "Cow",
  "Dog",
  "Fish",
  "FishSimple",
  "PawPrint",
  "Rabbit",
  "Shrimp",
] as const;

/**
 * Celestial & Space Icons
 */
export const celestialIcons = [
  "Atom",
  "Meteor",
  "Planet",
  "ShootingStar",
  "Sparkle",
  "StarFour",
] as const;

/**
 * Landscape Icons
 */
export const landscapeIcons = ["Island", "Mountains"] as const;

/**
 * Other Weather & Nature Icons
 */
export const otherWeatherNatureIcons = ["Bone", "Campfire", "Feather"] as const;

/**
 * All Weather & Nature Icon Names
 * Combined list of all available weather & nature icons
 */
export const allWeatherIcons = [
  ...weatherIcons,
  ...natureIcons,
  ...animalIcons,
  ...celestialIcons,
  ...landscapeIcons,
  ...otherWeatherNatureIcons,
] as const;

/**
 * Weather & Nature Icon Specifications:
 * - Size: 32x32px (can be scaled via CSS/Tailwind classes)
 * - Default Color: #343330 (rgb(0.20392157137393951, 0.20000000298023224, 0.1882352977991104))
 * - Stroke Weight: 0.125 (very fine line weight)
 *
 * Usage Notes:
 * - Icons should be exported as SVG files to /public/icons/weather/ or as React components
 * - Icons can be colored using Tailwind text color classes (e.g., text-primary-500, text-foreground)
 * - Icons should maintain aspect ratio when resizing
 * - Use currentColor in SVG for easy theming
 */

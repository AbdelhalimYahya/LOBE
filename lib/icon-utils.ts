import {
  allArrowIcons,
  allBrandIcons,
  allCommerceIcons,
  allDesignIcons,
  allDevelopmentIcons,
  allEducationIcons,
  allGamesIcons,
  allHealthIcons,
  allMapsIcons,
  allMathIcons,
  allOfficeIcons,
  allPeopleIcons,
  allSecurityIcons,
  allTimeIcons,
  allWeatherIcons,
} from "@/lib/design-tokens";
import type { IconName } from "@/components/Icon";

/**
 * Map category names to directory names (for categories with underscores)
 */
const categoryToDirectoryMap: Record<string, string> = {
  weather: "weather_nature",
  health: "health_wellness",
  maps: "maps_travel",
  math: "math_finance",
  office: "office_editing",
  security: "security_warnings",
};

/**
 * Get the path to an icon SVG file
 */
export function getIconPath(
  name: IconName | string,
  category: "arrows" | "brands" | "commerce" | "design" | "development" | "education" | "games" | "health" | "maps" | "math" | "office" | "people" | "security" | "time" | "weather" = "arrows"
): string {
  const directory = categoryToDirectoryMap[category] || category;
  return `/icons/${directory}/${name}.svg`;
}

/**
 * Check if an icon name is valid
 */
export function isValidIconName(name: string): name is IconName {
  return (
    (allArrowIcons as readonly string[]).includes(name) ||
    (allBrandIcons as readonly string[]).includes(name) ||
    (allCommerceIcons as readonly string[]).includes(name) ||
    (allDesignIcons as readonly string[]).includes(name) ||
    (allDevelopmentIcons as readonly string[]).includes(name) ||
    (allEducationIcons as readonly string[]).includes(name) ||
    (allGamesIcons as readonly string[]).includes(name) ||
    (allHealthIcons as readonly string[]).includes(name) ||
    (allMapsIcons as readonly string[]).includes(name) ||
    (allMathIcons as readonly string[]).includes(name) ||
    (allOfficeIcons as readonly string[]).includes(name) ||
    (allPeopleIcons as readonly string[]).includes(name) ||
    (allSecurityIcons as readonly string[]).includes(name) ||
    (allTimeIcons as readonly string[]).includes(name) ||
    (allWeatherIcons as readonly string[]).includes(name)
  );
}

/**
 * Get icon category by icon name (arrows, brands, commerce, design, development, education, games, health, maps, math, office, people, security, time, or weather)
 */
export function getIconCategory(
  name: IconName | string
): "arrows" | "brands" | "commerce" | "design" | "development" | "education" | "games" | "health" | "maps" | "math" | "office" | "people" | "security" | "time" | "weather" {
  if ((allBrandIcons as readonly string[]).includes(name)) {
    return "brands";
  }
  if ((allCommerceIcons as readonly string[]).includes(name)) {
    return "commerce";
  }
  if ((allDesignIcons as readonly string[]).includes(name)) {
    return "design";
  }
  if ((allDevelopmentIcons as readonly string[]).includes(name)) {
    return "development";
  }
  if ((allEducationIcons as readonly string[]).includes(name)) {
    return "education";
  }
  if ((allGamesIcons as readonly string[]).includes(name)) {
    return "games";
  }
  if ((allHealthIcons as readonly string[]).includes(name)) {
    return "health";
  }
  if ((allMapsIcons as readonly string[]).includes(name)) {
    return "maps";
  }
  if ((allMathIcons as readonly string[]).includes(name)) {
    return "math";
  }
  if ((allOfficeIcons as readonly string[]).includes(name)) {
    return "office";
  }
  if ((allPeopleIcons as readonly string[]).includes(name)) {
    return "people";
  }
  if ((allSecurityIcons as readonly string[]).includes(name)) {
    return "security";
  }
  if ((allTimeIcons as readonly string[]).includes(name)) {
    return "time";
  }
  if ((allWeatherIcons as readonly string[]).includes(name)) {
    return "weather";
  }
  return "arrows";
}

/**
 * Get detailed icon subcategory by icon name
 */
export function getIconSubCategory(name: IconName | string): string {
  // Check if it's a brand icon first
  if ((allBrandIcons as readonly string[]).includes(name)) {
    if (name.includes("Logo")) {
      // This is a brand icon - return detailed category
      if (
        [
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
        ].includes(name)
      ) {
        return "social-media";
      }
      if (name.startsWith("Google")) return "google";
      if (name.startsWith("Microsoft")) return "microsoft";
      if (
        [
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
        ].includes(name)
      ) {
        return "development";
      }
      // Add more categories as needed
      return "brand";
    }
  }

  // Check if it's a commerce icon
  if ((allCommerceIcons as readonly string[]).includes(name)) {
    // Clothing & Fashion
    if (
      [
        "TShirt",
        "Sunglasses",
        "Sock",
        "SneakerMove",
        "Sneaker",
        "ShirtFolded",
        "Pants",
      ].includes(name)
    ) {
      return "clothing";
    }
    // Shopping & Retail
    if (
      [
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
      ].includes(name)
    ) {
      return "shopping";
    }
    // Tools & Hardware
    if (
      [
        "Wrench",
        "Toolbox",
        "Tire",
        "Shovel",
        "Screwdriver",
        "PipeWrench",
        "Pipe",
      ].includes(name)
    ) {
      return "tools";
    }
    // Food & Beverage
    if (
      [
        "Wine",
        "TeaBag",
        "Popsicle",
        "Popcorn",
        "Pizza",
        "PintGlass",
        "Pepper",
        "OrangeSlice",
        "Orange",
      ].includes(name)
    ) {
      return "food";
    }
    // Home & Furniture
    if (
      [
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
      ].includes(name)
    ) {
      return "home";
    }
    // Transportation
    if (["TruckTrailer", "Tractor", "Seatbelt"].includes(name)) {
      return "transportation";
    }
    return "commerce";
  }

  // Check if it's a design icon
  if ((allDesignIcons as readonly string[]).includes(name)) {
    // Basic Shapes
    if (
      [
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
      ].includes(name)
    ) {
      return "shapes";
    }
    // Drawing Tools
    if (
      [
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
      ].includes(name)
    ) {
      return "drawing";
    }
    // Paint Tools
    if (
      [
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
      ].includes(name)
    ) {
      return "paint";
    }
    // Selection Tools
    if (
      [
        "Selection",
        "SelectionAll",
        "SelectionBackground",
        "SelectionForeground",
        "SelectionInverse",
        "SelectionPlus",
        "SelectionSlash",
        "Lasso",
        "BoundingBox",
      ].includes(name)
    ) {
      return "selection";
    }
    // Layout & Grid
    if (
      [
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
      ].includes(name)
    ) {
      return "layout";
    }
    // Alignment
    if (name.startsWith("Align")) {
      return "alignment";
    }
    // Transform
    if (
      [
        "Resize",
        "FlipHorizontal",
        "FlipVertical",
        "Crop",
        "Ruler",
        "Scissors",
        "Placeholder",
        "Blueprint",
        "Perspective",
      ].includes(name)
    ) {
      return "transform";
    }
    // Path Operations
    if (
      [
        "Unite",
        "UniteSquare",
        "Subtract",
        "SubtractSquare",
        "Intersect",
        "IntersectSquare",
        "IntersectThree",
        "Exclude",
        "ExcludeSquare",
      ].includes(name)
    ) {
      return "path-operations";
    }
    // Line Tools
    if (
      [
        "LineSegment",
        "LineSegments",
        "LineVertical",
        "BezierCurve",
        "Scribble",
        "ScribbleLoop",
      ].includes(name)
    ) {
      return "lines";
    }
    // Shape Patterns
    if (
      [
        "Shapes",
        "CirclesThree",
        "CirclesThreePlus",
        "CirclesFour",
        "DiamondsFour",
        "Notches",
      ].includes(name)
    ) {
      return "patterns";
    }
    // Special Tools
    if (
      [
        "MagicWand",
        "CompassTool",
        "Angle",
        "Stamp",
        "Vignette",
        "TextAUnderline",
      ].includes(name)
    ) {
      return "special";
    }
    // Split & Drop
    if (
      [
        "SplitHorizontal",
        "SplitVertical",
        "DropHalf",
        "DropHalfBottom",
        "DropSlash",
      ].includes(name)
    ) {
      return "split";
    }
    // View
    if (["Eye", "EyeClosed", "EyeSlash"].includes(name)) {
      return "view";
    }
    return "design";
  }

  // Check if it's a development icon
  if ((allDevelopmentIcons as readonly string[]).includes(name)) {
    // Code & Syntax
    if (
      [
        "Code",
        "CodeBlock",
        "CodeSimple",
        "BracketsAngle",
        "BracketsCurly",
        "BracketsRound",
        "BracketsSquare",
      ].includes(name)
    ) {
      return "code";
    }
    // Git Operations
    if (
      [
        "GitBranch",
        "GitCommit",
        "GitDiff",
        "GitFork",
        "GitMerge",
        "GitPullRequest",
      ].includes(name)
    ) {
      return "git";
    }
    // Terminal
    if (["Terminal", "TerminalWindow"].includes(name)) {
      return "terminal";
    }
    // Hardware
    if (
      ["Cpu", "GraphicsCard", "Database", "Magnet", "MagnetStraight"].includes(
        name
      )
    ) {
      return "hardware";
    }
    // Data Structures
    if (["Binary", "TreeStructure"].includes(name)) {
      return "data-structures";
    }
    // Bug & Debug
    if (["Bug", "BugBeetle", "BugDroid", "Robot"].includes(name)) {
      return "debug";
    }
    return "development";
  }

  // Check if it's an education icon
  if ((allEducationIcons as readonly string[]).includes(name)) {
    // Books & Reading
    if (
      [
        "Book",
        "BookBookmark",
        "BookOpen",
        "BookOpenText",
        "BookOpenUser",
        "Books",
      ].includes(name)
    ) {
      return "books";
    }
    // Bookmarks
    if (
      ["Bookmark", "BookmarkSimple", "Bookmarks", "BookmarksSimple"].includes(
        name
      )
    ) {
      return "bookmarks";
    }
    // Classroom & Teaching
    if (
      [
        "Chalkboard",
        "ChalkboardSimple",
        "ChalkboardTeacher",
        "Lectern",
      ].includes(name)
    ) {
      return "classroom";
    }
    // Learning & Assessment
    if (["Exam", "Certificate", "GraduationCap"].includes(name)) {
      return "learning";
    }
    // People
    if (name === "Student") {
      return "people";
    }
    // Media
    if (name === "Video") {
      return "media";
    }
    return "education";
  }

  // Check if it's a games icon
  if ((allGamesIcons as readonly string[]).includes(name)) {
    // Sports Equipment & Balls
    if (
      [
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
      ].includes(name)
    ) {
      return "sports";
    }
    // Gaming Equipment & Controllers
    if (
      ["GameController", "Joystick", "PuzzlePiece", "Checkerboard"].includes(
        name
      )
    ) {
      return "gaming";
    }
    // Cards & Dice
    if (
      [
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
      ].includes(name)
    ) {
      return "cards";
    }
    // Hearts & Emotions
    if (
      [
        "Heart",
        "HeartBreak",
        "HeartHalf",
        "HeartStraight",
        "HeartStraightBreak",
        "MaskHappy",
        "MaskSad",
      ].includes(name)
    ) {
      return "emotions";
    }
    // Fantasy & Adventure
    if (
      [
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
      ].includes(name)
    ) {
      return "fantasy";
    }
    // Virtual Reality
    if (["VirtualReality", "GoogleCardboardLogo"].includes(name)) {
      return "vr";
    }
    // Achievements & Awards
    if (
      ["Trophy", "Medal", "MedalMilitary", "Ranking"].includes(name)
    ) {
      return "achievements";
    }
    // Recreation & Activities
    if (
      [
        "Parachute",
        "PersonSimpleSki",
        "PersonSimpleSnowboard",
        "Horse",
        "TreePalm",
      ].includes(name)
    ) {
      return "recreation";
    }
    // Toys & Fun Items
    if (
      [
        "Lego",
        "LegoSmiley",
        "Pinwheel",
        "Confetti",
        "DiscoBall",
        "Spiral",
        "FinnTheHuman",
        "CubeFocus",
        "Drone",
      ].includes(name)
    ) {
      return "toys";
    }
    return "games";
  }

  // Check if it's a health icon
  if ((allHealthIcons as readonly string[]).includes(name)) {
    // Medical Equipment & Tools
    if (
      [
        "Stethoscope",
        "Microscope",
        "TestTube",
        "Flask",
        "Syringe",
        "Prescription",
      ].includes(name)
    ) {
      return "medical";
    }
    // Medications & Treatments
    if (
      ["Pill", "FirstAid", "FirstAidKit", "Bandaids", "Lifebuoy"].includes(
        name
      )
    ) {
      return "medications";
    }
    // Body Parts & Anatomy
    if (
      ["Brain", "Dna", "Tooth", "Heartbeat", "Pulse"].includes(name)
    ) {
      return "anatomy";
    }
    // Emergency Services
    if (["Ambulance", "FireTruck", "Asclepius"].includes(name)) {
      return "emergency";
    }
    // Wellness & Hygiene
    if (
      [
        "HandSoap",
        "HandHeart",
        "FaceMask",
        "Toilet",
        "ToiletPaper",
        "Bed",
      ].includes(name)
    ) {
      return "wellness";
    }
    // Fitness & Exercise
    if (name === "Barbell") {
      return "fitness";
    }
    // Health Conditions
    if (name === "Virus") {
      return "conditions";
    }
    return "health";
  }

  // Check if it's a maps icon
  if ((allMapsIcons as readonly string[]).includes(name)) {
    // Vehicles & Transportation
    if (
      [
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
      ].includes(name)
    ) {
      return "vehicles";
    }
    // Maps & Navigation
    if (
      [
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
      ].includes(name)
    ) {
      return "navigation";
    }
    // Globes & World
    if (
      [
        "Globe",
        "GlobeHemisphereEast",
        "GlobeHemisphereWest",
        "GlobeSimple",
        "GlobeSimpleX",
        "GlobeStand",
        "GlobeX",
      ].includes(name)
    ) {
      return "globes";
    }
    // Flags
    if (
      ["Flag", "FlagBanner", "FlagBannerFold", "FlagCheckered", "FlagPennant"].includes(name)
    ) {
      return "flags";
    }
    // Buildings & Landmarks
    if (
      [
        "Church",
        "Hospital",
        "House",
        "HouseLine",
        "HouseSimple",
        "Lighthouse",
        "Mosque",
        "Synagogue",
      ].includes(name)
    ) {
      return "buildings";
    }
    // Travel & Luggage
    if (
      [
        "Suitcase",
        "SuitcaseRolling",
        "SuitcaseSimple",
        "Trolley",
        "TrolleySuitcase",
        "Lockers",
      ].includes(name)
    ) {
      return "luggage";
    }
    // Camping & Outdoor
    if (["Tent", "Tipi", "Anchor", "AnchorSimple"].includes(name)) {
      return "camping";
    }
    // Road & Traffic
    if (
      [
        "TrafficCone",
        "TrafficSign",
        "TrafficSignal",
        "RoadHorizon",
        "Path",
        "Park",
        "Barricade",
        "Signpost",
        "Steps",
      ].includes(name)
    ) {
      return "traffic";
    }
    // Fuel & Energy
    if (["GasCan", "GasPump", "ChargingStation", "Engine"].includes(name)) {
      return "fuel";
    }
    // Public Transport
    if (["Subway", "Elevator", "EscalatorDown", "EscalatorUp", "Seat"].includes(name)) {
      return "public-transport";
    }
    // Space Travel
    if (["Rocket", "RocketLaunch"].includes(name)) {
      return "space";
    }
    // Miscellaneous Travel
    if (
      [
        "AirTrafficControl",
        "Headlights",
        "SteeringWheel",
        "ShippingContainer",
        "SwimmingPool",
        "Sailboat",
        "Goggles",
      ].includes(name)
    ) {
      return "misc";
    }
    return "maps";
  }

  // Check if it's a math icon
  if ((allMathIcons as readonly string[]).includes(name)) {
    // Numbers
    if (
      [
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
      ].includes(name)
    ) {
      return "numbers";
    }
    // Number Circles
    if (
      [
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
      ].includes(name)
    ) {
      return "number-circles";
    }
    // Number Squares
    if (
      [
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
      ].includes(name)
    ) {
      return "number-squares";
    }
    // Basic Math Operations
    if (
      [
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
      ].includes(name)
    ) {
      return "operations";
    }
    // Comparison Operators
    if (
      [
        "GreaterThan",
        "GreaterThanOrEqual",
        "LessThan",
        "LessThanOrEqual",
      ].includes(name)
    ) {
      return "comparison";
    }
    // Set Theory
    if (
      [
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
      ].includes(name)
    ) {
      return "set-theory";
    }
    // Mathematical Symbols
    if (
      [
        "Pi",
        "Sigma",
        "Infinity",
        "Radical",
        "Function",
        "Tilde",
        "Percent",
      ].includes(name)
    ) {
      return "symbols";
    }
    // Charts & Graphs
    if (
      [
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
      ].includes(name)
    ) {
      return "charts";
    }
    // Financial
    if (["Bank", "Calculator", "TrendUp", "TrendDown", "Table"].includes(name)) {
      return "financial";
    }
    // X & Close
    if (["X", "XCircle", "XSquare"].includes(name)) {
      return "close";
    }
    return "math";
  }

  // Check if it's an office icon
  if ((allOfficeIcons as readonly string[]).includes(name)) {
    // Files
    if (
      [
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
      ].includes(name)
    ) {
      return "files";
    }
    // Folders
    if (
      [
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
      ].includes(name)
    ) {
      return "folders";
    }
    // Text Formatting
    if (
      [
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
      ].includes(name)
    ) {
      return "text-formatting";
    }
    // Lists
    if (
      [
        "List",
        "ListBullets",
        "ListChecks",
        "ListDashes",
        "ListNumbers",
        "ListPlus",
      ].includes(name)
    ) {
      return "lists";
    }
    // Clipboard & Copy
    if (
      ["Clipboard", "ClipboardText", "Copy", "CopySimple"].includes(name)
    ) {
      return "clipboard";
    }
    // Notes
    if (
      ["Note", "NoteBlank", "NotePencil", "Notebook", "Notepad"].includes(name)
    ) {
      return "notes";
    }
    // Archive & Storage
    if (
      [
        "Archive",
        "BoxArrowDown",
        "BoxArrowUp",
        "Briefcase",
        "BriefcaseMetal",
      ].includes(name)
    ) {
      return "archive";
    }
    // Cards
    if (["Cards", "CardsThree"].includes(name)) {
      return "cards";
    }
    // Filters
    if (
      ["Funnel", "FunnelSimple", "FunnelSimpleX", "FunnelX"].includes(name)
    ) {
      return "filters";
    }
    // Kanban
    if (["Kanban"].includes(name)) {
      return "kanban";
    }
    // Paperclip
    if (["Paperclip", "PaperclipHorizontal"].includes(name)) {
      return "paperclip";
    }
    // Paragraph
    if (["Paragraph"].includes(name)) {
      return "paragraph";
    }
    // Presentations
    if (
      [
        "Presentation",
        "PresentationChart",
        "ProjectorScreen",
        "ProjectorScreenChart",
      ].includes(name)
    ) {
      return "presentations";
    }
    // Printer
    if (["Printer"].includes(name)) {
      return "printer";
    }
    // Push Pins
    if (
      [
        "PushPin",
        "PushPinSimple",
        "PushPinSimpleSlash",
        "PushPinSlash",
      ].includes(name)
    ) {
      return "push-pins";
    }
    // Sort
    if (["SortAscending", "SortDescending"].includes(name)) {
      return "sort";
    }
    // Tray
    if (["Tray", "TrayArrowDown", "TrayArrowUp"].includes(name)) {
      return "tray";
    }
    // Trash
    if (["Trash", "TrashSimple"].includes(name)) {
      return "trash";
    }
    // Floppy Disk
    if (["FloppyDisk", "FloppyDiskBack"].includes(name)) {
      return "floppy-disk";
    }
    // Cursor
    if (["CursorText"].includes(name)) {
      return "cursor";
    }
    return "office";
  }

  // Check if it's a people icon
  if ((allPeopleIcons as readonly string[]).includes(name)) {
    // Users
    if (["Users", "UsersFour", "UsersThree"].includes(name)) {
      return "users";
    }
    // User
    if (
      [
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
      ].includes(name)
    ) {
      return "user";
    }
    // Person
    if (["Person", "PersonArmsSpread"].includes(name)) {
      return "person";
    }
    // PersonSimple
    if (
      [
        "PersonSimple",
        "PersonSimpleBike",
        "PersonSimpleCircle",
        "PersonSimpleHike",
        "PersonSimpleRun",
        "PersonSimpleSwim",
        "PersonSimpleTaiChi",
        "PersonSimpleThrow",
        "PersonSimpleWalk",
      ].includes(name)
    ) {
      return "person-simple";
    }
    // Smiley
    if (
      [
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
      ].includes(name)
    ) {
      return "smiley";
    }
    // Hand
    if (
      [
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
      ].includes(name)
    ) {
      return "hand";
    }
    // Hands
    if (["HandsClapping", "HandsPraying", "Handshake"].includes(name)) {
      return "hands";
    }
    // Gender
    if (
      [
        "GenderFemale",
        "GenderIntersex",
        "GenderMale",
        "GenderNeuter",
        "GenderNonbinary",
        "GenderTransgender",
      ].includes(name)
    ) {
      return "gender";
    }
    // Identification
    if (["IdentificationBadge", "IdentificationCard"].includes(name)) {
      return "identification";
    }
    // Wheelchair
    if (["Wheelchair", "WheelchairMotion"].includes(name)) {
      return "wheelchair";
    }
    // Other
    if (["Baby", "Eyes", "Footprints"].includes(name)) {
      return "other";
    }
    return "people";
  }

  // Check if it's a security icon
  if ((allSecurityIcons as readonly string[]).includes(name)) {
    // Warning
    if (["Warning", "WarningCircle", "WarningDiamond", "WarningOctagon"].includes(name)) {
      return "warning";
    }
    // Shield
    if (
      [
        "Shield",
        "ShieldCheck",
        "ShieldCheckered",
        "ShieldChevron",
        "ShieldPlus",
        "ShieldSlash",
        "ShieldStar",
        "ShieldWarning",
      ].includes(name)
    ) {
      return "shield";
    }
    // Seal
    if (["Seal", "SealCheck", "SealPercent", "SealQuestion", "SealWarning"].includes(name)) {
      return "seal";
    }
    // Lock
    if (
      [
        "Lock",
        "LockKey",
        "LockKeyOpen",
        "LockLaminated",
        "LockLaminatedOpen",
        "LockOpen",
        "LockSimple",
        "LockSimpleOpen",
      ].includes(name)
    ) {
      return "lock";
    }
    // Key
    if (["Key", "Keyhole", "Password"].includes(name)) {
      return "key";
    }
    // Security
    if (
      ["Detective", "Fingerprint", "FingerprintSimple", "SecurityCamera", "Vault", "Wall"].includes(
        name
      )
    ) {
      return "security";
    }
    // Prohibit
    if (["Prohibit", "ProhibitInset"].includes(name)) {
      return "prohibit";
    }
    // Question
    if (["Question", "QuestionMark"].includes(name)) {
      return "question";
    }
    // Other
    if (
      [
        "Biohazard",
        "ExclamationMark",
        "FalloutShelter",
        "FireExtinguisher",
        "Info",
        "Radioactive",
        "Siren",
      ].includes(name)
    ) {
      return "other";
    }
    return "security";
  }

  // Check if it's a time icon
  if ((allTimeIcons as readonly string[]).includes(name)) {
    // Clock
    if (
      [
        "Clock",
        "ClockAfternoon",
        "ClockClockwise",
        "ClockCounterClockwise",
        "ClockCountdown",
        "ClockUser",
      ].includes(name)
    ) {
      return "clock";
    }
    // Hourglass
    if (
      [
        "Hourglass",
        "HourglassHigh",
        "HourglassLow",
        "HourglassMedium",
        "HourglassSimple",
        "HourglassSimpleHigh",
        "HourglassSimpleLow",
        "HourglassSimpleMedium",
      ].includes(name)
    ) {
      return "hourglass";
    }
    // Calendar
    if (
      [
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
      ].includes(name)
    ) {
      return "calendar";
    }
    // Other
    if (["Alarm", "Timer", "Watch"].includes(name)) {
      return "other";
    }
    return "time";
  }

  // Check if it's a weather icon
  if ((allWeatherIcons as readonly string[]).includes(name)) {
    // Weather
    if (
      [
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
      ].includes(name)
    ) {
      return "weather";
    }
    // Nature
    if (
      [
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
      ].includes(name)
    ) {
      return "nature";
    }
    // Animals
    if (
      [
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
      ].includes(name)
    ) {
      return "animals";
    }
    // Celestial
    if (
      [
        "Atom",
        "Meteor",
        "Planet",
        "ShootingStar",
        "Sparkle",
        "StarFour",
      ].includes(name)
    ) {
      return "celestial";
    }
    // Landscape
    if (["Island", "Mountains"].includes(name)) {
      return "landscape";
    }
    // Other
    if (["Bone", "Campfire", "Feather"].includes(name)) {
      return "other";
    }
    return "weather";
  }

  // Arrow icon categories
  if (name.startsWith("Caret") && !name.includes("Circle")) {
    if (name.includes("Double")) return "double-caret";
    return "caret";
  }
  if (name.startsWith("CaretCircle")) return "circle-caret";
  if (name.startsWith("Arrow") && !name.startsWith("Arrows")) {
    if (name.includes("Line")) return "line-arrow";
    if (name.includes("Square")) return "square-arrow";
    if (name.includes("Circle")) return "circle-arrow";
    if (name.includes("U")) return "u-arrow";
    if (name.includes("Elbow")) return "elbow-arrow";
    if (name.includes("Bend")) return "bend-arrow";
    if (name.includes("Arc")) return "arc-arrow";
    if (name.includes("Fat")) return "fat-arrow";
    return "basic-arrow";
  }
  if (name.startsWith("Arrows")) {
    if (name.includes("In") || name.includes("Out")) return "in-out-arrow";
    if (name.includes("Merge") || name.includes("Split"))
      return "special-arrow";
    if (name.includes("Clockwise") || name.includes("CounterClockwise"))
      return "special-arrow";
    return "directional-arrow";
  }
  return "special";
}

/**
 * Icon export helper
 * Can be used to generate icon components dynamically
 */
export const iconHelpers = {
  getPath: getIconPath,
  isValid: isValidIconName,
  getCategory: getIconCategory,
  getSubCategory: getIconSubCategory,
} as const;

# Search Feature - Quick Reference Guide

## How to Use the New Search Feature

### 1. **Basic Search**
```
Type in search box → Press Enter OR Click "بحث" button
```

### 2. **Using Suggestions**
```
Type in search box → Click on any suggestion from dropdown
```

### 3. **Clear Search**
```
Click "مسح البحث" badge OR Click "إعادة تعيين الفلاتر"
```

## What Changed

### Before
- Search box only showed suggestions
- No actual filtering of products
- Had to click on suggestions to view individual products

### After
- Search box filters ALL products across all categories
- Press Enter or click "بحث" to search
- Results show on the same page with clear indicators
- Can clear search easily to return to all products

## API Parameters Used

| Product Type | Endpoint | Search Parameter |
|-------------|----------|------------------|
| Skincare | `/api/v1/skincare/skincare_products/` | `?search={query}` |
| Makeup | `/api/v1/makeup/makeup_products/` | `?search={query}` |
| Haircare | `/api/v1/haircare/haircare_products/` | `?search={query}` |

## Additional Parameters Supported

All endpoints support these query parameters:
- `page` - Page number for pagination
- `size` - Number of results per page
- `search` - Search term (NEW - now being used!)
- `brand` - Filter by brand ID
- `category` - Filter by category ID
- `ordering` - Sort results
- `skin_type` - Filter by skin type (skincare only)
- `type` - Filter by type (makeup & skincare)

## Code Changes Summary

### New State Variables
```typescript
const [activeSearchQuery, setActiveSearchQuery] = useState("");
```

### Updated API Calls
```typescript
const searchParam = activeSearchQuery.trim() 
  ? `&search=${encodeURIComponent(activeSearchQuery.trim())}` 
  : "";

const url = `${API_BASE}/v1/{category}/{category}_products/?page=${page}&size=${size}${searchParam}`;
```

### New UI Elements
1. Search button next to input field
2. Clear search badge when search is active
3. Dynamic page title showing search term
4. Updated subtitle for search results

## Files Modified
- `app/products/page.tsx` - Main products page component

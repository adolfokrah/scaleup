# Google Maps Block - Setup Guide

## 🗺️ Features

The Google Maps block includes:
- **Custom Styling** with your secondary color (`#291B00`)
- **Responsive Design** with multiple height options
- **Interactive Controls** (zoom, street view, etc.) - optional
- **Custom Markers** styled with your secondary color
- **Info Windows** with address information
- **Anchor Link Support** for page navigation
- **Loading States** with animated spinner

## 🔧 Setup Requirements

### 1. Google Maps API Key

You need a Google Maps JavaScript API key. Get one from:
[Google Cloud Console - Maps JavaScript API](https://console.cloud.google.com/google/maps-apis/apis/maps-backend.googleapis.com)

### 2. Environment Variables

Add to your `.env.local` file:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## 📝 Usage

### In the Admin Interface

1. **Add Google Maps Block** to any page
2. **Fill Required Fields**:
   - **Address**: Full address to display
   - **Latitude**: Latitude coordinate (e.g., 40.7128)
   - **Longitude**: Longitude coordinate (e.g., -74.0060)

3. **Optional Configuration**:
   - **Title**: Section title above the map
   - **ID**: For anchor linking (e.g., "location-map")
   - **Zoom**: Map zoom level (1-20)
   - **Height**: Small, Medium, Large, or Extra Large
   - **Show Controls**: Enable/disable map controls
   - **Enable Interaction**: Allow user interaction

## 🎨 Styling

The map uses your **secondary color** (`#291B00`) for:
- Text labels and UI elements
- Custom marker fill color
- Info window content
- Section titles
- Loading spinner

## 📍 Finding Coordinates

### Method 1: Google Maps
1. Go to [Google Maps](https://maps.google.com)
2. Right-click on your location
3. Copy the coordinates from the context menu

### Method 2: Coordinates Tools
- Use tools like [GPS Coordinates](https://www.gps-coordinates.net/)
- Enter address to get lat/lng values

## 🔗 Anchor Link Example

Set **ID** to `office-location`, then link to it:
```html
<a href="#office-location">View Our Office</a>
```

## ⚙️ Technical Details

- **API**: Google Maps JavaScript API
- **Loading**: Async script loading with callback
- **Performance**: Single script load for multiple maps
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Mobile**: Responsive and touch-friendly

## 🎯 Example Configuration

```
Title: Our Office Location
Address: 123 Business Ave, Suite 100, City, ST 12345
Latitude: 40.7128
Longitude: -74.0060
Zoom: 15
Height: Medium
Show Controls: ✓
Enable Interaction: ✓
ID: office-location
```

The Google Maps block is now ready to use! 🚀

# Anchor Link Navigation Guide

## How to Link to Another Page with Anchor

To navigate to `programs/#work-force` from navbar menus, follow these steps:

### 1. In the Admin Interface

When creating/editing a menu item in the Header navigation:

1. **Select Link Type**: Choose "Internal link" 
2. **Select Document**: Choose the "Programs" page
3. **Add Anchor Link**: In the "Anchor Link (Optional)" field, enter `#work-force`
4. **Label**: Set the menu label (e.g., "Workforce Program")

### 2. The Result

This will generate a link that navigates to `/programs#work-force`, which will:
- Load the Programs page
- Automatically scroll to the section with ID "work-force"

### 3. Setting Up the Target Section

On the Programs page, make sure you have a Content block or MediaContent block with:
- **ID field** set to `work-force` (without the #)

### 4. Alternative: Custom URL

You can also use the "Custom URL" option and enter:
```
/programs#work-force
```

## Examples

### Navigation Menu Setup
```
Menu Item 1:
- Type: Internal link
- Document: Programs page
- Anchor: #workforce-development
- Label: "Workforce Development"

Menu Item 2:
- Type: Internal link  
- Document: Programs page
- Anchor: #skill-training
- Label: "Skill Training"
```

### Target Sections
```
Content Block 1:
- ID: workforce-development
- Content: Workforce development program details...

MediaContent Block 1:
- ID: skill-training
- Content: Skill training program info...
```

### Generated Links
- Menu Item 1 → `/programs#workforce-development`
- Menu Item 2 → `/programs#skill-training`

## Benefits

✅ **Smooth navigation** between pages and sections
✅ **Deep linking** support for specific page sections  
✅ **SEO friendly** URLs with descriptive anchors
✅ **User-friendly** direct access to relevant content
✅ **Admin-friendly** easy setup in Payload CMS

The anchor link functionality now works across all link fields throughout your site!

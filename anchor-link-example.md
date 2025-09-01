# Anchor Link Implementation

## How to Use

The Content block now supports anchor links! You can:

1. **Set an ID** on any Content block through the admin interface:
   - When editing a page, add/edit a Content block
   - Look for the "ID" field at the top of the block configuration
   - Enter a unique ID like `about-us` or `team-section`

2. **Link to that section** from anywhere:
   ```html
   <a href="#about-us">Go to About Us</a>
   ```
   Or in markdown:
   ```markdown
   [Go to About Us](#about-us)
   ```

3. **The ID gets rendered** as the `id` attribute on the Content block's container:
   ```html
   <div id="about-us" class="container mx-auto">
     <!-- Content block content -->
   </div>
   ```

## Example Use Cases

- Navigation menus that jump to sections
- "Back to top" links
- Internal page navigation
- Table of contents links
- Call-to-action buttons that scroll to specific sections

## Implementation Details

- **Config**: Added `id` field to `/src/blocks/Content/config.ts`
- **Component**: Updated `/src/blocks/Content/Component.tsx` to render the ID
- **Types**: Generated updated TypeScript types with `pnpm generate:types`
- **Validation**: The field is optional and accepts any string value

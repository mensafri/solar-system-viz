# OG Image Placeholder

This file serves as a placeholder for your Open Graph image.

## Required Image Specifications

- **Filename**: `og-image.png`
- **Dimensions**: 1200 x 630 pixels
- **Format**: PNG or JPG
- **Location**: `/public/og-image.png`

## How to Create Your OG Image

### Option 1: Screenshot Your App
1. Run your app: `npm run dev`
2. Open in browser and navigate to a good view of the solar system
3. Take a screenshot (use browser dev tools for specific dimensions)
4. Crop/resize to 1200x630px
5. Add text overlay with title if desired
6. Save as `og-image.png` in the `/public` folder

### Option 2: Use Design Tools
Create a custom image using:
- **Canva**: Use "Facebook Post" template (1200x630)
- **Figma**: Create a frame with dimensions 1200x630
- **Photoshop/GIMP**: Create new image 1200x630px

### Recommended Content
- Beautiful solar system visualization
- App title: "Solar System Visualization"
- Tagline: "Interactive 3D Space Explorer"
- Dark space background
- Vibrant planet colors
- Professional typography

### Design Tips
- Keep important elements centered (safe zone: 1200x600)
- Use high contrast for readability
- Avoid small text (it will be displayed small in feeds)
- Test on both light and dark backgrounds
- Make it eye-catching to stand out in social feeds

## Testing Your Image

After creating the image:
1. Place it in `/public/og-image.png`
2. Build and deploy your app
3. Test with:
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

The image will appear when sharing your site on:
- Facebook, Instagram, WhatsApp
- Twitter/X
- LinkedIn
- Discord, Slack
- iMessage, Telegram
- And other social platforms

## Current Status

⚠️ **Action Required**: Create `og-image.png` and place it in the `/public` folder.

Until then, social media previews will show without an image or use a default fallback.

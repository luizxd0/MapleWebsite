# Release Guide

This guide will help you publish the MapleStory v28 Website for public use.

## Option 1: GitHub Release

### Step 1: Initialize Git Repository (if not already done)

```bash
cd website
git init
git add .
git commit -m "Initial commit: MapleStory v28 Website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `maplestory-v28-website` or `maplestory-website`
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 4: Create a Release

1. Go to your repository on GitHub
2. Click on "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `MapleStory v28 Website v1.0.0`
5. Description: Copy from CHANGELOG.md
6. Click "Publish release"

## Option 2: NPM Package (Optional)

If you want to publish as an npm package:

### Step 1: Update package.json

Add repository information:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME#readme"
}
```

### Step 2: Publish to npm

```bash
npm login
npm publish
```

**Note**: Make sure the package name is unique. You may need to change it in package.json.

## Option 3: Standalone Release (ZIP)

### Create Release Archive

```bash
# On Windows (PowerShell)
Compress-Archive -Path website\* -DestinationPath maplestory-website-v1.0.0.zip

# On Linux/Mac
cd website
zip -r ../maplestory-website-v1.0.0.zip . -x "node_modules/*" ".env" "client/dist/*"
```

## Pre-Release Checklist

Before releasing, ensure:

- [ ] All sensitive data removed (no real passwords in code)
- [ ] `.env` file is in `.gitignore` (already done)
- [ ] `.env.example` is documented in README (already done)
- [ ] README.md is complete and accurate
- [ ] All features are working
- [ ] Code is clean and commented
- [ ] License file is included
- [ ] CHANGELOG.md is up to date

## Post-Release

After publishing:

1. **Update Documentation**: Keep README.md updated with any changes
2. **Monitor Issues**: Respond to user questions and bug reports
3. **Version Control**: Use semantic versioning (v1.0.0, v1.1.0, v2.0.0, etc.)
4. **Tag Releases**: Tag each release in git for easy reference

## Example GitHub Release Notes

```markdown
# MapleStory v28 Website v1.0.0

A modern, full-stack website for MapleStory v28 private servers.

## Features
- User registration and login
- Password management
- Account dashboard with NX credits
- Downloads page
- Modern, responsive UI

## Installation

\`\`\`bash
cd website
npm install
# Create .env file (see README.md)
npm run dev
\`\`\`

## Requirements
- Node.js v18+
- MySQL database
- MapleStory v28 game server database

Developed by Lulubot
```

## License

This project uses the MIT License. Make sure to include the LICENSE file in your release.

---

**Developed by Lulubot**

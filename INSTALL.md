# Installation Guide

Step-by-step guide to install and set up the MapleStory v28 Website.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** v18 or higher installed ([Download](https://nodejs.org/))
- **MySQL** database running (same as your game server)
- **npm** (comes with Node.js) or **yarn**

## Step 1: Download/Clone the Project

### Option A: Clone from GitHub
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME/website
```

### Option B: Download ZIP
1. Download the repository as ZIP
2. Extract it
3. Navigate to the `website` folder

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies for both frontend and backend.

## Step 3: Configure Environment

Create a `.env` file in the `website` folder:

**Windows (PowerShell):**
```powershell
New-Item -Path .env -ItemType File
```

**Linux/Mac:**
```bash
touch .env
```

Then add the following content to `.env`:

```env
# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=maplestory

# Server Configuration
PORT=3000
SESSION_SECRET=generate-a-random-secret-key-here

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

**Important**: 
- Replace `your_mysql_password` with your actual MySQL password
- Replace `generate-a-random-secret-key-here` with a strong random string (for production)
- Ensure `DB_NAME` matches your game server's database name

## Step 4: Verify Database Connection

Make sure your MySQL database:
1. Is running
2. Has the `accounts` table (from your game server)
3. Is accessible with the credentials in your `.env` file

## Step 5: Start the Application

### Development Mode (Recommended for first run)

```bash
npm run dev
```

This starts both:
- Backend server on `http://localhost:3000`
- Frontend on `http://localhost:5173`

### Production Mode

```bash
npm start
```

## Step 6: Access the Website

Open your browser and navigate to:
```
http://localhost:5173
```

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

1. Change `PORT` in `.env` to a different port (e.g., 3001)
2. Update `CORS_ORIGIN` to match the new frontend port
3. Or stop the process using the port

### Database Connection Error

- Verify MySQL is running
- Check database credentials in `.env`
- Ensure the database exists
- Check firewall settings

### Module Not Found Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Errors

```bash
# Clear cache and rebuild
npm run client:build
```

## Next Steps

- Create your first account via the registration page
- Test login functionality
- Customize the design in `client/src/`
- Add your download links in `server/server.js`

## Support

For issues or questions, please check:
- README.md for general information
- GitHub Issues for known problems
- CONTRIBUTING.md for development guidelines

---

**Developed by Lulubot**

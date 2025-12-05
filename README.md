# MapleStory v28 Website

A modern, full-stack website for MapleStory v28 private servers with user authentication, account management, and downloads functionality.

**Developed by Lulubot**

## Features

- 🔐 **User Registration & Login** - Secure account creation with PIN support
- 🔒 **Password Management** - Change password functionality for logged-in users
- 💰 **Account Dashboard** - View NX credits and MaplePoints
- 📥 **Downloads Page** - Display game client and related downloads
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔐 **Secure Authentication** - SHA-512 password hashing (compatible with game server)
- 💾 **Session Management** - Secure session-based authentication
- ⚡ **Fast Development** - React + Vite for lightning-fast development

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL2** for database connectivity
- **SHA-512** password hashing (game server compatible)
- **Express-session** for authentication
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## Prerequisites

- **Node.js** v18 or higher
- **MySQL** database (same as your MapleStory game server)
- **npm** or **yarn**

## Quick Start

### 1. Installation

```bash
cd website
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `website` folder:

```env
# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=maplestory

# Server Configuration
PORT=3000
SESSION_SECRET=your-secret-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 3. Database Setup

Ensure your MySQL database has the `accounts` table with the following structure:

```sql
CREATE TABLE `accounts` (
  `accountID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` tinytext NOT NULL,
  `password` tinytext NOT NULL,
  `pin` tinytext NOT NULL,
  `isLogedIn` tinyint(4) NOT NULL DEFAULT '0',
  `adminLevel` tinyint(4) NOT NULL DEFAULT '0',
  `isBanned` int(11) NOT NULL DEFAULT '0',
  `gender` tinyint(4) NOT NULL DEFAULT '0',
  `dob` int(11) NOT NULL,
  `eula` tinyint(4) NOT NULL,
  `nx` int(11) unsigned NOT NULL DEFAULT '0',
  `maplepoints` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`accountID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

### 4. Start Development Server

```bash
npm run dev
```

This will start:
- **Backend API** on `http://localhost:3000`
- **Frontend** on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start both server and client in development mode (with auto-reload)
- `npm start` - Start both server and client (server without auto-reload)
- `npm run server:dev` - Start only the backend server with auto-reload
- `npm run server:start` - Start only the backend server
- `npm run client:dev` - Start only the frontend client
- `npm run client:build` - Build the frontend for production
- `npm run client:preview` - Preview the production build

## Production Build

### Build Frontend

```bash
npm run client:build
```

The built files will be in `website/client/dist/`

### Deploy Backend

For production, you'll want to:
1. Use a process manager like **PM2** or **systemd**
2. Set up a reverse proxy (nginx/Apache) for the frontend
3. Use HTTPS with proper SSL certificates
4. Update `SESSION_SECRET` to a strong random string
5. Set `secure: true` in session cookie config (requires HTTPS)

## Project Structure

```
website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── ...
│   └── ...
├── server/                 # Backend Express application
│   ├── server.js          # Main server file
│   ├── db.js              # Database connection
│   └── auth.js            # Authentication utilities
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
└── README.md              # This file
```

## API Endpoints

- `GET /` - API information
- `GET /api/health` - Health check
- `POST /api/register` - Register new account
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current authenticated user (with NX/MP)
- `POST /api/change-password` - Change user password (authenticated)
- `GET /api/downloads` - Get downloads list

## Security Features

- **SHA-512 Password Hashing** - Compatible with MapleStory v28 game server
- **Session-based Authentication** - Secure HTTP-only cookies
- **CORS Protection** - Configured for specific origins
- **Input Validation** - Server-side validation for all inputs
- **SQL Injection Protection** - Parameterized queries

## Database Compatibility

This website is designed to work with the same MySQL database as your MapleStory v28 game server. Accounts created on the website can be used directly in the game, and vice versa.

### Default Account Values

When registering, accounts are created with these default values (matching game server constants):

- `pin`: "1111" (user-provided during registration)
- `isLogedIn`: 0
- `adminLevel`: 0
- `isBanned`: 0
- `gender`: 0
- `dob`: 11111111
- `eula`: 0
- `nx`: 0
- `maplepoints`: 0

## Contributing

This project was developed by **Lulubot**. Feel free to fork, modify, and use in your own projects!

## License

Check the LICENSE file in the repository root for license information.

## Support

For issues, questions, or contributions, please refer to the repository's issue tracker.

## Credits

**Developed by Lulubot**

---

**Note**: This website is designed specifically for MapleStory v28 private servers. Ensure your database schema matches the expected structure before use.

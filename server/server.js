/**
 * MapleStory v28 Website - Backend Server
 * Developed by Lulubot
 * 
 * Express.js API server for user registration, authentication, and downloads
 */

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db.js';
import { hashPassword, verifyPassword } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from root directory (website folder)
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Default account values (matching game server constants)
const DEFAULT_VALUES = {
  pin: '1111',
  isLogedIn: 0,
  adminLevel: 0,
  isBanned: 0,
  gender: 0,
  dob: 11111111,
  eula: 0,
  nx: 0,
  maplepoints: 0
};

// Routes

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'MapleStory v28 API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      register: 'POST /api/register',
      login: 'POST /api/login',
      logout: 'POST /api/logout',
      user: 'GET /api/user',
      changePassword: 'POST /api/change-password',
      downloads: 'GET /api/downloads'
    },
    note: 'This is the API server. The frontend should be running on http://localhost:5173'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, pin } = req.body;

    // Validation
    if (!username || !password || !pin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, password, and PIN are required' 
      });
    }

    if (username.length < 3 || username.length > 13) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username must be between 3 and 13 characters' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Validate PIN: must be exactly 4 digits
    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({ 
        success: false, 
        message: 'PIN must be exactly 4 digits' 
      });
    }

    // Check if username already exists
    const [existing] = await db.execute(
      'SELECT accountID FROM accounts WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }

    // Hash password using SHA-512 (same as game server)
    const hashedPassword = hashPassword(password);

    // Insert new account with default values (using user-provided PIN)
    const [result] = await db.execute(
      `INSERT INTO accounts 
       (username, password, pin, isLogedIn, adminLevel, isBanned, gender, dob, eula, nx, maplepoints) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        hashedPassword,
        pin, // Use user-provided PIN instead of default
        DEFAULT_VALUES.isLogedIn,
        DEFAULT_VALUES.adminLevel,
        DEFAULT_VALUES.isBanned,
        DEFAULT_VALUES.gender,
        DEFAULT_VALUES.dob,
        DEFAULT_VALUES.eula,
        DEFAULT_VALUES.nx,
        DEFAULT_VALUES.maplepoints
      ]
    );

    res.json({
      success: true,
      message: 'Account created successfully',
      accountID: result.insertId
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // Get account from database
    const [accounts] = await db.execute(
      'SELECT accountID, username, password, isBanned, isLogedIn FROM accounts WHERE username = ?',
      [username]
    );

    if (accounts.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const account = accounts[0];

    // Verify password
    if (!verifyPassword(password, account.password)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Check if banned
    if (account.isBanned > 0) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account is banned' 
      });
    }

    // Set session
    req.session.userId = account.accountID;
    req.session.username = account.username;

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        accountID: account.accountID,
        username: account.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error logging out' 
      });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Get current user
app.get('/api/user', async (req, res) => {
  if (req.session.userId) {
    try {
      // Get user data including NX credits
      const [accounts] = await db.execute(
        'SELECT accountID, username, nx, maplepoints FROM accounts WHERE accountID = ?',
        [req.session.userId]
      );

      if (accounts.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      const account = accounts[0];
      res.json({
        success: true,
        user: {
          accountID: account.accountID,
          username: account.username,
          nx: account.nx || 0,
          maplepoints: account.maplepoints || 0
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Not authenticated' 
    });
  }
});

// Change password endpoint
app.post('/api/change-password', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'New password must be at least 6 characters' 
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'New password must be different from current password' 
      });
    }

    // Get account from database
    const [accounts] = await db.execute(
      'SELECT accountID, password FROM accounts WHERE accountID = ?',
      [req.session.userId]
    );

    if (accounts.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Account not found' 
      });
    }

    const account = accounts[0];

    // Verify current password
    if (!verifyPassword(currentPassword, account.password)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    // Hash new password using SHA-512 (same as game server)
    const hashedNewPassword = hashPassword(newPassword);

    // Update password in database
    await db.execute(
      'UPDATE accounts SET password = ? WHERE accountID = ?',
      [hashedNewPassword, req.session.userId]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Downloads endpoint
app.get('/api/downloads', (req, res) => {
  res.json({
    success: true,
    downloads: [
      {
        id: 1,
        name: 'MapleStory v28 Client',
        version: 'v28',
        size: '~2.5 GB',
        description: 'Full game client for MapleStory v28',
        downloadUrl: '#',
        updatedAt: '2024-01-01'
      },
      {
        id: 2,
        name: 'Game Launcher',
        version: '1.0.0',
        size: '~50 MB',
        description: 'Official game launcher',
        downloadUrl: '#',
        updatedAt: '2024-01-01'
      },
      {
        id: 3,
        name: 'Patcher',
        version: '1.0.0',
        size: '~10 MB',
        description: 'Game patcher for updates',
        downloadUrl: '#',
        updatedAt: '2024-01-01'
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

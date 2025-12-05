import crypto from 'crypto';

/**
 * Hash password using SHA-512 (same as the game server)
 * @param {string} password - Plain text password
 * @returns {string} - Hex-encoded SHA-512 hash
 */
export function hashPassword(password) {
  const hasher = crypto.createHash('sha512');
  hasher.update(password);
  return hasher.digest('hex');
}

/**
 * Verify password against stored hash
 * @param {string} password - Plain text password
 * @param {string} hash - Stored hash
 * @returns {boolean} - True if password matches
 */
export function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

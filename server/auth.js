import crypto from 'crypto';
import bcrypt from 'bcryptjs';

/**
 * Hash password using SHA-512 (same as the game server)
 * Game server uses: MessageDigest SHA-512 with UTF-8 encoding, then HexTool.toHexString().replace(" ", "").toLowerCase()
 * HexTool.toHexString() returns UPPERCASE with spaces, then spaces removed and lowercased
 * @param {string} password - Plain text password
 * @returns {string} - Hex-encoded SHA-512 hash (lowercase, no spaces)
 */
export function hashPassword(password) {
  if (!password) {
    throw new Error('Password cannot be empty');
  }
  
  const hasher = crypto.createHash('sha512');
  // Explicitly use UTF-8 encoding to match game server's StandardCharsets.UTF_8
  // Note: Node.js crypto.update() with string defaults to UTF-8, but being explicit
  const buffer = Buffer.from(password, 'utf8');
  hasher.update(buffer);
  
  // digest('hex') returns lowercase hex by default, matching game server's final toLowerCase()
  // This matches: HexTool.toHexString().replace(" ", "").toLowerCase()
  return hasher.digest('hex');
}

/**
 * Verify password against stored hash
 * Supports BCrypt ($2a$, $2b$, $2y$), SHA-512 hashes, and plain text passwords
 * @param {string} password - Plain text password
 * @param {string} hash - Stored hash from database
 * @returns {boolean} - True if password matches
 */
export function verifyPassword(password, hash) {
  if (!password || !hash) {
    return false;
  }
  
  // Normalize hash - remove any spaces (but keep case for BCrypt)
  const normalizedHash = hash.replace(/\s+/g, '');
  
  // Check if it's a BCrypt hash (starts with $2a$, $2b$, or $2y$)
  // Game server uses $2y$ format (compatible with $2b$ in bcryptjs)
  if (normalizedHash.length > 3 && 
      normalizedHash.charAt(0) === '$' && 
      normalizedHash.charAt(1) === '2' &&
      (normalizedHash.charAt(2) === 'a' || normalizedHash.charAt(2) === 'b' || normalizedHash.charAt(2) === 'y')) {
    try {
      // bcryptjs can verify $2y$ hashes (they're compatible with $2b$)
      // The library automatically handles the conversion
      return bcrypt.compareSync(password, normalizedHash);
    } catch (error) {
      console.error('BCrypt verification error:', error);
      return false;
    }
  }
  
  // Check if password matches plain text (for legacy accounts)
  if (password === normalizedHash) {
    return true;
  }
  
  // Check SHA-512 hash - compare with normalized hash (lowercase)
  const computedHash = hashPassword(password);
  return computedHash === normalizedHash.toLowerCase();
}

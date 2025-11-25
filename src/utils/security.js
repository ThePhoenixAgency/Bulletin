/**
 * Security utilities for Bulletin application
 * Provides XSS, CSRF, SQL injection protection, and input validation
 * @module utils/security
 * @requires crypto
 */

const crypto = require('crypto');

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} str - Input string to escape
 * @returns {string} Escaped string safe for HTML
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
function escapeHtml(str) {
  if (!str) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(str).replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Escapes JavaScript strings to prevent JS injection
 * @param {string} str - Input string to escape
 * @returns {string} Escaped string safe for JavaScript
 * @example
 * escapeJs('alert("test")')
 * // Returns: 'alert(\\"test\\")'
 */
function escapeJs(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")  
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\//g, '\\/');
}

/**
 * Sanitizes user input by removing dangerous characters and trimming
 * @param {string} input - User input to sanitize
 * @param {Object} options - Sanitization options
 * @param {boolean} options.allowHtml - Allow HTML tags (default: false)
 * @param {number} options.maxLength - Maximum length (default: 10000)
 * @returns {string} Sanitized input
 * @example
 * sanitizeInput('<script>alert(1)</script>')
 * // Returns: 'scriptalert1script'
 */
function sanitizeInput(input, options = {}) {
  const { allowHtml = false, maxLength = 10000 } = options;
  
  if (!input) return '';
  
  let sanitized = String(input).trim();
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  if (!allowHtml) {
    // Remove potentially dangerous tags and scripts
    sanitized = sanitized
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>.*?<\/object>/gi, '')
      .replace(/<embed[^>]*>/gi, '')
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  }
  
  return sanitized;
}

/**
 * Validates email address format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 * @example
 * validateEmail('user@example.com') // true
 * validateEmail('invalid.email') // false
 */
function validateEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL format
 * @example
 * validateUrl('https://example.com') // true
 */
function validateUrl(url) {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Generates CSRF token
 * @param {string} sessionId - Session ID to bind token to
 * @returns {string} CSRF token (hex string)
 * @example
 * const token = generateCsrfToken('session123')
 */
function generateCsrfToken(sessionId) {
  const randomData = crypto.randomBytes(32);
  const hash = crypto.createHash('sha256');
  hash.update(sessionId + randomData.toString('hex'));
  return hash.digest('hex');
}

/**
 * Validates CSRF token
 * @param {string} token - Token to validate
 * @param {string} storedToken - Stored token from session
 * @returns {boolean} True if tokens match
 * @example
 * validateCsrfToken(token, sessionToken) // true
 */
function validateCsrfToken(token, storedToken) {
  if (!token || !storedToken) return false;
  
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  );
}

/**
 * Validates input against SQL injection patterns
 * @param {string} input - Input to validate
 * @returns {boolean} True if input appears safe (contains no SQL keywords)
 * @example
 * isSafeSqlInput('normal text') // true
 * isSafeSqlInput("'; DROP TABLE--") // false
 */
function isSafeSqlInput(input) {
  if (!input) return true;
  
  const dangerousPatterns = [
    /('|(\-\-)|(;)|(\||\|)|(\&\&)|(xp_)|(sp_))/gi,
    /UNION/gi,
    /SELECT/gi,
    /INSERT/gi,
    /UPDATE/gi,
    /DELETE/gi,
    /DROP/gi,
    /CREATE/gi,
    /ALTER/gi,
    /EXEC/gi,
    /EXECUTE/gi,
  ];
  
  const str = String(input);
  return !dangerousPatterns.some(pattern => pattern.test(str));
}

/**
 * Hash password using PBKDF2
 * @param {string} password - Password to hash
 * @param {string} salt - Salt for hashing (if not provided, generates random)
 * @returns {Object} Object with hash and salt
 * @example
 * const { hash, salt } = hashPassword('myPassword')
 */
function hashPassword(password, salt = null) {
  if (!password) throw new Error('Password is required');
  
  const useSalt = salt || crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, useSalt, 100000, 64, 'sha512').toString('hex');
  
  return { hash, salt: useSalt };
}

/**
 * Verifies password against stored hash
 * @param {string} password - Password to verify
 * @param {string} hash - Stored hash
 * @param {string} salt - Stored salt
 * @returns {boolean} True if password matches
 * @example
 * verifyPassword('myPassword', storedHash, storedSalt) // true
 */
function verifyPassword(password, hash, salt) {
  if (!password || !hash || !salt) return false;
  
  const { hash: newHash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(newHash), Buffer.from(hash));
}

/**
 * Content Security Policy headers
 * @returns {Object} CSP headers for Express response
 * @example
 * app.use((req, res, next) => { ... setSecurityHeaders(res); ... })
 */
function getCspHeaders() {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  };
}

/**
 * Security headers for HTTP responses
 * @returns {Object} Security headers
 * @example
 * Object.entries(getSecurityHeaders()).forEach(([key, val]) => res.set(key, val))
 */
function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  };
}

/**
 * Rate limiter helper to track requests
 * @param {string} key - Identifier (IP, user ID, etc.)
 * @param {number} limit - Request limit
 * @param {number} windowMs - Time window in milliseconds
 * @param {Map} store - Storage for tracking (must be persistent)
 * @returns {boolean} True if request is within limit
 * @example
 * const requests = new Map()
 * const allowed = rateLimit('192.168.1.1', 100, 60000, requests)
 */
function checkRateLimit(key, limit, windowMs, store) {
  if (!store) store = new Map();
  
  const now = Date.now();
  const record = store.get(key) || { count: 0, reset: now + windowMs };
  
  if (now > record.reset) {
    record.count = 0;
    record.reset = now + windowMs;
  }
  
  record.count++;
  store.set(key, record);
  
  return record.count <= limit;
}

// Module exports
module.exports = {
  escapeHtml,
  escapeJs,
  sanitizeInput,
  validateEmail,
  validateUrl,
  generateCsrfToken,
  validateCsrfToken,
  isSafeSqlInput,
  hashPassword,
  verifyPassword,
  getCspHeaders,
  getSecurityHeaders,
  checkRateLimit,
};

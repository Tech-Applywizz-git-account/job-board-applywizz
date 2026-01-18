/**
 * Password Hash Generator for Admin Users
 * Run this script to generate the SHA-256 hash for admin passwords
 */

async function generatePasswordHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Generate hash for the initial admin password
const password = 'Applywizz@2026';
generatePasswordHash(password).then(hash => {
    console.log('Password:', password);
    console.log('SHA-256 Hash:', hash);
    console.log('\nUse this hash in the SQL INSERT statement for admin_users table');
});

// To run this script:
// node generate_admin_hash.js

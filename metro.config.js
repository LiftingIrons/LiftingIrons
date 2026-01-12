const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure Metro handles ESM packages correctly (like Supabase + Lucide)
config.resolver.sourceExts.push('cjs');

module.exports = config;

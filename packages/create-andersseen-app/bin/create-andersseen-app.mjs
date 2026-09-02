#!/usr/bin/env node

const [, , flag] = process.argv;

if (flag === '--help' || flag === '-h') {
  console.log('Usage: pnpm create andersseen-app');
  process.exit(0);
}

console.log('create-andersseen-app is reserved for a future creator PR.');

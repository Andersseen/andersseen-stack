#!/usr/bin/env node

const [, , command] = process.argv;

if (command === 'init') {
  console.log('@andersseen/stack init is reserved for a future foundation PR.');
  process.exit(0);
}

console.log('Usage: andersseen-stack init');

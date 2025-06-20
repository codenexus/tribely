{
  "name": "tribely",
  "version": "0.1.0",
  "private": true,
  "description": "Open source social community platform with integrated event ticketing",
  "author": "Jeremy Schaffer <jeremys@codenexus.org>",
  "license": "MIT",
  "homepage": "https://tribely.xyz",
  "repository": {
    "type": "git",
    "url": "https://github.com/codenexus/tribely"
  },
  "bugs": {
    "url": "https://github.com/codenexus/tribely/issues"
  },
  "keywords": [
    "community",
    "social",
    "events",
    "ticketing",
    "nuxt",
    "payload",
    "typescript",
    "open-source"
  ],
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@10.11.1",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "start": "turbo run start",
    "lint": "turbo run lint",
    "lint:fix": "turbo run lint:fix",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "test:watch": "turbo run test:watch",
    "clean": "turbo run clean && rm -rf node_modules .turbo",
    "setup": "./scripts/setup.sh",
    "db:migrate": "turbo run db:migrate",
    "db:seed": "turbo run db:seed",
    "db:reset": "turbo run db:reset",
    "format": "prettier --write \"**/*.{js,ts,vue,json,md}\"",
    "format:check": "prettier --check \"**/*.{js,ts,vue,json,md}\"",
    "postinstall": "turbo run postinstall"
  },
  "devDependencies": {
    "@types/node": "^20.11.30",
    "@typescript-eslint/eslint-plugin": "^7.3.1",
    "@typescript-eslint/parser": "^7.3.1",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-vue": "^9.23.0",
    "prettier": "^3.2.5",
    "turbo": "^1.12.5",
    "typescript": "^5.4.3"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
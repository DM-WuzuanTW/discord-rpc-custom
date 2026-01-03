# Contributing to Discord RPC Custom

Thank you for your interest in contributing to Discord RPC Custom! This document provides guidelines for contributing to this project.

## Code of Conduct

- **No Emojis**: Maintain a professional tone in code, comments, and PR descriptions.
- **Icon-Driven UI**: When adding features, use Icons (Lucide React) instead of text labels where possible. Avoid Emojis in UI.
- **Modular Architecture**: Ensure new features are self-contained in modules.

## How to Contribute

1.  **Fork the Repository**
2.  **Create a Branch**: Use a descriptive name (e.g., `feat/timestamp-toggle`, `fix/tray-icon`).
3.  **Commit Changes**:
    - Use clear, descriptive commit messages.
    - Format: `type: subject`
    - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`.
    - Example: `feat: add support for button url validation`
4.  **Push and Pull Request**: Submit your PR to the `main` or `master` branch.

## Development Setup

1.  **Prerequisites**: Node.js (LTS), git.
2.  **Install**: `npm install`
3.  **Dev Server**: `npm run electron:dev`
4.  **Build**: `npm run dist`

## Issue Reporting

- Provide clear steps to reproduce.
- Include environment details (Windows version, Discord version).
- Attach logs if available.

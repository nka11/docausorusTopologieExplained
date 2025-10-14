# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

### Git Hooks Setup (Optional but Recommended)

This project includes a pre-commit hook that checks for broken links before allowing commits. To install the hook:

```bash
./install-hooks.sh
```

The hook will:
- Automatically build your Docusaurus site before each commit
- Download the lychee link checker binary (on first run, no package manager needed)
- Check for broken internal and external links
- Prevent commits if broken links are detected

**Note:** The lychee binary is downloaded automatically from GitHub releases and stored in `.git/hooks/bin/`. No additional package managers are required.

To skip the hook for a specific commit:
```bash
git commit --no-verify
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

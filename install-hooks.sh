#!/usr/bin/env bash

# Installation script for git hooks
# This script sets up pre-commit hooks for the project

set -e

echo "🔧 Installing git hooks..."

HOOKS_DIR=".git/hooks"
PRE_COMMIT_HOOK="$HOOKS_DIR/pre-commit"

# Check if .git directory exists
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository. Run this script from the project root."
    exit 1
fi

# Check if pre-commit hook already exists
if [ -f "$PRE_COMMIT_HOOK" ]; then
    echo "⚠️  Pre-commit hook already exists."
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Installation cancelled."
        exit 1
    fi
fi

# Create the pre-commit hook
cat > "$PRE_COMMIT_HOOK" << 'EOF'
#!/usr/bin/env bash

# Pre-commit hook to build the Docusaurus site

set -e

echo "🔍 Running pre-commit checks..."

# Build the Docusaurus site
echo "📦 Building Docusaurus site..."
npm run build

echo "✅ Build successful!"
exit 0
EOF

# Make the hook executable
chmod +x "$PRE_COMMIT_HOOK"

echo "✅ Pre-commit hook installed successfully!"
echo ""
echo "ℹ️  The hook will:"
echo "   - Build your Docusaurus site before each commit"
echo "   - Prevent commits if the build fails"
echo ""
echo "To skip the hook temporarily, use: git commit --no-verify"

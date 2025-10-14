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

# Pre-commit hook to check for broken links in the built Docusaurus site
# This runs a build and checks for broken links before allowing the commit

set -e

echo "🔍 Running pre-commit checks..."

# Check if build directory exists and has recent changes
echo "📦 Building Docusaurus site..."
npm run build > /dev/null 2>&1

# Download lychee binary if not present
LYCHEE_VERSION="0.18.0"
LYCHEE_DIR=".git/hooks/bin"
LYCHEE_BIN="$LYCHEE_DIR/lychee"

if [ ! -f "$LYCHEE_BIN" ]; then
    echo "📥 Downloading lychee link checker..."
    mkdir -p "$LYCHEE_DIR"

    # Detect OS and architecture
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)

    case "$OS" in
        linux)
            OS_NAME="unknown-linux-gnu"
            ;;
        darwin)
            OS_NAME="apple-darwin"
            ;;
        *)
            echo "❌ Unsupported OS: $OS"
            exit 1
            ;;
    esac

    case "$ARCH" in
        x86_64)
            ARCH_NAME="x86_64"
            ;;
        arm64|aarch64)
            ARCH_NAME="aarch64"
            ;;
        *)
            echo "❌ Unsupported architecture: $ARCH"
            exit 1
            ;;
    esac

    DOWNLOAD_URL="https://github.com/lycheeverse/lychee/releases/download/lychee-v${LYCHEE_VERSION}/lychee-v${LYCHEE_VERSION}-${ARCH_NAME}-${OS_NAME}.tar.gz"

    echo "Downloading from: $DOWNLOAD_URL"
    curl -L "$DOWNLOAD_URL" | tar xz -C "$LYCHEE_DIR"
    chmod +x "$LYCHEE_BIN"
    echo "✅ Lychee installed successfully"
fi

# Run lychee to check for broken links
echo "🔗 Checking for broken links..."
if "$LYCHEE_BIN" --no-progress './build/**/*.html'; then
    echo "✅ No broken links found!"
    exit 0
else
    echo "❌ Broken links detected! Please fix them before committing."
    exit 1
fi
EOF

# Make the hook executable
chmod +x "$PRE_COMMIT_HOOK"

echo "✅ Pre-commit hook installed successfully!"
echo ""
echo "ℹ️  The hook will:"
echo "   - Build your Docusaurus site"
echo "   - Download lychee binary (on first run)"
echo "   - Check for broken links"
echo "   - Prevent commits if broken links are found"
echo ""
echo "To skip the hook temporarily, use: git commit --no-verify"

#!/bin/bash

# EchoValue Skill Installer
# Installs the EchoValue API skill for AI agents

set -e

REPO_URL="https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/skill"
SKILL_DIR="$HOME/.claude/skills/echovalue"

echo "🚀 Installing EchoValue API skill..."

# Create skill directory
mkdir -p "$SKILL_DIR"

# Download skill files
echo "📥 Downloading SKILL.md..."
curl -fsSL "$REPO_URL/SKILL.md" -o "$SKILL_DIR/SKILL.md"

echo "📥 Downloading quick-reference.md..."
curl -fsSL "$REPO_URL/quick-reference.md" -o "$SKILL_DIR/quick-reference.md"

# Verify installation
if [ -f "$SKILL_DIR/SKILL.md" ] && [ -f "$SKILL_DIR/quick-reference.md" ]; then
    echo "✅ EchoValue API skill installed successfully!"
    echo ""
    echo "📁 Installed to: $SKILL_DIR"
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Set your token: export ECHOVALUE_TOKEN='your-token'"
    echo "   2. Restart your AI agent session"
    echo "   3. Use the skill: just ask about echoValue!"
    echo ""
    echo "💡 Example usage:"
    echo "   'Configure a Slack webhook for echoValue'"
    echo "   'Check my echoValue balance'"
    echo "   'Store a value in echoValue'"
    echo ""
    echo "📖 Documentation: https://docs.echovalue.dev"
else
    echo "❌ Installation failed. Please check your internet connection and try again."
    exit 1
fi
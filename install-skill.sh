#!/bin/bash

# EchoValue Skill Installer
# Installs the EchoValue API skill for Claude, Codex, and supporting files for other tools.

set -euo pipefail

REPO_URL="https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main"
CLAUDE_SKILL_DIR="$HOME/.claude/skills/echovalue"

install_claude=false
install_codex=false
install_cursor=false
install_continue=false
workspace_dir=""

usage() {
    cat <<'EOF'
Usage:
  install-skill.sh [--claude] [--codex] [--cursor] [--continue] [--all] [--workspace DIR]

Defaults to --claude when no agent flags are supplied.

Examples:
  curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/install-skill.sh | bash
  curl -fsSL https://raw.githubusercontent.com/njoylab/docs.echovalue.dev/main/install-skill.sh | bash -s -- --all --workspace .
EOF
}

while [ $# -gt 0 ]; do
    case "$1" in
        --claude) install_claude=true ;;
        --codex) install_codex=true ;;
        --cursor) install_cursor=true ;;
        --continue) install_continue=true ;;
        --all)
            install_claude=true
            install_codex=true
            install_cursor=true
            install_continue=true
            ;;
        --workspace)
            shift
            workspace_dir="${1:-}"
            if [ -z "$workspace_dir" ]; then
                echo "Missing value for --workspace"
                usage
                exit 1
            fi
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
    shift
done

if [ "$install_claude" = false ] && [ "$install_codex" = false ] && [ "$install_cursor" = false ] && [ "$install_continue" = false ]; then
    install_claude=true
fi

if [ -z "$workspace_dir" ]; then
    workspace_dir="$(pwd)"
fi

download() {
    curl -fsSL "$1" -o "$2"
}

install_claude_skill() {
    echo "🚀 Installing Claude skill..."
    mkdir -p "$CLAUDE_SKILL_DIR"
    download "$REPO_URL/skill/SKILL.md" "$CLAUDE_SKILL_DIR/SKILL.md"
    download "$REPO_URL/skill/quick-reference.md" "$CLAUDE_SKILL_DIR/quick-reference.md"
    echo "✅ Claude skill installed to $CLAUDE_SKILL_DIR"
}

install_codex_skill() {
    local codex_skill_dir="$workspace_dir/.agents/skills/echovalue"
    echo "🚀 Installing Codex skill..."
    mkdir -p "$codex_skill_dir"
    download "$REPO_URL/agent-config/codex/echovalue/SKILL.md" "$codex_skill_dir/SKILL.md"
    download "$REPO_URL/skill/quick-reference.md" "$codex_skill_dir/quick-reference.md"
    echo "✅ Codex skill installed to $codex_skill_dir"
}

install_cursor_rules() {
    local cursor_dir="$workspace_dir/.cursor/rules"
    echo "🚀 Installing Cursor rules..."
    mkdir -p "$cursor_dir"
    download "$REPO_URL/agent-config/cursor/echovalue.mdc" "$cursor_dir/echovalue.mdc"
    echo "✅ Cursor rules installed to $cursor_dir/echovalue.mdc"
}

install_continue_rules() {
    local continue_dir="$workspace_dir/.continue/rules"
    echo "🚀 Installing Continue rules..."
    mkdir -p "$continue_dir"
    download "$REPO_URL/agent-config/continue/echovalue.md" "$continue_dir/echovalue.md"
    echo "✅ Continue rules installed to $continue_dir/echovalue.md"
}

if [ "$install_claude" = true ]; then
    install_claude_skill
fi

if [ "$install_codex" = true ]; then
    install_codex_skill
fi

if [ "$install_cursor" = true ]; then
    install_cursor_rules
fi

if [ "$install_continue" = true ]; then
    install_continue_rules
fi

echo ""
echo "🎯 Next steps:"
echo "   1. Set your token: export ECHOVALUE_TOKEN='your-token'"
echo "   2. Restart your agent or editor session"
echo "   3. Use echoValue from the agent you installed"
echo ""
echo "📖 Documentation: https://docs.echovalue.dev"

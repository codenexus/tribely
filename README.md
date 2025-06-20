# Tribely

> An open-source social community platform with integrated event ticketing

🌐 **Website**: [tribely.xyz](https://tribely.xyz)  
🏢 **Organization**: [CodeNexus](https://github.com/codenexus)

## 🌟 Features

- 🏠 **Community Social Feed** - Engage with your tribe through posts and discussions
- 🎫 **Event Ticketing** - Integrated ticket sales with member discounts
- 💬 **Private Messaging** - Direct member-to-member communication  
- 📱 **Event-Specific Feeds** - Exclusive discussions for ticket holders
- 🏢 **Multi-Tenant Support** - Host multiple communities (SaaS mode)
- 🔧 **Self-Hostable** - Full control over your data and community

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL (optional - SQLite works for development)

### Installation

```bash
git clone https://github.com/codenexus/tribely.git
cd tribely
./scripts/setup.sh
pnpm dev
```

Visit `http://localhost:3000` to see your community platform!

## 🏗️ Architecture

- **Frontend**: Nuxt 3 (Vue.js) with TypeScript
- **Backend**: Payload CMS with Express
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: Payload Auth + JWT
- **Styling**: Tailwind CSS
- **Build System**: Turborepo + pnpm workspaces

## 📁 Project Structure

```
tribely/
├── apps/
│   ├── web/          # Nuxt 3 frontend application
│   └── api/          # Payload CMS backend
├── packages/
│   ├── shared/       # Shared types and utilities
│   ├── ui/           # Shared UI components
│   └── config/       # Shared configuration
└── docs/             # Documentation
```

## 🔧 Development

### Setup Development Environment

1. **Clone and install:**
   ```bash
   git clone https://github.com/codenexus/tribely.git
   cd tribely
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Setup database:**
   ```bash
   # For quick start with SQLite
   echo "DATABASE_URL=file:./tribely.db" >> .env.local
   
   # Or configure PostgreSQL in .env.local
   ```

4. **Run migrations and start:**
   ```bash
   pnpm db:migrate
   pnpm dev
   ```

### Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build for production  
- `pnpm test` - Run tests
- `pnpm lint` - Lint code
- `pnpm type-check` - TypeScript type checking

## 🌍 Deployment Options

### Self-Hosting (Single Community)
Perfect for organizations wanting full control over their community platform.

### SaaS (Multiple Communities)  
We offer hosted Tribely at [tribely.xyz](https://tribely.xyz) for managing multiple communities.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with ❤️ by [Jeremy Schaffer](https://github.com/cringerjs) and the CodeNexus team.

---

**[Documentation](docs/)** • **[Issues](https://github.com/codenexus/tribely/issues)** • **[Discussions](https://github.com/codenexus/tribely/discussions)**
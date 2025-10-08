# Learn DSA - Interactive Data Structures & Algorithms Platform

A comprehensive learning platform for Data Structures and Algorithms with interactive visualizations, progress tracking, and Google OAuth authentication.

## Features

- **Interactive Learning**: Theory, simulations, and code examples for all major data structures
- **Authentication**: Google OAuth integration with NextAuth.js
- **Progress Tracking**: Save your learning progress and bookmarks
- **Modern UI**: Built with Next.js 15, React 19, Tailwind CSS, and Framer Motion
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion for animations  
- **Authentication**: NextAuth.js with Google OAuth provider
- **Database**: Prisma ORM with PostgreSQL
- **Build Tools**: Turbopack for fast development builds

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LearnDSA.me
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your domain (http://localhost:3000 for development)

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins
   - Add `/api/auth/callback/google` to authorized redirect URIs

5. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # Optional: Open Prisma Studio to view data
   npm run db:studio
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:reset` - Reset database
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── algorithms/      # Algorithm category pages
│   ├── data-structures/ # Data structure pages
│   └── api/            # API routes
├── components/         # Reusable React components
│   ├── auth/           # Authentication components
│   ├── bookmarks/      # Bookmark functionality
│   ├── progress/       # Progress tracking
│   └── visualizations/ # Interactive visualizations
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
└── theme/              # Theme configuration

prisma/
└── schema.prisma       # Database schema
```

## Features in Detail

### Authentication System
- Google OAuth integration with NextAuth.js
- Automatic user creation and session management
- Protected routes and API endpoints

### Progress Tracking  
- Track completion status for topics and categories
- Time spent learning measurement
- Progress visualization with indicators

### Bookmark System
- Save interesting topics for later review
- Personal bookmark management
- Quick access to saved content

### Interactive Learning
- Step-by-step algorithm visualizations
- Interactive data structure operations
- Code examples in multiple languages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please create an issue on GitHub.

---

### (Internal Notes) Upcoming Advanced Linked List Enhancements
Tracking potential deep-dive sections to add:
- Sentinel / dummy head & tail nodes for simpler edge handling
- Maintaining tail pointer & O(1) size caching (trade-offs & invariants)
- Memory layout & fragmentation: allocator impact, pooling strategies
- Iterator invalidation rules vs arrays/vectors
- Real-world usage examples: LRU cache, undo stack, adjacency lists, free lists
- Common pitfalls: losing head reference, accidental self-cycles, double free (manual memory)
- Alternatives comparison: dynamic array, gap buffer, rope, deque, skip list
- Concurrency patterns: hazard pointers, RCU, lock-free vs coarse lock
- Performance tuning: prefetching hints, node batching, unrolled lists
- Debugging techniques: slow/fast verification, visualization logs

These will live in a forthcoming `advanced` page under Module 4.

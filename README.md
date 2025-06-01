# Hablemos Dd Cancer Form - Healthcare Resource Management

## Overview
HDC Form is a comprehensive web application designed to manage healthcare resources, sessions, and encounters. It provides an intuitive interface for healthcare professionals to manage their resources, schedule sessions, and track patient encounters efficiently.

## 🚀 Features

- **Resource Management**
  - Create and manage healthcare resources
  - Track session dates and status
  - Monitor resource utilization
  - Real-time status updates

- **Session Tracking**
  - Schedule and manage healthcare sessions
  - Track encounter quantities
  - Manage session pricing
  - Status monitoring (Active, Pending, Finished)

- **Administrative Dashboard**
  - Comprehensive resource overview
  - Advanced filtering and sorting
  - Real-time data updates
  - Responsive data tables

## 🛠️ Tech Stack

- **Frontend**
  - [Next.js 14](https://nextjs.org/) - React framework with App Router
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Tailwind CSS](https://tailwindcss.com/) - Styling
  - [Shadcn/ui](https://ui.shadcn.com/) - UI Components
  - [React Hook Form](https://react-hook-form.com/) - Form handling
  - [Zod](https://zod.dev/) - Schema validation
  - [TanStack Table](https://tanstack.com/table) - Table management

- **Backend**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - API endpoints
  - [Prisma](https://www.prisma.io/) - Database ORM
  - [PostgreSQL](https://www.postgresql.org/) - Database

- **Testing**
  - [Jest](https://jestjs.io/) - Unit testing
  - [React Testing Library](https://testing-library.com/react) - Component testing

- **Development Tools**
  - [ESLint](https://eslint.org/) - Code linting
  - [Prettier](https://prettier.io/) - Code formatting

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoniWaibs/hdc-form.git
   cd hdc-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables in `.env.local`

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Run tests**
   ```bash
   npm test
   ```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Jonatan Waibsnaider** - _Initial work_ - [JoniWaibs](https://github.com/JoniWaibs)

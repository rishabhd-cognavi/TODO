# Modern Todo Board Application

A Trello-style Todo board application built with React, TypeScript, and modern web technologies. Features drag-and-drop functionality, real-time updates, and a responsive design.

## 🚀 Features

- Kanban-style board with three columns (Pending, In Progress, Completed)
- Drag and drop todos between columns
- Create, edit, and delete todos
- Checklist items within todos
- Progress tracking for each todo
- Responsive design for mobile and desktop
- Error boundaries for graceful error handling
- Optimistic updates for better UX
- TypeScript for type safety
- Modern animation effects

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: React Context + React Query
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **API Integration**: REST API (dummyjson.com)
- **Code Quality**: ESLint, TypeScript strict mode
- **Development Tools**: Hot Module Replacement (HMR)

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/TODO.git
cd TODO
```

2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=https://dummyjson.com/todos
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 🏗️ Build

To build for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🧪 Type Checking

```bash
npm run typecheck
# or
yarn typecheck
# or
pnpm typecheck
```

## 🔍 Linting

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 📁 Project Structure

```
src/
├── components/        # React components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── services/         # API services
├── types/            # TypeScript types/interfaces
├── utils/            # Utility functions
└── constants/        # Constants and enums
```

## 🔒 Environment Variables

| Variable     | Description      | Required |
| ------------ | ---------------- | -------- |
| VITE_API_URL | API endpoint URL | Yes      |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style Guide

- Use TypeScript strict mode
- Follow ESLint rules
- Use functional components with hooks
- Implement error boundaries for error handling
- Use async/await for API calls
- Follow React best practices

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the application:

```bash
npm run build
```

2. Deploy the `dist` directory to your hosting service

Popular hosting options:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## ⚖️ License

MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React Team
- Vite Team
- TailwindCSS Team
- Framer Motion Team
- DummyJSON API Team

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

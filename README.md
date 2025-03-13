# ToDo App

Visit the deployed site: [https://rishabhd-cognavi.github.io/TODO/](https://rishabhd-cognavi.github.io/TODO/)

# Modern Todo Board Application

A Trello-style Todo board application built with React, TypeScript, and modern web technologies. Features drag-and-drop functionality, real-time updates, and a responsive design.

## 🚀 Features

- Kanban-style board with three columns (Pending, In Progress, Completed)
- Drag and drop todos between columns with smooth animations
- Create, edit, and delete todos with optimistic updates
- Detailed todo items with descriptions and checklists
- Progress tracking with visual progress bars
- Toast notifications for user feedback
- Error boundaries for graceful error handling
- Responsive design for mobile and desktop
- TypeScript for type safety
- Modern animation effects using Framer Motion

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: React Context + Custom Hooks
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **API Integration**: DummyJSON REST API
- **Code Quality**: ESLint with TypeScript support
- **Development Tools**: Hot Module Replacement (HMR)

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

## 🔧 Installation

1. Clone the repository:

```bash
git clone <repository-url>
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

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── BoardHeader.tsx  # Board header with actions
│   ├── ErrorBoundary.tsx # Error handling wrapper
│   ├── Lane.tsx        # Kanban lane component
│   ├── Toast/          # Toast notification components
│   ├── TodoBoard.tsx   # Main board component
│   ├── TodoCard.tsx    # Individual todo card
│   └── TodoModal.tsx   # Create/Edit modal
├── context/            # React context providers
├── constants/          # Application constants
├── services/          # API services
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## 🔒 Environment Variables

| Variable     | Description            | Required |
| ------------ | ---------------------- | -------- |
| VITE_API_URL | DummyJSON API endpoint | Yes      |

## ⚡️ Performance Features

- Memoized components using React.memo
- Optimistic updates for better UX
- Debounced API calls
- Efficient state management with Context API
- Code splitting and lazy loading
- Type-safe development with TypeScript

## 🔐 Error Handling

- Global error boundary for React errors
- API error handling with custom error types
- Toast notifications for user feedback
- Type-safe error handling with TypeScript

## 🎨 UI/UX Features

- Smooth drag and drop animations
- Progress bars for todo completion
- Toast notifications for user actions
- Responsive design for all screen sizes
- Loading states and spinners
- Modal dialogs for todo operations

## 📝 Code Style

This project follows strict TypeScript and ESLint configurations for consistent code style:

- Strict TypeScript checks
- ESLint with React hooks rules
- Consistent file and folder structure
- Component memoization where beneficial
- Proper type definitions

## 🎯 Design Decisions & Patterns

### Architecture

- **Component-Based Architecture**: Modular components for better maintainability and reusability
- **Container/Presenter Pattern**: Separation of logic (TodoProvider) from presentation (TodoBoard, Lane)
- **Context API**: Global state management without prop drilling
- **Custom Error Boundary**: Graceful error handling at component level

### State Management

- **Optimistic Updates**: UI updates before API confirmation for better UX
- **Immutable State Updates**: Using spread operators and map/filter for predictable state changes
- **Loading States**: Granular loading states per todo item for better UX
- **Memoization**: Strategic use of useMemo and useCallback for performance

### Performance Optimizations

- **Debounced API Calls**: Prevent API spam during rapid user actions
- **Conditional Rendering**: Components render only when necessary
- **React.memo**: Prevent unnecessary re-renders of heavy components
- **Cleanup Effects**: Proper cleanup of subscriptions and timeouts
- **AbortController**: Cancel pending API requests on unmount

### Error Handling Strategy

- **Custom Error Types**: Type-safe error handling with TodoError
- **API Error Interceptors**: Consistent API error handling
- **Toast Notifications**: User-friendly error messages
- **Fallback UI**: Graceful degradation during errors

## 🚧 Known Limitations

1. **API Limitations**

   - DummyJSON API has limited features
   - No real-time updates or WebSocket support
   - Mock data restrictions

2. **Performance Constraints**

   - Large lists may impact drag-and-drop performance
   - No pagination or infinite scroll
   - All todos loaded at once

3. **Feature Limitations**
   - No offline support
   - No data persistence
   - Limited undo/redo capabilities
   - Basic authentication

## 🚀 Future Enhancements

### Immediate Improvements

1. **Performance**

   - Implement virtual scrolling for large lists
   - Add pagination or infinite scroll
   - Optimize drag-and-drop for large datasets

2. **Features**

   - Offline support with Service Workers
   - Local storage backup
   - Undo/redo functionality
   - Rich text editor for descriptions
   - Due dates and reminders

3. **User Experience**
   - Keyboard shortcuts
   - Customizable themes
   - Board templates
   - Search and filters
   - Sorting options

### Long-term Goals

1. **Infrastructure**

   - Custom backend with real-time updates
   - User authentication and authorization
   - Data persistence with proper database
   - API rate limiting and caching

2. **Advanced Features**

   - Multiple boards support
   - Team collaboration
   - Activity history
   - File attachments
   - Advanced reporting

3. **Integration**
   - Calendar integration
   - Email notifications
   - Export/import functionality
   - Third-party app integrations

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details

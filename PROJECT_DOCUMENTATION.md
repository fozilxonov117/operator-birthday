# 🎂 Employee Birthday Tracker

A modern, creative, and advanced birthday tracking application for company employees, built with React, TypeScript, Material-UI, and Framer Motion following Feature-Sliced Design (FSD) architecture.

## ✨ Features

### Core Functionality
- 🗓️ **Month Filter** - Interactive month selector with birthday counts
- 🎉 **Birthday List** - View all employees with birthdays in selected month
- 📌 **Today's Birthdays Sidebar** - Right sidebar displaying today's celebrations
- 👑 **Leadership Highlighting** - Special visual treatment for leaders' birthdays
- 💌 **Personalized Greetings** - Custom congratulation messages for each employee
- 🎊 **Confetti Animation** - Automatic celebration effects when there are birthdays today

### Visual & UX
- 🎨 **Beautiful Gradient Design** - Modern, vibrant color schemes
- ✨ **Smooth Animations** - Powered by Framer Motion
- 📱 **Responsive Layout** - Works perfectly on all device sizes
- 🎴 **Animated Cards** - Interactive hover and tap effects
- 🏆 **Premium Leader Cards** - Golden borders, crown icons, and special styling
- 🎯 **Clean Material Design** - Using MUI components

## 🏗️ Architecture

This project follows **Feature-Sliced Design (FSD)** methodology for scalable and maintainable code:

```
src/
├── app/                    # Application initialization
│   ├── App.tsx            # Root component with providers
│   └── theme.ts           # MUI theme configuration
│
├── pages/                  # Page-level components
│   └── birthdays/         # Main birthdays page
│       ├── BirthdaysPage.tsx
│       └── index.ts
│
├── widgets/               # Complex UI blocks
│   ├── month-filter/      # Month selector widget
│   ├── todays-birthdays/  # Today's birthdays sidebar
│   └── birthday-list/     # Monthly birthday list
│
├── features/              # User interactions
│   └── confetti/          # Confetti celebration effect
│
├── entities/              # Business entities
│   └── employee/          # Employee entity
│       ├── model.ts       # Employee data & types
│       └── ui/            # Employee components
│           ├── EmployeeCard.tsx
│           └── BirthdayCard.tsx
│
└── shared/                # Reusable resources
    ├── types/             # TypeScript interfaces
    ├── constants/         # Constants (months, greetings)
    ├── lib/              # Utility functions
    └── ui/               # Shared UI components
```

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Material-UI (MUI)** - Premium React component library
- **Framer Motion** - Production-ready animation library
- **canvas-confetti** - Celebration effects
- **ESLint** - Code quality and consistency

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd react-birthday-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## 🎯 Usage

1. **Select a Month** - Click on any month chip to filter birthdays
2. **View Birthdays** - See all employees celebrating in the selected month
3. **Check Today's Birthdays** - Right sidebar shows today's celebrations
4. **Leadership Cards** - Leaders have golden borders and crown icons
5. **Enjoy Confetti** - Automatic confetti animation when birthdays are today

## 🎨 Customization

### Adding Employees

Edit `src/entities/employee/model.ts`:

```typescript
export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'https://i.pravatar.cc/150?img=1',
    birthday: '11-05', // MM-DD format
    department: 'Engineering',
    position: 'Software Engineer',
    isLeader: false,
  },
  // Add more employees...
];
```

### Customizing Greetings

Edit `src/shared/constants/greetings.ts` to add or modify greeting messages.

### Theming

Modify `src/app/theme.ts` to customize colors, typography, and component styles.

## 📱 Responsive Design

- **Desktop (1200px+)**: Full layout with sidebar
- **Tablet (768px-1199px)**: Adapted layout
- **Mobile (<768px)**: Sidebar hidden, stacked layout

## 🎭 Special Features

### Leadership Highlighting
- Golden border (3px solid #FFD700)
- Crown emoji indicator 👑
- "Leadership Birthday" badge
- Special greeting messages
- Positioned at top of today's list
- Premium gradient background

### Birthday Cards
- **Today's Birthdays**: Special cards with personalized greetings
- **Monthly View**: Compact employee cards with essential info
- **Animations**: Smooth transitions and hover effects
- **Visual Hierarchy**: Leaders always displayed first

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📊 Current Data

The app includes 26 mock employees with birthdays spread across all months. For testing purposes, November 5th (today) has:
- Sarah Johnson (CTO) - Leader
- Michael Chen (Senior Product Manager)

## 🎯 Future Enhancements

- Backend API integration
- Employee photo uploads
- Birthday reminders/notifications
- Export to PDF/CSV
- Birthday statistics dashboard
- Department filtering
- Birthday wish submission
- Upcoming birthdays (next 7/30 days)
- Birthday history

## 📝 Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint configuration
- ✅ Clean code principles
- ✅ Component reusability
- ✅ Type safety throughout
- ✅ FSD architecture compliance

## 🎉 Celebration Effects

The app automatically triggers confetti animations when there are birthdays today! The effect includes:
- Multi-colored particles
- Continuous animation for 3 seconds
- Dual-directional confetti bursts
- Vibrant celebration colors

## 🙏 Credits

Built with ❤️ using modern web technologies and best practices.

---

**Happy Birthday Tracking! 🎂🎉**

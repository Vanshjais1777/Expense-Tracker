# 📊 Subscription Tracker

A beautiful, feature-rich web application built with React and TypeScript for managing and visualizing recurring subscription expenses. Track your subscriptions, analyze spending patterns, and take control of your recurring expenses with an intuitive, responsive interface.

## ✨ Features

### Core Functionality
- **🔐 User Authentication** - Secure registration and login system
- **➕ Subscription Management** - Add, edit, and delete subscriptions with detailed information
- **📋 Smart List View** - Comprehensive subscription overview with status indicators
- **🔍 Advanced Search & Filtering** - Filter by category, billing frequency, and status
- **📊 Expense Visualization** - Interactive charts and graphs for spending analysis
- **📱 Responsive Design** - Seamless experience across desktop and mobile devices

### Advanced Features
- **🌙 Dark/Light Theme** - Toggle between themes with system preference detection
- **📈 Analytics Dashboard** - Detailed insights into spending patterns and trends
- **⏰ Payment Tracking** - Upcoming payment notifications and overdue alerts
- **💾 Data Export** - Export subscription data as CSV files
- **🎯 Category Breakdown** - Visual representation of spending by category
- **📅 Monthly Trends** - Historical spending analysis and projections

### User Experience
- **🎨 Beautiful UI** - Modern, clean design with smooth animations
- **⚡ Fast Performance** - Optimized React components with efficient state management
- **🔔 Smart Notifications** - Visual indicators for upcoming and overdue payments
- **💡 Spending Insights** - Intelligent recommendations and savings tracking
- **📊 Interactive Charts** - Powered by Recharts for rich data visualization

## 🚀 Live Demo

Visit the live application: [https://clever-hummingbird-60a492.netlify.app](https://clever-hummingbird-60a492.netlify.app)

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify for hosting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd subscription-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Analytics/          # Analytics and insights components
│   │   ├── Analytics.tsx
│   │   ├── ExpenseSummary.tsx
│   │   └── MonthlyTrends.tsx
│   ├── Auth/              # Authentication components
│   │   ├── AuthPage.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── Dashboard/         # Dashboard and overview components
│   │   ├── Dashboard.tsx
│   │   ├── StatsCard.tsx
│   │   ├── ExpenseChart.tsx
│   │   ├── CategoryBreakdown.tsx
│   │   └── UpcomingPayments.tsx
│   ├── Layout/            # Layout and navigation components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   └── Subscriptions/     # Subscription management components
│       ├── SubscriptionForm.tsx
│       └── SubscriptionList.tsx
├── contexts/              # React Context providers
│   ├── AuthContext.tsx
│   ├── SubscriptionContext.tsx
│   └── ThemeContext.tsx
├── types/                 # TypeScript type definitions
│   └── index.ts
├── utils/                 # Utility functions
│   ├── dateUtils.ts
│   └── subscriptionUtils.ts
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## 🎯 Usage

### Getting Started
1. **Register an Account** - Create a new account or use the demo login
2. **Add Subscriptions** - Click the "Add Subscription" button to add your first subscription
3. **Explore Dashboard** - View your spending overview and upcoming payments
4. **Analyze Trends** - Visit the Analytics section for detailed insights

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

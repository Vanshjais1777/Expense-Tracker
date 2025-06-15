# 📊 Subscription Tracker

A beautiful, feature-rich web application built with React and TypeScript for managing and visualizing recurring subscription expenses. Track your subscriptions, analyze spending patterns, and take control of your recurring expenses with an intuitive, responsive interface.

![Subscription Tracker](https://clever-hummingbird-60a492.netlify.app)

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

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation
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

### Managing Subscriptions
- **Add New**: Use the floating action button or sidebar button
- **Edit Existing**: Click the edit icon on any subscription card
- **Toggle Status**: Activate/deactivate subscriptions without deleting
- **Delete**: Remove subscriptions you no longer need
- **Search & Filter**: Use the search bar and filters to find specific subscriptions

### Understanding Analytics
- **Expense Summary**: Overview of monthly/yearly spending with trends
- **Category Breakdown**: Pie chart showing spending distribution
- **Monthly Trends**: Historical spending patterns and projections
- **Savings Tracking**: Monitor savings from cancelled subscriptions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 💾 Data Storage

The application uses browser localStorage for data persistence:
- User accounts and authentication
- Subscription data (per user)
- Theme preferences
- Application settings

> **Note**: In a production environment, you would typically use a backend database for data storage and user management.

## 🎨 Design Features

### Visual Design
- **Modern Interface**: Clean, minimalist design with attention to detail
- **Consistent Theming**: Cohesive color scheme and typography
- **Responsive Layout**: Optimized for all screen sizes
- **Smooth Animations**: Subtle transitions and hover effects

### User Experience
- **Intuitive Navigation**: Clear information architecture
- **Smart Defaults**: Sensible default values and suggestions
- **Error Handling**: Graceful error states and validation
- **Loading States**: Visual feedback during operations

## 🔒 Security Considerations

- Client-side authentication (demo purposes)
- Input validation and sanitization
- XSS protection through React's built-in escaping
- Secure data handling practices

> **Production Note**: For production use, implement proper server-side authentication, HTTPS, and secure data storage.

## 🚀 Deployment

The application is deployed on Netlify with automatic builds from the main branch.

### Deploy Your Own
1. Fork this repository
2. Connect to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow the existing code style and patterns
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon set
- **Recharts** - For the powerful charting library
- **Netlify** - For seamless deployment and hosting

## 📞 Support

If you have any questions or need help with the application, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

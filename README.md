# 🚗 Uber Clone - React Native

A full-featured Uber clone built with React Native, Expo Router, and modern technologies. This app provides a complete ride-sharing experience with real-time maps, payment integration, and user authentication.

![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)
![Expo](https://img.shields.io/badge/Expo-53.0.20-000020.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🔐 Authentication & Onboarding

- **Seamless Onboarding**: Interactive swiper-based introduction
- **OAuth Integration**: Google and GitHub Sign-In with Clerk authentication
- **Secure Authentication**: Session management and validation
- **Skip Option**: Quick access for returning users

### 🗺️ Maps & Navigation

- **Real-time Maps**: Google Maps integration with live location
- **Route Planning**: Direction calculation and visualization
- **Driver Tracking**: Real-time driver location and ETA
- **Interactive Markers**: Custom map markers for drivers and destinations
- **Location Services**: Precise GPS and address autocomplete

### 🚕 Ride Management

- **Ride Booking**: Easy destination selection and ride request
- **Driver Selection**: Browse available drivers with ratings
- **Ride Confirmation**: Detailed trip information and pricing
- **Ride History**: Track past and current rides
- **Driver Information**: Profile, vehicle details, and ratings

### 💳 Payment Integration

- **Stripe Integration**: Secure payment processing
- **Multiple Payment Methods**: Support for various payment options
- **Payment History**: Transaction tracking and receipts
- **Real-time Payment Status**: Live payment confirmation

### 📱 User Interface

- **Tab Navigation**: Home, Rides, Chat, and Profile sections
- **Responsive Design**: Optimized for different screen sizes
- **Custom Components**: Reusable UI components with consistent styling
- **TailwindCSS**: Modern styling with NativeWind
- **Smooth Animations**: Enhanced user experience with React Native Reanimated

## 🏗️ Architecture

### Project Structure

```
uber-clone/
├── app/                          # Expo Router file-based routing
│   ├── (auth)/                   # Authentication screens
│   │   ├── onboarding.tsx        # App introduction
│   │   ├── sign-in.tsx           # Sign in screen
│   │   └── sign-up.tsx           # Sign up screen
│   ├── (root)/                   # Main app screens
│   │   ├── (tabs)/               # Tab navigation
│   │   │   ├── home.tsx          # Home/Map screen
│   │   │   ├── rides.tsx         # Ride history
│   │   │   ├── chat.tsx          # Chat interface
│   │   │   └── profile.tsx       # User profile
│   │   ├── book-ride.tsx         # Ride booking
│   │   ├── confirm-ride.tsx      # Ride confirmation
│   │   └── find-ride.tsx         # Driver selection
│   ├── (api)/                    # API routes
│   │   ├── (stripe)/             # Stripe payment endpoints
│   │   └── ride/                 # Ride management APIs
│   └── index.tsx                 # App entry point
├── components/                   # Reusable UI components
├── lib/                         # Utility functions
├── store/                       # Zustand state management
├── types/                       # TypeScript definitions
└── assets/                      # Images, icons, and constants
```

### Key Technologies

- **Frontend**: React Native 0.79.5
- **Framework**: Expo 53.0.20 with Expo Router
- **Authentication**: Clerk Expo
- **Maps**: Expo Maps & React Native Maps
- **Payments**: Stripe React Native
- **State Management**: Zustand
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Database**: Neon Database (Serverless PostgreSQL)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/boytrend0108/uber-clone-rn.git
   cd uber-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key

   # Google Maps
   EXPO_PUBLIC_GOOGLE_API_KEY=your_google_maps_key

   # Stripe
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   STRIPE_SECRET_KEY=your_stripe_secret

   # Database
   DATABASE_URL=your_neon_database_url
   ```

4. **Configure Google Maps**
   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps SDK for Android/iOS and Places API
   - Add the key to `app.json` and your environment variables

5. **Set up Clerk Authentication**
   - Create a Clerk account at [clerk.com](https://clerk.com)
   - Configure OAuth providers (Google)
   - Add your publishable key to environment variables

6. **Configure Stripe**
   - Create a Stripe account at [stripe.com](https://stripe.com)
   - Get your publishable and secret keys
   - Set up webhook endpoints for payment processing

### Development

1. **Start the development server**

   ```bash
   npm start
   ```

2. **Run on specific platforms**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

3. **Build for production**

   ```bash
   # Development build
   npm run eas:build

   # Production build
   npx eas build --platform android --profile production
   ```

## 📦 Key Dependencies

### Core

- **expo**: ~53.0.20 - Expo SDK
- **react-native**: 0.79.5 - React Native framework
- **expo-router**: ~5.1.4 - File-based routing

### Authentication & Security

- **@clerk/clerk-expo**: ^2.14.14 - Authentication provider
- **expo-secure-store**: ^14.2.3 - Secure storage

### Maps & Location

- **expo-maps**: ^0.11.0 - Expo Maps component
- **react-native-maps**: 1.20.1 - React Native Maps
- **react-native-maps-directions**: ^1.9.0 - Route directions
- **expo-location**: ~18.1.6 - Location services
- **react-native-google-places-autocomplete**: ^2.5.7 - Address autocomplete

### Payments

- **@stripe/stripe-react-native**: 0.45.0 - Stripe payment integration
- **stripe**: ^18.4.0 - Stripe server SDK

### UI & Styling

- **nativewind**: ^4.1.23 - TailwindCSS for React Native
- **tailwindcss**: ^3.4.17 - Utility-first CSS framework
- **react-native-reanimated**: ~3.17.4 - Animations
- **react-native-swiper**: ^1.6.0 - Swiper component

### State Management

- **zustand**: ^5.0.7 - State management

### Database

- **@neondatabase/serverless**: ^1.0.1 - Serverless PostgreSQL

## 🔧 Configuration

### App Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Uber",
    "slug": "uber",
    "scheme": "uber-clone",
    "android": {
      "package": "com.boytrend.uber",
      "config": {
        "googleMaps": {
          "apiKey": "your_google_maps_key"
        }
      },
      "permissions": [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

### Tailwind Configuration (`tailwind.config.js`)

The project uses NativeWind for styling with custom color schemes and font families.

## 🎯 Core Features Implementation

### Authentication Flow

1. **Onboarding**: Introduction screens with skip option
2. **OAuth**: Google Sign-In integration via Clerk
3. **Session Management**: Persistent authentication state
4. **Route Protection**: Automatic redirection based on auth status

### Map Integration

1. **User Location**: Real-time GPS tracking
2. **Driver Markers**: Live driver positions with custom icons
3. **Route Calculation**: Directions between pickup and destination
4. **Interactive UI**: Touch-based map interactions

### Ride Booking Process

1. **Destination Selection**: Address search and selection
2. **Driver Discovery**: Available drivers with ETA calculation
3. **Ride Confirmation**: Trip details and pricing
4. **Payment Processing**: Secure Stripe integration
5. **Ride Tracking**: Real-time ride status updates

### State Management

- **Location Store**: User and destination coordinates
- **Driver Store**: Selected driver and available drivers
- **Ride Store**: Current and historical ride data

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📱 Platform Support

- ✅ **Android**: Full support with Google Maps
- ✅ **iOS**: Full support with native maps
- ⚠️ **Web**: Limited support (maps may not work)

## 🔐 Security Features

- **Secure Authentication**: Clerk-based OAuth
- **Environment Variables**: Sensitive data protection
- **API Security**: Secured endpoints with authentication
- **Payment Security**: PCI-compliant Stripe integration

## 🚀 Deployment

### Android (APK/AAB)

```bash
npx eas build --platform android --profile production
```

### iOS (App Store)

```bash
npx eas build --platform ios --profile production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**boytrend0108**

- GitHub: [@boytrend0108](https://github.com/boytrend0108)

## 🙏 Acknowledgments

- **Expo Team** for the excellent development platform
- **Clerk** for seamless authentication
- **Stripe** for secure payment processing
- **Google** for Maps and location services
- **React Native Community** for amazing libraries

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/boytrend0108/uber-clone-rn/issues) page
2. Create a new issue with detailed description
3. Contact the developer via GitHub

**Happy Coding! 🚗💨**

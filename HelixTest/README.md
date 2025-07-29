# HelixTest React Native App

## Setup Instructions

### Prerequisites

- Node.js >= 18
- iOS development environment (Xcode, iOS Simulator)
- CocoaPods (for iOS dependencies)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd HelixTest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install iOS dependencies:**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application:**
   ```bash
   # Start the Metro bundler
   npm start

   # Run on iOS simulator (in another terminal)
   npm run ios
   ```

### Available Scripts

- `npm start` - Start Metro bundler with cache reset
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run Jest tests

## Architecture Decisions

### Core Technologies

- **React Native 0.80.2** - Latest stable version for optimal performance
- **TypeScript** - Type safety and better development experience
- **Redux Toolkit** - State management with modern Redux patterns
- **React Navigation** - Navigation with bottom tabs

### State Management

- **Redux Toolkit**: Centralized state management for user data and app settings
- **Custom Persistence Middleware**: Automatically saves state changes to AsyncStorage
- **Selective State Persistence**: Only persists relevant data (user profile, app settings)

### Data Persistence Strategy

- **AsyncStorage**: Primary storage for user data and app state
- **Custom API Service**: Mock API that integrates with persisted data
- **Offline Service**: Caches data and queues operations for offline support
- **Network State Monitoring**: Uses NetInfo to detect connectivity changes

### Theme System

- **Centralized Colors**: Single source of truth in `colors.ts`
- **Dynamic Themes**: Light and dark theme support with theme context
- **Theme-Aware Components**: All components automatically adapt to theme changes

### Component Architecture

- **Atomic Design Pattern**: Organized components from basic atoms to complex organisms
- **Reusable UI Components**: Button, Input, Card, Text components with consistent APIs
- **Custom Hooks**: Theme and form management hooks for clean component logic

### Services Layer

- **Haptic Service**: iOS haptic feedback with fallback for Android
- **Offline Service**: Data caching and offline operation queuing
- **Persistence Service**: Redux state serialization and storage
- **API Service**: Mock API with realistic async operations

### Form Management

- **React Hook Form**: Performant forms with minimal re-renders
- **Yup Validation**: Schema-based form validation
- **Real-time Validation**: Immediate feedback on form errors

## Known Limitations

### Technical Limitations

1. **iOS-Only Haptic Feedback**: Haptic feedback only works on iOS devices, gracefully falls back on Android
2. **Mock API**: Uses simulated API responses instead of real backend integration
3. **Limited Offline Functionality**: Offline queue is basic and doesn't handle complex conflict resolution 
4. **Image Upload Simulation**: Profile picture upload is mocked with local storage

### Data Persistence Limitations

1. **AsyncStorage Size Limits**: Large data sets may hit AsyncStorage limitations
2. **No Data Encryption**: Stored data is not encrypted (fine for demo purposes)
3. **State Serialization**: Complex objects may not serialize properly
4. **No Backup/Restore**: No cloud backup or device-to-device data transfer

### UI/UX Limitations

1. **Single Theme Toggle**: No system theme following (manual dark/light mode only)
2. **Basic Loading States**: Simple loading indicators without skeleton screens on all components
3. **Limited Accessibility**: Basic accessibility support, not fully optimized

## Future Improvements

- Real backend API integration
- Enhanced offline conflict resolution
- Comprehensive accessibility improvements
- Advanced error handling and monitoring
- Performance optimizations
- Comprehensive test suite
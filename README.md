# CarShare

CarShare is a cutting-edge car-sharing service that revolutionizes urban mobility. Our company-owned fleet of vehicles offers convenient, short-term rentals to the public, providing a modern and flexible alternative to traditional car ownership and rental models.

## Live Demo

Experience CarShare in action: [https://we-car-share.web.app/](https://we-car-share.web.app/)

## Features

- **User Authentication**: Secure login and registration system with email and Google sign-in options.
- **Interactive Map**: Real-time car locations and availability displayed on an intuitive map interface.
- **Advanced Search**: Filter cars by location, price, model, and more to find the perfect match.
- **Booking Management**: Easy-to-use system for creating, viewing, and managing reservations.
- **User Profiles**: Personalized profiles for both car renters and owners.
- **Multilingual Support**: Full support for Hebrew and English, catering to a diverse user base.
- **Responsive Design**: Seamless experience across desktop and mobile devices.
- **Real-time Updates**: Instant notifications and updates on car status and bookings.
- **Favorite Cars**: Save and quickly access your preferred vehicles.
- **Rating System**: Leave and view ratings to ensure quality experiences.

## Technology Stack

- **Frontend**: React.js with Hooks
- **Backend**: Firebase (Authentication, Firestore, Cloud Functions)
- **State Management**: React Context API
- **Routing**: React Router
- **Maps**: react-leaflet
- **Internationalization**: react-i18next
- **UI Components**: Custom components with CSS modules
- **Icons**: react-icons

## Getting Started

**Important:** Before any personal use of this project, you must contact me for approval on [t.me/meniviner](https://t.me/meniviner).

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git
- Firebase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/MeniViner/CarShare.git
   cd CarShare
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Storage services
   - Create a web app in your Firebase project and copy the configuration
   - Create a `.env` file in the root directory and add your Firebase config:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

1. **Sign Up/Login**: Create a new account or log in using existing credentials.
2. **Search for Cars**: Use the map or search filters to find available cars in your area.
3. **Book a Car**: Select a car and choose your rental period.
4. **Manage Bookings**: View and manage your current and past bookings in your profile.
5. **Add Your Car**: Car owners can list their vehicles for rent through the "Add Car" feature.

## Project Structure

```
CarShare/
├── public/
│   ├── index.html
│   └── images/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── BookingSystem/
│   │   ├── CarManagement/
│   │   ├── Map/
│   │   ├── Profile/
│   │   └── UI/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   │   └── firebase/
│   ├── styles/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing

We welcome contributions to CarShare! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

there's not yet any.

## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [react-leaflet](https://react-leaflet.js.org/)
- [react-i18next](https://react.i18next.com/)
- [react-icons](https://react-icons.github.io/react-icons/)

## Contact

Meni Viner - [GitHub](https://github.com/MeniViner)  [telegram](https://t.me/meniviner)

Project Link: [https://github.com/MeniViner/CarShare](https://github.com/MeniViner/CarShare)

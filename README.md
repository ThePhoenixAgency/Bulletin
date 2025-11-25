# Bulletin 📢

Enterprise-grade mobile application for weather, traffic, local events, and alerts. Built with React Native, Supabase, and modern best practices.

## 🎯 Project Overview

Bulletin is a comprehensive information platform that provides users with:
- **Real-time weather updates** with forecasts and alerts
- **Traffic information** for better route planning
- **Local events** discovery and notifications
- **Emergency alerts** with priority notifications
- **AI-powered announcement verification** using HuggingFace models
- **Autonomous content management** via GitHub integration

## 🚀 Features

### Core Functionality
- ✅ Multi-tab navigation (Weather, Traffic, Events, Alerts)
- ✅ Real-time push notifications
- ✅ Geolocation-based content
- ✅ Offline-first architecture
- ✅ Dark/Light theme support

### AI-Powered Features
- 🤖 **Announcement Verification**: AI analyzes and verifies content authenticity
- 🤖 **Autonomous Actions**: AI can create GitHub issues and manage repository content
- 🤖 **Content Analysis**: Trend detection and sentiment analysis
- 🤖 **Fallback System**: Dual AI tokens (TOKEN_HF_BULLETIN1 & TOKEN_HF_BULLETIN2)

## 📚 Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Supabase (PostgreSQL)
- **AI**: HuggingFace Inference API
- **Automation**: N8N workflows
- **SMS**: TextBelt service
- **Maps**: Google Maps API
- **Weather**: OpenWeatherMap API
- **Hosting**: Render

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

### Supabase Configuration
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### AI Tokens (HuggingFace)
⚠️ **IMPORTANT**: These tokens enable AI-powered features

```
# Primary AI token with write access to repository
TOKEN_HF_BULLETIN1=hf_xxxxxxxxxxxxxxxxxxxxxxxx

# Fallback token in case primary fails
TOKEN_HF_BULLETIN2=hf_xxxxxxxxxxxxxxxxxxxxxxxx
```

**AI Token Requirements:**
- Large context window support
- Token-free or high token limits
- Good training on text classification
- Models: TBD (to be configured in `src/services/aiService.js`)

### Other Services
```
WEATHER_API_KEY=your_openweathermap_api_key
TRAFFIC_API_KEY=your_traffic_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
TEXTBELT_API_URL=your_textbelt_service_url
TEXTBELT_API_KEY=your_textbelt_api_key
N8N_WEBHOOK_URL=your_n8n_webhook_url
N8N_API_KEY=your_n8n_api_key
GITHUB_TOKEN=your_github_token_with_write_access
EXPO_PUSH_TOKEN=your_expo_push_notification_token
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/ThePhoenixAgency/Bulletin.git
cd Bulletin
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

4. **Start the development server**
```bash
npm start
# or
expo start
```

5. **Run on device/emulator**
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on physical device

## 📚 Project Structure

```
Bulletin/
├── src/
│   ├── config/
│   │   └── supabase.js         # Supabase client & helpers
│   ├── services/
│   │   ├── aiService.js        # AI verification & autonomous actions
│   │   ├── notificationService.js  # Push notifications
│   │   ├── weatherService.js   # Weather API integration
│   │   └── textBeltService.js  # SMS service
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── WeatherScreen.js
│   │   ├── TrafficScreen.js
│   │   ├── EventsScreen.js
│   │   └── AlertsScreen.js
│   └── components/         # Reusable UI components
├── App.js                   # Main application entry
├── package.json
├── .env.example
└── BEST_PRACTICES.md        # Development guidelines
```

## 🤖 AI Service

The AI service (`src/services/aiService.js`) provides:

### Features
1. **Announcement Verification**
   - Authenticity scoring
   - Safety assessment
   - Relevance rating
   - Automated approval/rejection

2. **Autonomous Repository Actions**
   - Create GitHub issues
   - Update repository files
   - Manage announcements
   - All actions tagged with `[AI]`

3. **Content Analysis**
   - Trend detection
   - Sentiment analysis
   - Topic identification

### Token System
- **TOKEN_HF_BULLETIN1**: Primary token for all AI operations
- **TOKEN_HF_BULLETIN2**: Automatic fallback if primary fails
- Seamless failover with logging

## 💾 Database Schema (Supabase)

### Tables
- `announcements` - User-submitted and AI-verified announcements
- `weather_data` - Cached weather information
- `events` - Local events with categories
- `alerts` - Emergency and priority alerts
- `system_health` - Application health metrics

## 🚧 Next Steps

### Immediate Tasks
- [ ] Create Supabase project and configure database
- [ ] Create TOKEN_HF_BULLETIN1 on HuggingFace
- [ ] Create TOKEN_HF_BULLETIN2 on HuggingFace
- [ ] Choose appropriate HuggingFace models
- [ ] Create Render accounts for hosting (N8N, TextBelt, Bulletin)
- [ ] Implement screen components
- [ ] Set up N8N automation workflows
- [ ] Deploy TextBelt SMS service

### Future Enhancements
- [ ] Implement user authentication
- [ ] Add social features (comments, reactions)
- [ ] Multi-language support
- [ ] Advanced map features with traffic layers
- [ ] Integration with more data sources
- [ ] Machine learning for personalized content

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Follow the guidelines in `BEST_PRACTICES.md`
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 📧 Contact

Phoenix Agency - ThePhoenixAgency

---

**Built with ❤️ using React Native, Supabase, and AI**

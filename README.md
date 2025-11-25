 veux 0 dependances
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

## 🔗 Survival Blockchain Layer

**Purpose**: Decentralized, cataclysm-resistant ledger for critical information

### Features
- ✅ **Consensus-free** - Each node is authority on its data
- ✅ **Sharded architecture** - Works with partial network connectivity
- ✅ **Cataclysm resistant** - Survives infrastructure collapse
- ✅ **Offline-first** - No internet required for validation
- ✅ **Multi-chain support** - Emergency data, resource maps, location history
- ✅ **IPFS integration** - Distributed storage for large data
- ✅ **Zero-knowledge proofs** - Privacy-preserving verification

### Blockchain Use Cases
1. **Emergency Registry** - People, resources, needs (survives services)  
2. **Resource Maps** - Water, food, shelter locations (local + global)
3. **Medical History** - Health records accessible without internet
4. **Trust Network** - Verified identities in survival situations
5. **Location History** - Tracks where users have been (for rescue)

---

## 🎯 AI-Powered OSINT Localization System

**Purpose**: Determine exact location when GPS fails or unavailable (enclosed spaces, underground, etc.)

### Multi-Sensor Fusion

#### Visual Recognition (Camera-based)
- **Architectural OSINT** - Building styles, materials, condition
- **Street signs** - Business names, addresses, graffiti
- **Landmarks** - Distinctive buildings, monuments, geological features
- **License plates** - Regional encoding, vehicle types
- **Utility infrastructure** - Power lines, water towers, antenna patterns
- **Sky/weather** - Cloud formations, sun angle, atmospheric conditions
- **AI Model**: OpenRouter best vision model + HuggingFace local fallback

#### Audio Recognition (Acoustic fingerprinting)
- **Traffic patterns** - Highway noise, train timing, airport proximity
- **Ambient sounds** - Industrial machinery, water flow, ventilation
- **Human activity** - Language, accents, crowd noise patterns
- **Animal sounds** - Regional wildlife, bird calls
- **Infrastructure hum** - Powerline frequency, specific machinery signatures
- **AI Model**: HuggingFace audio classification + local Whisper

#### Inertial Navigation (Dead Reckoning)
- **Accelerometer** - Distance traveled, terrain roughness
- **Gyroscope** - Direction, turns, elevation changes
- **Kalman filter** - Sensor fusion for accurate trajectory
- **Stores previous paths** - Recognizes familiar routes

#### Radio Frequency Environment Mapping
- **WiFi networks** - SSID fingerprints, MAC addresses
- **Cellular signals** - Tower IDs, signal strengths
- **Bluetooth beacons** - Known locations with BLE markers
- **Radio stations** - FM/AM signal strength triangulation
- **Signal strength grid** - Creates RF heatmap

#### Electromagnetic Field Sensing
- **Powerline detection** - Frequency and strength (50/60 Hz)
- **Magnetic anomalies** - Metal deposits, ore bodies
- **EM radiation** - Radio antennas, microwave towers
- **Geomagnetic reference** - Compares local variations to global map

#### Seismic/Vibration Sensing
- **Ground vibrations** - Train/traffic distance, intensity
- **Building resonance** - Structural characteristics
- **Machinery vibrations** - Industrial facilities nearby
- **Seismic events** - Distance to epicenter (if earthquake)

### Blind Localization (Enclosed Spaces)
**When completely blind (box, bunker, underground)**:
- Audio + Inertial + EM field = **Rough location** (±1km)
- Add vibration + seismic = **Better accuracy** (±500m)
- Historical paths + machine learning = **Convergence** (±100m)

### AI Orchestration
- **Primary**: OpenRouter best-of-breed models (vision, audio, reasoning)
- **Fallback**: HuggingFace free tier models locally cached
- **Fusion algorithm**: Weighted sensor confidence scoring
- **Continuous learning**: Improves with more observations

---

## 🤖 AI Engine Architecture

### Multi-AI Strategy
1. **Vision Analysis** (Location recognition from camera)
   - OpenRouter: Claude 3 + GPT-4V (best) 
   - Fallback: HuggingFace: DINO + CLIP local models
   
2. **Audio Analysis** (Acoustic fingerprinting + speech recognition)
   - OpenRouter: Best speech-to-text + analysis
   - Fallback: HuggingFace: Whisper + Audio Classification
   
3. **Sensor Fusion** (Multi-modal reasoning)
   - OpenRouter: Reasoning models (Claude, Grok)
   - Fallback: Local lightweight models
   
4. **Location Inference** (OSINT reasoning)
   - Query all sensors + AI models
   - Confidence scoring per input
   - Consensus-based location estimate
   - Updates continuously as new data arrives

### Token-Free Fallback Strategy
- **Token-based APIs**: OpenRouter (pay-as-you-go) until failure
- **Token-free tier**: HuggingFace free (100k tokens/month)
- **Fully local**: On-device tiny models for core functions
- **Graceful degradation**: Worst case still localizes using inertial + RF

---## 🌟 Emergency Agent Protocol (Voice-Activated Survival Mode)

**Scenario**: Secret agent/undercover operative is captured/lost, needs to activate covert survival mode via voice command

### Activation
- **Voice keyword** (customizable, e.g., "Phoenix Ablaze", "Signal Lost", etc.)
- **Recognition**: Local voice biometrics (never sent to cloud)
- **Confirmation**: Silent vibration pattern (no audio alert)
- **Trigger**: Sends emergency signal within 5 seconds

### Immediate Actions (Silent, No Visual Indicators)
1. ✅ **Kill cloud connectivity** - Blocks all cloud APIs
2. ✅ **Enable mesh-only mode** - Routes only through P2P networks
3. ✅ **Stealth mode active** - All transmissions encrypted + obfuscated
4. ✅ **GPS stripping** - Removes precise location from broadcasts
5. ✅ **Network fingerprint**: Uses every available RF, BLE, WiFi signal
6. ✅ **Silent beacon**: Transmits location via:
   - Mesh network hops
   - Starlink satellite overheads
   - Opportunistic drones
   - Radio bursts
   - EMI patterns

### Signal Encoding (Invisible Exfiltration)
- **Primary**: Mesh network with multipath routing
  - Sends location in 3 simultaneous encrypted paths
  - Each path jumps through different protocols (BLE→WiFi→Radio)
  - Receiver decrypts via EdDSA signatures

- **Secondary**: Radio burst encoding
  - Compresses location into ultra-brief RF transmission
  - Frequency-hopping to avoid detection
  - Can be received by amateur radio worldwide

- **Tertiary**: Acoustic watermark (if near open area)
  - Embeds location data in ambient sound
  - Detectable only with knowledge of key frequencies

- **Quaternary**: EM field modulation
  - Uses powerline carrier (50/60 Hz + harmonics)
  - Modulates survival information into electrical grid
  - Receivable from any electrical outlet wirelessly

### Geographic Triangulation (Agent Localization)
**Recovery team receives**:
- Last known GPS (before stealth)
- RF signal strength from multiple stations
- Mesh network hop count (indicates distance)
- Audio analysis of background (what location sounds like)
- Inertial data (how agent is moving)
- Blockchain entry: "Agent <ID> missing at <time>" (immutable record)

**Recovery algorithm**:
1. Triangulate RF signals (multiple receivers needed)
2. Match acoustic fingerprints to known locations
3. Use inertial paths + historical movement patterns
4. Correlate vibration signatures (trains, machinery)
5. AI OSINT on any uploaded images/video
6. Result: ±100-500m accuracy even in urban canyons

### Continuous Operation (No Battery Limit)
- **Vibration cascade wake-up**: Taps nearby devices to relay messages
- **Ultra-low-power mode**: Location every 30min via single RF burst
- **Power-harvesting**: Uses ambient RF, vibrations, thermal
- **Graceful degradation**: Works even on 1% battery

### Recovery Coordination
**Rescue team**:
- Receives encrypted location updates via mesh
- Can send "Found you" confirmation (activates visible beacon)
- Can send new instructions (e.g., "Move North", "Hide 2hrs")
- All communication via mesh + blockchain record

### Operational Security
- ✅ **No cloud witnesses** - All survival mode data stays local/mesh
- ✅ **No location history** - Clears on activation
- ✅ **Device auto-destruct**: If tampered, erases blockchain entries
- ✅ **Silent operation** - No sounds, no screen, no notifications
- ✅ **Protocol obfuscation** - Cannot be detected by traffic analysis
- ✅ **Multi-identity**: Can mask as civilian device on same network

---

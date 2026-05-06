# 🟢 Poket — Smart Savings by GXBank

> A high-fidelity React Native prototype for a Gen Z-focused financial wellness app, built for a hackathon.

---

## 📱 What is Poket?

**Poket** is a mobile-first personal finance assistant that helps young Malaysians build better saving habits through:

- **AI Smart Nudge** — Contextual financial advice after every spend (reacts to the real merchant, category, and budget %)
- **Live Spending Tracker** — Simulated transactions update your budget and spending breakdown in real-time
- **Savings Goals** — Create, track, and fund goals with one tap from the smart nudge
- **Debt Radar** — BNPL risk assessment with a monthly commitment vs. income ratio calculator
- **Daily Streak** — Gamified savings streaks with motivation messages
- **Poket Challenge** — National savings leaderboard with milestone rewards
- **Spending DNA** — Category-level spending breakdown that updates live from your transactions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo SDK 54) |
| Navigation | React Navigation (Bottom Tabs) |
| Styling | Inline StyleSheet + expo-linear-gradient |
| State | React Context API |
| AI Advice | Smart computed responses (demo mode) |
| Icons | lucide-react-native |

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Expo dev server
npx expo start

# 3. Scan the QR code with Expo Go on your phone
#    OR press W to open in browser
```

No `.env` file or API keys required — the app runs fully offline.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.tsx      # Bottom tab navigator
│   │   ├── TextShimmer.tsx # Loading animation
│   │   ├── BNPLRow.tsx     # BNPL plan row card
│   │   └── StreakDayCircle.tsx
│   └── screens/
│       ├── Home.tsx        # Dashboard + AI Smart Nudge + Transaction Simulator
│       ├── SpendingDNA.tsx # Live category spending breakdown
│       ├── SavingsGoals.tsx# Goals CRUD + AI Savings Coach
│       ├── StreakTracker.tsx
│       ├── DebtRadar.tsx   # BNPL risk calculator
│       ├── Challenge.tsx   # National savings leaderboard
│       └── Profile.tsx
├── context/
│   └── AppContext.tsx      # Global state: transactions, goals, balance, categorySpending
└── services/
    └── smartAdvice.ts      # AI-style computed financial advice (no API needed)
```

---

## ✨ Demo Flow

1. Open the app → see your live balance and budget on the **Home** screen
2. Tap **"Simulate Transaction"** → pick a spend (GrabFood, Shopee, etc.)
3. Watch the **Smart Nudge** refresh with advice specific to that merchant + your current budget %
4. Tap **"Save RM X to [goal]"** → the amount is deducted from your balance and added to the goal
5. Navigate to **Goals** to see the goal's progress bar update
6. Navigate to **Spending** to see the category spending update in real-time
7. Navigate to **Debt Radar** → see BNPL risk level + AI advice
8. Navigate to **Profile** → access Challenge leaderboard and Debt Radar

---

## 📝 Notes

- This is a **high-fidelity prototype** — all data is in-memory and resets on reload
- The "AI" advice is computed deterministically from real app state (merchant, budget %, goal name) — no API calls, no quota limits
- Designed to match GXBank's dark-themed aesthetic

---

*Built with ❤️ for hackathon*

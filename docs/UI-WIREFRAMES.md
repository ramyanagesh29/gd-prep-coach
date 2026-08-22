# GD Prep Coach — UI & User Flow

**Day 2 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

---

## User Flow Diagram

```mermaid
flowchart TD
    A[Landing / Login Page] -->|New user| B[Signup]
    A -->|Existing user| C[Login]
    B --> D[Dashboard]
    C --> D[Dashboard]
    D --> E[Topics Page]
    D --> F[History Page]
    D -->|Edit goal| G[Goal Settings]
    E -->|Select topic| H[Practice Page]
    H -->|Type or Speak| H
    H -->|Submit| I[Analyzing... Loading State]
    I --> J[Results Page]
    J -->|Practice Another| E
    J -->|Back to Dashboard| D
    F -->|Click past attempt| K[Attempt Detail View]
    K --> F
```

---

## Screen List (every screen exists for a reason)

| Screen | Purpose |
|---|---|
| Login | Entry point for returning users |
| Signup | Entry point for new users |
| Dashboard | Home base after login — streak, goal progress, reminder, recent scores, quick links |
| Topics | Browse/filter GD topics, entry point to practice |
| Practice | Core action screen — respond to a topic via text/voice |
| Loading (Analyzing) | Feedback during AI call — prevents confusion during wait |
| Results | Shows score + structured feedback immediately after submission |
| History | List of all past attempts with scores |
| Attempt Detail | Full feedback view for a specific past attempt (reuses Results layout) |
| Goal Settings | Simple form to edit weekly goal |

---

## Navigation Structure

```mermaid
flowchart LR
    Nav[NavBar - visible when logged in] --> Dash[Dashboard]
    Nav --> Top[Topics]
    Nav --> Hist[History]
    Nav --> Logout[Logout]
```

Persistent top navbar across all authenticated screens: **Dashboard | Topics | History | Logout**. Login/Signup screens have no navbar (unauthenticated state).

---

## Low-Fidelity Wireframes

### Login / Signup
```
+--------------------------------+
|         GD Prep Coach          |
|                                |
|   [ Email input           ]   |
|   [ Password input        ]   |
|   [     Login Button      ]   |
|                                |
|   New here? Sign up →         |
+--------------------------------+
```

### Dashboard
```
+--------------------------------------------+
| NavBar: Dashboard | Topics | History | Logout|
+--------------------------------------------+
| 🔥 Streak: 4 days     Weekly Goal: ▓▓▓░ 2/3  |
| [ Reminder banner: "Practice today!" ]      |
|                                              |
| Recent Attempts                             |
| - Topic A   Score: 78   2 days ago          |
| - Topic B   Score: 65   3 days ago          |
+--------------------------------------------+
```

### Topics
```
+--------------------------------------------+
| NavBar                                      |
+--------------------------------------------+
| Filter: [All] [Current Affairs] [Abstract]  |
|                                              |
| [Topic Card]   [Topic Card]   [Topic Card]  |
|  Title          Title          Title        |
|  [Start →]      [Start →]      [Start →]    |
+--------------------------------------------+
```

### Practice
```
+--------------------------------------------+
| NavBar                                      |
+--------------------------------------------+
| Topic: "Should India adopt UBI?"            |
|                                              |
| [ Textarea for response              ]      |
| [ 🎤 Speak ]         [ Submit → ]           |
+--------------------------------------------+
```

### Results
```
+--------------------------------------------+
| NavBar                                      |
+--------------------------------------------+
|            Score: 78 / 100                  |
|                                              |
| Clarity: ...      Structure: ...            |
| Relevance: ...    Assertiveness: ...        |
|                                              |
| Improvement Tips:                           |
| - Tip 1                                     |
| - Tip 2                                     |
|                                              |
| [ Practice Another ]  [ Back to Dashboard ] |
+--------------------------------------------+
```

### History
```
+--------------------------------------------+
| NavBar                                      |
+--------------------------------------------+
| Topic          Score      Date              |
| Topic A        78         Aug 20            |
| Topic B        65         Aug 19            |
| Topic C        82         Aug 17            |
+--------------------------------------------+
```

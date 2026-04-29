# 🛡️ VANGUARD: Threat Intelligence Dashboard

VANGUARD is a high-performance, frontend "Command Center" designed for cybersecurity analysts. It simulates a real-time monitoring environment by ingesting vulnerability data (like CVEs) and transforming raw JSON into an interactive, visually readable, and actionable dashboard.

This project was built as a capstone to demonstrate advanced frontend architecture, state management, and data visualization.

## ✨ Core Features

* **⚡ Real-Time Data Engine:** Instantly search through threat databases by CVE ID, vulnerability name, or affected system.
* **🎯 Dynamic Filtering:** Sort active threats by severity (Critical, High, Medium, Low) using instant state updates without page reloads.
* **📈 Visual Analytics:** Automated parsing of threat data into interactive charts:
  * **Severity Distribution:** A color-coded Donut Chart tracking the volume of threat levels.
  * **CVSS Plotting:** A Bar Chart mapping the specific Base Scores of active vulnerabilities.
* **🧭 Seamless Routing:** A multi-page Single Page Application (SPA) architecture allowing instant navigation between the Live Feed and the Analytics Engine.
* **🎨 Tactical UI/UX:** A custom-built, military-grade dark theme (brown/amber) optimized for low eye strain during continuous monitoring.

## 🛠️ Tech Stack

* **Core Framework:** React 18 + Vite (for lightning-fast HMR and optimized builds)
* **Styling:** Tailwind CSS (v3)
* **Routing:** React Router v6 (`react-router-dom`)
* **Data Visualization:** Recharts
* **Icons:** Lucide React

## 🚀 Getting Started

To run VANGUARD locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/VANGUARD.git](https://github.com/YOUR_GITHUB_USERNAME/VANGUARD.git)

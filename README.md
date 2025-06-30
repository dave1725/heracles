# Heracles - Level Up Your Maintenance

Heracles is a modern, Windows-native system maintenance toolkit that provides diagnostics, optimization, and security management for power users and IT professionals.

It combines a responsive, Next.js-powered frontend with real-time system insights and actionable PowerShell automation — including startup control, performance monitoring, quick scans, Windows updates, security signals, and more.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://shields.io/)
[![Version](https://img.shields.io/badge/version-v1.0.0--beta-yellow)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%2010%2B-blue)](https://www.microsoft.com/windows)
[![Node.js](https://img.shields.io/badge/node-%3E=18.0.0-brightgreen)](https://nodejs.org/)
[![PowerShell](https://img.shields.io/badge/PowerShell-%3E=5.1-lightgrey)](https://docs.microsoft.com/en-us/powershell/)
[![Next.js](https://img.shields.io/badge/Next.js-%5E15.1.0-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-%5E3.0.0-38bdf8)](https://tailwindcss.com/)

[![GitHub Stars](https://img.shields.io/github/stars/dave1725/heracles?style=social)](https://github.com/dave1725/heracles/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/dave1725/heracles?style=social)](https://github.com/dave1725/heracles/network/members)
[![GitHub Watchers](https://img.shields.io/github/watchers/dave1725/heracles?style=social)](https://github.com/dave1725/heracles/watchers)


> **Note:** Heracles is currently in `public beta`. The application is fully functional, but certain features are still under active development. Contributions and feedback are welcome.

## Features

Heracles provides a unified control panel for Windows optimization with native-level performance, full transparency, and secure scripting. Key features include:

### 🔧 System Maintenance Tools
- **Quick Actions**: One-click controls for temp cleanup, DNS flush, recycle bin emptying, and more.
- **Startup Manager**: View, enable, or disable startup items sourced from Registry and Startup folders.
- **Recycle Bin Management**: Force clear the Recycle Bin without prompts.

### 📊 Performance Monitoring
- **Live System Stats**: Track CPU load, RAM usage, disk consumption, and uptime.
- **Battery Diagnostics**: Displays charging state, battery wear, estimated runtime, and chemistry.
- **Thermal Status**: Reads live temperature values from TZ(if supported).
- **Power State Configuration**: Adjust AC/DC processor throttle limits with persistent saving.

### 🔒 Security Center
- **Signal Checks**: Get live status of core features like UAC, Secure Boot, SmartScreen, Firewall, Defender, RDP, and more.
- **Windows Updates**: Check update status and pending reboots directly from the interface.
- **Scan Summary Modal**: Integrated scan result modals with last run time and threat count.

### 💡 Design & Tech Stack
- **Framework**: Next.js 13+ App Router with API Routes
- **UI Library**: Tailwind CSS + ShadCN UI
- **Backend Scripting**: PowerShell for system-level interaction
- **Notification System**: Sonner-based toast UI for interactive feedback

> All actions run locally and securely with no external dependencies. Heracles is privacy-respecting and offline-friendly.

## Getting Started

To run Heracles on your Windows system, you’ll need to install dependencies and launch the app in development or production mode.

> ⚠️ Heracles requires **Windows 10 or higher** with administrative privileges to execute system-level PowerShell scripts.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 18.x
- [PowerShell 5.1+](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell)
- Git (optional, for cloning the repository)

---

### Installation

```bash
git clone https://github.com/dave1725/heracles.git
cd heracles
npm install


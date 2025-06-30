# Heracles – Level Up Your Maintenance

Heracles is a modern, Windows-native system maintenance toolkit built for power users and IT professionals.  
It delivers diagnostics, optimization, and security management through a real-time Next.js interface, backed by tightly integrated PowerShell automation.

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

> **Note:** Heracles is currently in **public beta**. All core features are stable, but enhancements and refinements are actively ongoing.  
> Contributions, bug reports, and feature suggestions are highly appreciated.


## Features

Heracles provides a comprehensive suite of tools for monitoring, diagnosing, and optimizing Windows systems.

### 🖥️ System Monitoring
- Real-time CPU, memory, disk, and battery statistics
- CPU load, thread count, virtualization status, speed monitoring
- Thermal data (temperature sensors, if supported)
- Uptime tracking with reboot suggestions

### 🚀 Performance Optimization
- Clean temporary files (AppData, Temp, %SystemTemp%)
- Flush DNS cache
- Restart Windows Explorer instantly
- Adjust processor power states (AC/DC performance configuration)
- Empty Recycle Bin via automation

### 🔐 Security & Stability
- Quick Windows Defender scan integration
- Display recent scan results and threat count
- System security signal overview (UAC, RDP, Secure Boot, etc.)

### ⚙️ System Control
- Startup program manager (enable/disable entries from registry & folders)
- Windows Update status checker
- Battery health and runtime insights (for portable devices)

### 📡 Backend Integration
- PowerShell automation for all critical actions
- Next.js API routes with Promisified PowerShell execution
- Polling & scheduling support for key metrics

### 💡 Developer Friendly
- Built using Next.js App Router, Tailwind CSS, and ShadCN UI
- Modular and extensible architecture
- Clean, documented codebase with separation of concerns

## Getting Started

To run Heracles on your Windows system, you’ll need to install dependencies and launch the app in development or production mode.

> ⚠️ Heracles requires **Windows 10 or higher** with administrative privileges to execute system-level PowerShell scripts.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 18.x
- [PowerShell 5.1+](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell)
- Git (optional, for cloning the repository)


### Installation

Follow these steps to install and run Heracles on your Windows machine:

---
- Please clone the repo

    ```bash
    git clone https://github.com/dave1725/heracles.git
    ```

- Get into the repo

    ```bash
    cd heracles
    ```

- Install dependencies

    ```bash
    npm install
    ```

- Run terminal as Administrator

    Heracles requires elevated privileges to execute PowerShell scripts and interact with system-level resources
    > Make sure to open your terminal (CMD or PowerShell) as Administrator for proper execution.


- Next, please build the application

    ```bash
    npm run build
    ```

- Next, start your production server
    ```bash
    npm start   
    ```
The application will now be accessible at: `http://localhost:3000`

## Author(s)

This project is developed and maintained by:

- **Dave** – [@dave1725](https://github.com/dave1725)  
  _Lead Developer, PowerShell Integration, UI/UX Design, System Architecture_

---

If you’d like to contribute to the project, please check the [Contributing Guide](CONTRIBUTING.md) and open a pull request or issue.


# License
This project is open-source and licensed under [GNU](https://choosealicense.com/licenses/gpl-3.0/). Feel free to contribute and be part of the digital evolution.




# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.0.0-beta] - 2025-06-29

### Added
- Initial public beta release of **Heracles**
- System Performance Monitoring:
  - CPU usage, clock speed, virtualization, and threading info
  - RAM usage, virtual memory, and committed memory
  - Disk usage aggregation across volumes
  - Battery and thermal sensor data (where available)
- Startup Programs Manager with enable/disable support
- Quick Actions:
  - Clean temp files
  - Flush DNS
  - Restart Explorer
  - Run basic system scan
  - Empty Recycle Bin
- Windows Updates section with live update checks
- Security Center:
  - SmartScreen, UAC, Secure Boot, RDP status, etc.
- Processor Power State configuration for AC/DC modes
- Network Information: adapter status, IPs, DNS, SSID
- Fully responsive UI built with TailwindCSS and ShadCN UI
- PowerShell-driven backend with real-time data via Next.js API routes

### Changed
- Internal folder structure aligned for modular feature scaling
- Reorganized scripts and endpoint handling for maintainability

### Known Issues
- Thermal sensors may report `N/A` on unsupported systems
- PowerShell execution policy may require admin privilege
- Some cleanup tools may be scoped to `C:` drive only in this release
---

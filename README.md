. Service Status Checker
Monitor essential services (e.g., Windows Update, Defender, Print Spooler, etc.)

🔹 Script: serviceStatus.ps1
Returns a list of key services and their status.

2. Startup Programs List
Show programs set to auto-start with Windows — useful for cleanup.

🔹 Script: startupPrograms.ps1
3. Battery Health (if on laptop)
Gives charge level, wear status, AC plugged-in, etc.

🔹 Script: batteryStatus.ps1
4. Running Processes (Top Memory/CPU)
List top N memory/cpu consuming processes.

🔹 Script: processUsage.ps1
5. Windows Updates Summary
Check if updates are pending, last install date, reboot required, etc.

🔹 Script: windowsUpdates.ps1
6. Event Log Warnings/Errors (Optional but advanced)
Basic summary of system event log errors.

🔹 Script: eventLogs.ps1


Item	Description
Windows SmartScreen	Protects against malicious downloads and sites.
Secure Boot	Ensures system boots using trusted software only.
User Account Control (UAC)	Helps prevent unauthorized changes.
Remote Desktop (RDP) Status	Shows if RDP is enabled, a potential attack vector.
Windows Hello / Biometrics	Shows if biometric login is set up.
Automatic Updates	Indicates whether security updates are automatically installed.
Windows Security Center Status	Confirms if Windows Defender and monitoring services are active.

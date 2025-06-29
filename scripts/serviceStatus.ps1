# serviceStatus.ps1

try {
    $serviceNames = @(
    "wuauserv", "BITS", "MSIServer",
    "WinDefend", "wscsvc",
    "Dhcp", "Dnscache", "LanmanWorkstation", "LanmanServer",
    "Spooler", "AudioSrv", "TermService", "EventLog",
    "Winmgmt", "TrustedInstaller",        # <–– added essentials
    "Themes", "ShellHWDetection", "SysMain" # <–– optional
)


    $services = Get-Service | Where-Object { $serviceNames -contains $_.Name }

    $output = @()

    foreach ($service in $services) {
        $details = Get-CimInstance -ClassName Win32_Service -Filter "Name='$($service.Name)'"

        $output += @{
            name = $service.Name
            displayName = $service.DisplayName
            status = $details.State
            startType = $details.StartMode
        }
    }

    $output | ConvertTo-Json -Compress
}
catch {
    Write-Error "Error fetching service status: $_"
    exit 1
}

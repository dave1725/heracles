$os = Get-CimInstance Win32_OperatingSystem

if ($os -and $os.LastBootUpTime) {
    # Try to parse LastBootUpTime safely
    try {
        $bootDate = [Management.ManagementDateTimeConverter]::ToDateTime($os.LastBootUpTime)
    } catch {
        $bootDate = $null
    }
}

if (-not $bootDate) {
    # Fallback: use systeminfo to get system boot time string
    $systeminfo = systeminfo | Select-String "System Boot Time"
    if ($systeminfo) {
        $bootDateStr = $systeminfo -replace "System Boot Time:\s*", ""
        $bootDate = [datetime]::Parse($bootDateStr)
    }
}

if (-not $bootDate) {
    Write-Error "Unable to determine system boot time."
    exit 1
}

$uptime = (Get-Date) - $bootDate

$output = @{
    uptimeHours = [math]::Floor($uptime.TotalHours)
    uptimeMinutes = [math]::Floor($uptime.TotalMinutes % 60)
}

$output | ConvertTo-Json -Compress

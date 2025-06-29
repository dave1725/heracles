# diskUsage.ps1

try {
    $drives = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" # fixed drives only

    if (-not $drives) {
        Write-Error "No fixed drives found."
        exit 1
    }

    $output = @()

    foreach ($drive in $drives) {
        $totalGB = [math]::Round($drive.Size / 1GB, 2)
        $freeGB = [math]::Round($drive.FreeSpace / 1GB, 2)
        $usedGB = [math]::Round($totalGB - $freeGB, 2)
        $usedPercent = if ($totalGB -ne 0) {
            [math]::Round(($usedGB / $totalGB) * 100, 2)
        } else {
            0
        }

        $output += @{
            deviceID = $drive.DeviceID
            volumeName = $drive.VolumeName
            totalGB = $totalGB
            freeGB = $freeGB
            usedGB = $usedGB
            usedPercent = $usedPercent
        }
    }

    $output | ConvertTo-Json -Compress
}
catch {
    Write-Error "Error fetching disk usage: $_"
    exit 1
}

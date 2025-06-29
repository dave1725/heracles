# getWindowsUpdates.ps1
$Result = @{}

try {
    # Get list of available updates (use COM object)
    $updateSession = New-Object -ComObject Microsoft.Update.Session
    $updateSearcher = $updateSession.CreateUpdateSearcher()
    $searchResult = $updateSearcher.Search("IsInstalled=0")

    $pendingUpdates = @()
    foreach ($update in $searchResult.Updates) {
        $pendingUpdates += $update.Title
    }

    $Result.updatesAvailable = $pendingUpdates.Count -gt 0
    $Result.pendingUpdates = $pendingUpdates
}
catch {
    $Result.updatesAvailable = $false
    $Result.pendingUpdates = @()
}

# Reboot required
try {
    $needsReboot = Test-Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update\RebootRequired"
    $Result.rebootRequired = $needsReboot
}
catch {
    $Result.rebootRequired = $false
}

$Result.lastChecked = Get-Date -Format "yyyy-MM-dd HH:mm"
$Result | ConvertTo-Json -Compress

$ProgressPreference = 'SilentlyContinue'

try {
    Clear-RecycleBin -Force -ErrorAction Stop | Out-Null
    $result = @{ success = $true; message = "Recycle Bin emptied successfully on all drives." }
} catch {
    $result = @{ success = $false; message = "Failed to empty Recycle Bin." }
}

$result | ConvertTo-Json -Compress

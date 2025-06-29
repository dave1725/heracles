# Suppress all errors and output, only return JSON
$ProgressPreference = 'SilentlyContinue'

try {
    Clear-RecycleBin -DriveLetter C -Force -ErrorAction Stop | Out-Null
    $result = @{ success = $true; message = "Recycle Bin on C: emptied successfully." }
} catch {
    $result = @{ success = $false; message = "Failed to empty Recycle Bin on C:." }
}

$result | ConvertTo-Json -Compress

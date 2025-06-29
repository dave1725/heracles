# Start-MpScan -ScanType FullScan
# Write-Output '{"success":true,"message":"System scan started."}'

try {
    # Start a quick scan
    Start-MpScan -ScanType QuickScan

    # Wait for scan to start and optionally complete (poll status)
    Start-Sleep -Seconds 2

    $status = Get-MpComputerStatus

    if ($status.AntivirusEnabled -and $status.RealTimeProtectionEnabled) {
        $result = @{
            success = $true
            message = "Quick scan completed successfully."
            lastScanTime = $status.AntivirusSignatureLastUpdated
            malwareDetected = $status.LastThreatStatus
        }
    } else {
        $result = @{
            success = $false
            message = "Quick scan completed, but antivirus or RTP is disabled."
        }
    }

    $result | ConvertTo-Json -Compress
} catch {
    Write-Output (@{
        success = $false
        message = "Quick scan failed. Error: $($_.Exception.Message)"
    } | ConvertTo-Json -Compress)
}





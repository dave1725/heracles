# networkInfo.ps1 (safe version)

try {
    $adapters = Get-CimInstance Win32_NetworkAdapterConfiguration | Where-Object { $_.IPEnabled -eq $true }

    if (-not $adapters) {
        Write-Error "No active network adapters found."
        exit 1
    }

    $output = @()

    foreach ($adapter in $adapters) {
        $info = @{
            description     = $adapter.Description
            macAddress      = $adapter.MACAddress
            ipAddress       = if ($adapter.IPAddress) { $adapter.IPAddress[0] } else { "" }
            subnetMask      = if ($adapter.IPSubnet) { $adapter.IPSubnet[0] } else { "" }
            defaultGateway  = if ($adapter.DefaultIPGateway) { $adapter.DefaultIPGateway[0] } else { "" }
        }

        $output += $info
    }

    $output | ConvertTo-Json -Compress
}
catch {
    Write-Error "Error fetching network info: $_"
    exit 1
}

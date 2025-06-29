$adapters = Get-NetAdapter | Where-Object { $_.Status -ne "Not Present" } | ForEach-Object {
    $ip = Get-NetIPAddress -InterfaceAlias $_.Name -AddressFamily IPv4 -ErrorAction SilentlyContinue | Select-Object -First 1
    $ipv6 = Get-NetIPAddress -InterfaceAlias $_.Name -AddressFamily IPv6 -ErrorAction SilentlyContinue | Select-Object -First 1
    $dns = (Get-DnsClientServerAddress -InterfaceAlias $_.Name -ErrorAction SilentlyContinue).ServerAddresses

    $speedRaw = $_.LinkSpeed
    $speedMbps = if ($speedRaw) {
        # Extract numeric part and convert Gbps/Mbps to Mbps
        if ($speedRaw -match '([\d\.]+)\s*Gbps') {
            [int]([double]$matches[1] * 1000)
        } elseif ($speedRaw -match '([\d\.]+)\s*Mbps') {
            [int][double]$matches[1]
        } else {
            $null  # Unknown format
        }
    }

    [PSCustomObject]@{
        id     = $_.InterfaceIndex
        name   = $_.Name
        status = if ($_.Status -eq "Up") { "connected" } else { "disconnected" }
        ipv4   = $ip.IPAddress
        ipv6   = $ipv6.IPAddress
        dns    = $dns
        type   = if ($_.InterfaceDescription -match "Wi-Fi|Wireless") { "wifi" } else { "ethernet" }
        ssid   = if ($_.InterfaceDescription -match "Wi-Fi|Wireless") {
                    (netsh wlan show interfaces | Select-String '^\s*SSID\s*:\s*(.+)$').Matches.Groups[1].Value.Trim()
                 } else { $null }
        speedMbps = $speedMbps
    }
}

$adapters | ConvertTo-Json -Depth 3

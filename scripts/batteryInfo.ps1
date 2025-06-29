try {
    $battery = Get-CimInstance -ClassName Win32_Battery


    if (-not $battery) {
        Write-Output '{}'
        exit 0
    }

    $statusMap = @{
        1 = 'Discharging'
        2 = 'AC Power'
        3 = 'Fully Charged'
        4 = 'Low'
        5 = 'Critical'
        6 = 'Charging'
        7 = 'Charging and High'
        8 = 'Charging and Low'
        9 = 'Charging and Critical'
        10 = 'Undefined'
        11 = 'Partially Charged'
    }

    $chemistryMap = @{
        1 = 'Other'
        2 = 'Unknown'
        3 = 'Lead Acid'
        4 = 'Nickel Cadmium'
        5 = 'Nickel Metal Hydride'
        6 = 'Lithium-ion'
        7 = 'Zinc air'
        8 = 'Lithium Polymer'
    }

    $status = "Unknown"
if ($battery.BatteryStatus -ne $null) {
    $statusKey = [int]$battery.BatteryStatus
    if ($statusMap.ContainsKey($statusKey)) {
        $status = $statusMap[$statusKey]
    }
}

    $chemistry = "Unknown"
if ($battery.Chemistry -ne $null) {
    $chemistryKey = [int]$battery.Chemistry
    if ($chemistryMap.ContainsKey($chemistryKey)) {
        $chemistry = $chemistryMap[$chemistryKey]
    }
    else {
        $chemistry = "Unknown (Code: $($battery.Chemistry))"
    }
}


$estimatedRunTime = "Unknown"

if ($battery.PSObject.Properties.Match("EstimatedRunTime").Count -gt 0) {
    $runtimeRaw = $battery.EstimatedRunTime

    # Try to parse to int safely
    $runtimeParsed = 0
    $success = [int]::TryParse($runtimeRaw, [ref]$runtimeParsed)

    $invalidValues = @(0, 65535, 71582788)

    if ($success -and ($runtimeParsed -gt 0) -and (-not ($invalidValues -contains $runtimeParsed))) {
        $estimatedRunTime = $runtimeParsed
    }
}

    $output = @{
        status                = $status
        estimatedChargeRemaining = $battery.EstimatedChargeRemaining
        estimatedRunTime      = $estimatedRunTime # in minutes or "Unknown"
        name                  = $battery.Name
        deviceId              = $battery.DeviceID
        chemistry             = $chemistry
        designCapacity        = $battery.DesignCapacity
        fullChargeCapacity    = $battery.FullChargeCapacity
    }

    $output | ConvertTo-Json -Compress
}
catch {
    Write-Error "Error retrieving battery info: $_"
    exit 1
}

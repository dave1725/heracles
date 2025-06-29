try {
    # CPU Usage (averaged over 3 samples, 1s interval)
    $counter = Get-Counter '\Processor(_Total)\% Processor Time' -SampleInterval 1 -MaxSamples 3
    $average = ($counter.CounterSamples | ForEach-Object { $_.CookedValue } | Measure-Object -Average).Average
    $cpuUsage = [math]::Round($average, 2)

    if (-not $counter) {
        Write-Error "Failed to retrieve CPU LoadPercentage."
        exit 1
    }

    # real time cpu clock speed
    

    # Processor Info
    $cpuInfo = Get-CimInstance Win32_Processor | Select-Object -First 1
    $maxSpeed = $cpuInfo.MaxClockSpeed
    $currentFreqPercent = (Get-Counter '\Processor Information(_Total)\% of Maximum Frequency').CounterSamples[0].CookedValue
    $currentSpeed = [math]::Round($maxSpeed * ($currentFreqPercent / 100), 0)

    $output = @{
        cpuLoadPercentage     = $cpuUsage
        currentSpeedMHz       = $currentSpeed
        maxSpeedMHz           = $cpuInfo.MaxClockSpeed
        virtualizationEnabled = $cpuInfo.VirtualizationFirmwareEnabled
        threadCount           = $cpuInfo.ThreadCount
        logicalProcessorCount = $cpuInfo.NumberOfLogicalProcessors
        name                  = $cpuInfo.Name
    }

    $output | ConvertTo-Json -Compress
} catch {
    Write-Error "Error fetching CPU info: $_"
    exit 1
}

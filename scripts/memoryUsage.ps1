try {
    $memory = Get-CimInstance -ClassName Win32_OperatingSystem

    $totalMemory = [math]::round($memory.TotalVisibleMemorySize / 1MB, 2) # in MB
    $freeMemory = [math]::round($memory.FreePhysicalMemory / 1MB, 2)    # in MB
    $usedMemory = $totalMemory - $freeMemory                             # in MB
    $virtualMemory = [math]::round($memory.TotalVirtualMemorySize / 1MB, 2) # in MB
    $commitCharge = [math]::round($memory.CommittedBytes / 1MB, 2)      # in MB

    $memoryInfo = @{
        TotalMemoryMB = $totalMemory
        FreeMemoryMB  = $freeMemory
        UsedMemoryMB  = $usedMemory
        VirtualMemoryMB = $virtualMemory
        CommittedMemoryMB = $commitCharge
        MemoryUsagePercentage = [math]::round(($usedMemory / $totalMemory) * 100, 2)
    }

    $memoryInfo | ConvertTo-Json -Compress
}
catch {
    Write-Error "Error retrieving memory info: $_"
    exit 1
}

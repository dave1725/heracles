$cpu = Get-WmiObject Win32_Processor | Select-Object -ExpandProperty LoadPercentage
$mem = Get-WmiObject Win32_OperatingSystem
$ramUsed = [math]::Round(($mem.TotalVisibleMemorySize - $mem.FreePhysicalMemory) / 1024, 2)
$ramTotal = [math]::Round($mem.TotalVisibleMemorySize / 1024, 2)
$disk = Get-WmiObject Win32_LogicalDisk -Filter "DriveType=3" |
    Select-Object DeviceID, @{Name='FreeGB';Expression={[math]::Round($_.FreeSpace / 1GB, 2)}}

$result = @{
    cpu = $cpu
    ram = @{
        used = $ramUsed
        total = $ramTotal
    }
    disk = $disk
}

$result | ConvertTo-Json -Depth 3

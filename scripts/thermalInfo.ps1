try {
    $thermalData = Get-CimInstance -Namespace root\wmi -ClassName MSAcpi_ThermalZoneTemperature

    if (-not $thermalData) {
        Write-Output '{}'
        exit 0
    }

    $results = @()

    foreach ($item in $thermalData) {
        $temperatureC = ($item.CurrentTemperature / 10) - 273.15
        $results += [pscustomobject]@{
            InstanceName = $item.InstanceName
            TemperatureCelsius = [math]::Round($temperatureC, 1)
        }
    }

    $results | ConvertTo-Json -Compress
}
catch {
    Write-Error "Error retrieving thermal info: $_"
    exit 1
}

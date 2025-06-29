try {
    $disks = Get-CimInstance -Namespace root\wmi -ClassName MSStorageDriver_FailurePredictStatus
    $diskData = Get-CimInstance -Namespace root\wmi -ClassName MSStorageDriver_FailurePredictData
    $diskThreshold = Get-CimInstance -Namespace root\wmi -ClassName MSStorageDriver_FailurePredictThresholds

    $results = @()

    for ($i = 0; $i -lt $disks.Count; $i++) {
        $status = $disks[$i]
        $data = $diskData[$i]
        $threshold = $diskThreshold[$i]

        # Check if SMART predicts failure
        $predictFailure = $status.PredictFailure

        # Parse SMART attributes
        $attributes = @{}
        $rawBytes = $data.VendorSpecific

        # Each attribute block is 12 bytes; first 2 bytes unused, next bytes contain attr data
        for ($j = 2; $j -lt $rawBytes.Length; $j += 12) {
            $id = $rawBytes[$j]
            if ($id -eq 0) { break } # no more attributes

            $flags = $rawBytes[$j + 1]
            $currentValue = $rawBytes[$j + 3]
            $worstValue = $rawBytes[$j + 4]
            $rawValueBytes = $rawBytes[$j + 5..($j + 10)]
            $rawValue = 0
            for ($k = 0; $k -lt $rawValueBytes.Length; $k++) {
                $rawValue += $rawValueBytes[$k] * [math]::Pow(256, $k)
            }

            $attributes[$id] = @{
                Current = $currentValue
                Worst = $worstValue
                Raw = $rawValue
            }
        }

        # Extract temperature from attribute ID 194 or 190 if exists
        $temperature = $null
        if ($attributes.ContainsKey(194)) {
            $temperature = $attributes[194].Raw
        } elseif ($attributes.ContainsKey(190)) {
            $temperature = $attributes[190].Raw
        }

        $results += [pscustomobject]@{
            PredictFailure = $predictFailure
            TemperatureCelsius = $temperature
            Attributes = $attributes
        }
    }

    $results | ConvertTo-Json -Compress
}
catch {
    Write-Error "Error fetching SMART data: $_"
    exit 1
}

try {
    $schemeOutput = powercfg /getactivescheme

    if (-not $schemeOutput) {
        Write-Output '{ "error": "Could not retrieve active power scheme." }'
        exit 0
    }

    # Extract GUID from the full output line like: Power Scheme GUID: XXXXXXXX (Balanced)
    $guidMatch = $schemeOutput | Select-String -Pattern 'Power Scheme GUID:\s*([a-fA-F0-9\-]+)'
    if (-not $guidMatch) {
        Write-Output '{ "error": "Could not parse power scheme GUID." }'
        exit 0
    }

    $guid = $guidMatch.Matches[0].Groups[1].Value

    # GUID for: Processor performance boost mode
    $subgroup = "54533251-82be-4824-96c1-47b60b740d00" # Processor settings
    $setting  = "bc5038f7-23e0-4960-96da-33abaf5935ec" # Maximum processor state (plugged in)

    $valueOutput = powercfg /query $guid $subgroup $setting

    if (-not $valueOutput) {
        Write-Output '{ "error": "Failed to retrieve processor power setting." }'
        exit 0
    }

    $acLine = $valueOutput | Select-String -Pattern 'Current AC Power Setting Index:'
    $acValueHex = $acLine.Line -replace '.*Index:\s*0x', ''
    $acValue = [convert]::ToInt32($acValueHex, 16)

    $dcLine = $valueOutput | Select-String -Pattern 'Current DC Power Setting Index:'
    $dcValueHex = $dcLine.Line -replace '.*Index:\s*0x', ''
    $dcValue = [convert]::ToInt32($dcValueHex, 16)


    $result = @{
    maxProcessorStateAC = $acValue
    maxProcessorStateDC = $dcValue
}

    $result | ConvertTo-Json -Compress
}
catch {
    Write-Output '{ "error": "Exception occurred while retrieving power state." }'
    exit 1
}

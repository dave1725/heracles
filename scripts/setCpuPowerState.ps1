param (
  [int]$ac,
  [int]$dc
)

try {
    $schemeOutput = powercfg /getactivescheme
    if (-not $schemeOutput) {
        Write-Output 'Error: Could not retrieve active power scheme.'
        exit 1
    }

    $guidMatch = $schemeOutput | Select-String -Pattern 'Power Scheme GUID:\s*([a-fA-F0-9\-]+)'
    if (-not $guidMatch) {
        Write-Output 'Error: Could not parse power scheme GUID.'
        exit 1
    }

    $guid = $guidMatch.Matches[0].Groups[1].Value

    # Use full GUIDs instead of aliases
    $subgroup = "54533251-82be-4824-96c1-47b60b740d00"         # Processor settings
    $setting  = "bc5038f7-23e0-4960-96da-33abaf5935ec"         # Maximum processor state

    powercfg -setacvalueindex $guid $subgroup $setting $ac
    powercfg -setdcvalueindex $guid $subgroup $setting $dc

    powercfg -S $guid

    Write-Output "Set Max Processor State AC=$ac%, DC=$dc%"
}
catch {
    Write-Output "Error occurred while setting CPU power state: $_"
    exit 1
}

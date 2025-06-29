$startupItems = @()

function Get-Publisher($filePath) {
    try {
        $sig = Get-AuthenticodeSignature -FilePath $filePath
        if ($sig.SignerCertificate) {
            return $sig.SignerCertificate.Subject -replace '^.*CN=',''
        }
    } catch {}
    return "Unknown"
}

function Get-StartupImpact($filePath) {
    # Placeholder - Windows does not expose this easily
    return "Unknown"
}

# Registry
$registryPaths = @(
    @{ Path = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"; Source = "Registry (Current User)" },
    @{ Path = "HKLM:\Software\Microsoft\Windows\CurrentVersion\Run"; Source = "Registry (Local Machine)" }
)

foreach ($reg in $registryPaths) {
    if (Test-Path $reg.Path) {
        $entries = Get-ItemProperty -Path $reg.Path
        foreach ($prop in $entries.PSObject.Properties) {
            $command = $prop.Value
            $exeMatch = ($command -match '"?([A-Z]:\\[^"]+\.exe)"?') | Out-Null
            $exePath = if ($matches[1]) { $matches[1] } else { $command }

            $startupItems += [PSCustomObject]@{
                Name        = $prop.Name
                Path        = $command
                Publisher   = Get-Publisher $exePath
                Enabled     = $true
                Source      = $reg.Source
                Location    = $reg.Path
                Impact      = Get-StartupImpact $exePath
            }
        }
    }
}

# Startup Folders
$startupFolders = @(
    @{ Path = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"; Source = "Startup Folder (User)" },
    @{ Path = "$env:PROGRAMDATA\Microsoft\Windows\Start Menu\Programs\Startup"; Source = "Startup Folder (All Users)" }
)

foreach ($folder in $startupFolders) {
    if (Test-Path $folder.Path) {
        $files = Get-ChildItem -Path $folder.Path -File
        foreach ($file in $files) {
            $isDisabled = $file.Extension -eq ".disabled"
            $realPath = $file.FullName

            if ($isDisabled) {
                $realPath = $realPath -replace "\.disabled$", ""
            }

            $publisher = Get-Publisher $realPath

            $startupItems += [PSCustomObject]@{
                Name      = $file.BaseName
                Path      = $realPath
                Publisher = $publisher
                Enabled   = -not $isDisabled
                Source    = $folder.Source
                Location  = $folder.Path
                Impact    = "Unknown"
            }
        }
    }
}

$startupItems | ConvertTo-Json -Compress

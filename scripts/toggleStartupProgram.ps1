param (
    [string]$Name,
    [string]$Location,
    [string]$Path,
    [string]$Source,
    [string]$Enable
)



try {
    if ($Source -like "Registry*") {
        if ($Enable) {
            $backupPath = "$env:LOCALAPPDATA\StartupManager\registry_backup.json"
            if (Test-Path $backupPath) {
                $json = Get-Content $backupPath | ConvertFrom-Json
                $entry = $json | Where-Object { $_.Name -eq $Name -and $_.Location -eq $Location }
                if ($entry) {
                    Set-ItemProperty -Path $Location -Name $Name -Value $entry.Command
                    Write-Output (@{
                        success = $true
                        message = "Restored $Name to registry."
                    } | ConvertTo-Json -Compress)
                } else {
                    Write-Output (@{
                        success = $false
                        message = "No backup found for $Name."
                    } | ConvertTo-Json -Compress)
                }
            } else {
                Write-Output (@{
                    success = $false
                    message = "No backup file found."
                } | ConvertTo-Json -Compress)
            }
        } else {
            $val = (Get-ItemProperty -Path $Location -Name $Name).$Name
            $backupFile = "$env:LOCALAPPDATA\StartupManager\registry_backup.json"
            $backup = @()

            if (Test-Path $backupFile) {
                $backup = Get-Content $backupFile | ConvertFrom-Json
            }

            $backup += [PSCustomObject]@{
                Name     = $Name
                Location = $Location
                Command  = $val
            }

            $backup | ConvertTo-Json | Set-Content $backupFile

            Remove-ItemProperty -Path $Location -Name $Name -ErrorAction SilentlyContinue
            Write-Output (@{
                success = $true
                message = "Disabled $Name by removing registry key."
            } | ConvertTo-Json -Compress)
        }
    }
    elseif ($Source -like "Startup Folder*") {
        $original = $Path
        $disabled = "$Path.disabled"

        if ($Enable) {
            if (Test-Path $disabled) {
                Rename-Item -Path $disabled -NewName (Split-Path $Path -Leaf)
                Write-Output (@{
                    success = $true
                    message = "Enabled $Name by renaming shortcut."
                } | ConvertTo-Json -Compress)
            } else {
                Write-Output (@{
                    success = $true
                    message = "No .disabled file to enable."
                } | ConvertTo-Json -Compress)
            }
        } else {
            if (Test-Path $Path) {
                Rename-Item -Path $Path -NewName ((Split-Path $Path -Leaf) + ".disabled")
                Write-Output (@{
                    success = $true
                    message = "Disabled $Name by renaming shortcut."
                } | ConvertTo-Json -Compress)
            } else {
                Write-Output (@{
                    success = $false
                    message = "Startup item not found."
                } | ConvertTo-Json -Compress)
            }
        }
    } else {
        Write-Output (@{
            success = $false
            message = "Unknown source type: $Source"
        } | ConvertTo-Json -Compress)
    }
}
catch {
    Write-Output (@{
        success = $false
        error = "Error toggling startup item: $_"
    } | ConvertTo-Json -Compress)
    exit 1
}

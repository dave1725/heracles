$results = @{}

# Antivirus status
try {
    $avStatus = Get-MpComputerStatus
    $results.Antivirus = @{
        Enabled = $avStatus.AntispywareEnabled -and $avStatus.RealTimeProtectionEnabled
        Description = "Windows Defender Antivirus"
    }
} catch {
    $results.Antivirus = @{ Enabled = $false; Description = "Unable to determine antivirus status" }
}

# Firewall status
try {
    $profiles = Get-NetFirewallProfile
    $firewallEnabled = $profiles | Where-Object { $_.Enabled } | Measure-Object | Select-Object -ExpandProperty Count
    $results.Firewall = @{
        Enabled = $firewallEnabled -gt 0
        Description = "Windows Defender Firewall"
    }
} catch {
    $results.Firewall = @{ Enabled = $false; Description = "Unable to determine firewall status" }
}

# BitLocker status (C drive)
try {
    $bitlocker = Get-BitLockerVolume -MountPoint "C:" | Select-Object -ExpandProperty ProtectionStatus
    $results.BitLocker = @{
        Enabled = ($bitlocker -eq 1)
        Description = "Drive encryption enabled"
    }
} catch {
    $results.BitLocker = @{ Enabled = $false; Description = "Unable to determine BitLocker status" }
}

# TPM status
try {
    $tpm = Get-WmiObject -Namespace "Root\CIMV2\Security\MicrosoftTpm" -Class Win32_Tpm
    $results.TPM = @{
        Enabled = $tpm.IsEnabled().IsEnabled
        Description = "Trusted Platform Module"
    }
} catch {
    $results.TPM = @{ Enabled = $false; Description = "Unable to determine TPM status" }
}

# Secure Boot status
try {
    $secureBoot = Confirm-SecureBootUEFI -ErrorAction SilentlyContinue
    $results.SecureBoot = @{
        Enabled = $secureBoot
        Description = "UEFI Secure Boot"
    }
} catch {
    $results.SecureBoot = @{ Enabled = $false; Description = "Secure Boot not available or not supported" }
}

# UAC status
try {
    $uac = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name EnableLUA
    $results.UAC = @{
        Enabled = ($uac.EnableLUA -eq 1)
        Description = "User Account Control (UAC)"
    }
} catch {
    $results.UAC = @{ Enabled = $false; Description = "Unable to determine UAC status" }
}

# Remote Desktop status
try {
    $rdp = Get-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server" -Name fDenyTSConnections
    $results.RDP = @{
        Enabled = ($rdp.fDenyTSConnections -eq 0)
        Description = "Remote Desktop"
    }
} catch {
    $results.RDP = @{ Enabled = $false; Description = "Unable to determine RDP status" }
}

# SmartScreen status (App & browser control)
try {
    $smartscreen = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" -Name SmartScreenEnabled
    $results.SmartScreen = @{
        Enabled = ($smartscreen.SmartScreenEnabled -ne "Off")
        Description = "Windows SmartScreen"
    }
} catch {
    $results.SmartScreen = @{ Enabled = $false; Description = "Unable to determine SmartScreen status" }
}

# Output JSON
$results.GetEnumerator() | Sort-Object Name | ForEach-Object {
    $_.Value.label = $_.Name
}
$results.Values | ConvertTo-Json -Depth 4

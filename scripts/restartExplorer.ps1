Stop-Process -Name explorer -Force
Start-Process explorer.exe
Write-Output '{"success":true,"message":"Explorer restarted."}'

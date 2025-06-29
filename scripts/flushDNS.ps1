try {
    Clear-DnsClientCache
    Write-Output '{"success":true,"message":"DNS cache flushed."}'
} catch {
    Write-Output '{"success":false,"message":"Failed to flush DNS cache."}'
    exit 1
}

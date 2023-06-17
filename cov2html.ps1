deno fmt
deno lint
$myCovDir = (Join-Path $PSScriptRoot "coverage")
$lcovPath = (Join-Path $PSScriptRoot "coverage/coverage.lcov")
deno test --coverage=$myCovDir
deno coverage $myCovDir --lcov --output=$lcovPath
# Convert-LCovToHtml: https://github.com/CarsonSlovoka/powershell/blob/80666f146552519ea2d57e642ca1e055f087a4c2/src/coverage/lcov.psm1#L1-L80
Convert-LCovToHtml $lcovPath (Join-Path $myCovDir "html")

$from=$args[0]
$to=$args[1]
Get-ChildItem -Path "$from\*.jpg" -Recurse | Move-Item -Destination "$to\"
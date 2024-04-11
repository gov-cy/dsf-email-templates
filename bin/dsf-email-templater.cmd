@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "%~dp0\dsf-email-templater.js" %*
) ELSE (
  node  "%~dp0\dsf-email-templater.js" %*
)
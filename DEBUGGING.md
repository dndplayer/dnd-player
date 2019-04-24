# Debugging

The ideal, streamline, no-nonsense debugging experience for working on the DND Player
is to use VS Code and install the following extension:

<pre>
    Name: Debugger for Chrome
    Id: msjsdiag.debugger-for-chrome
    Description: Debug your JavaScript code in the Chrome browser, or any other target that supports the Chrome Debugger protocol.
    Version: 4.11.3
    Publisher: Microsoft
    VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
</pre>

Once the VS Code Chrome debugger extension is installed, debugging the site is incredibly easy.

Firstly ensure you have the .vscode/launch.json file, that should contain a config similar to this

``` json
{
    "type": "chrome",
    "request": "launch",
    "name": "Debug in Chrome",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceFolder}",
    "trace": true,
    "sourceMaps": true,
}
```

Now to debug just press F5 - a new Chrome window will open and you'll be able to debug, place breakpoints, step
through code all natively within VS Code!
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.showHelloWorldView', function () {
			vscode.window.showInformationMessage('Hello World for HelloWorld!');
			HelloWorldView.createOrShow(context.extensionuri);
		})
	);
}

class HelloWorldView{
	constructor(extensionUri){
		this._extensionUri = extensionUri;
	}

	static createOrShow(){
		if(!HelloWorldView.currentPanel){
			const panel = vscode.window.createWebviewPanel(
				'helloWorldView',
				'Hello World View',
				vscode.ViewColumn.One,{
					enableScripts: true
				}	
			);
			panel.webview.html = `
                <!DOCTYPE html>
                <html>
                <body>
                    <h1>HELLO WORLD</h1>
                </body>
                </html>
            `;

			panel.onDidDispose(() => {
				HelloWorldView.currentPanel = undefined;
			})
			HelloWorldView.currentPanel = panel;
		}else{
			HelloWorldView.currentPanel.reveal();
		}
	}

}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

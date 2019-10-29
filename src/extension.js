// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { updateTextEditor } = require('./update')
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hemingway" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Worlds!$');
	});
	const diagnostics = vscode.languages.createDiagnosticCollection('Hemingway');
    
	context.subscriptions.push(disposable);
	
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(() => { 
			console.log('onDidChangeConfiguration');
			// updateTextEditor({ document: null})
			// Decorator.init(); 
			// Decorator.decorate(undefined, true);
		}),
		vscode.workspace.onDidChangeTextDocument(({ document, contentChanges }) => {
			
			updateTextEditor({ document, contentChanges, diagnostics });

			
		}),
		// vscode.window.onDidOpenTextDocument((document) => {
		// 	console.log('onDidOpenTextDocument');
		// 	updateTextEditor({ document });

		// 	// Decorator.decorate(undefined, true)
		// }),
		vscode.window.onDidChangeActiveTextEditor((document) => {
			console.log('onDidChangeActiveTextEditor');
			updateTextEditor({ document: null, contentChanges:null, diagnostics });
			
		})
	);
	updateTextEditor({ document: null, contentChanges:null, diagnostics })

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

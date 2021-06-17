/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//
// ############################################################################
//
//						! USED FOR RUNNING VSCODE OUT OF SOURCES FOR WEB !
//										! DO NOT REMOVE !
//
// ############################################################################
//

import * as vscode from 'vscode';
import { MemFS } from './memfs';

declare const navigator: unknown;

export function activate(context: vscode.ExtensionContext) {
	if (typeof navigator === 'object') {	// do not run under node.js
		const memFs = enableFs(context);
		memFs.seed();
		enableProblems(context);

		vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`memfs:/sample-folder/large.ts`));
	}
}

function enableFs(context: vscode.ExtensionContext): MemFS {
	const memFs = new MemFS();
	context.subscriptions.push(memFs);

	return memFs;
}

function enableProblems(context: vscode.ExtensionContext): void {
	const collection = vscode.languages.createDiagnosticCollection('test');
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, collection);
	}
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			updateDiagnostics(editor.document, collection);
		}
	}));
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
	if (document && document.fileName === '/sample-folder/large.ts') {
		collection.set(document.uri, [{
			code: '',
			message: 'cannot assign twice to immutable variable `storeHouses`',
			range: new vscode.Range(new vscode.Position(4, 12), new vscode.Position(4, 32)),
			severity: vscode.DiagnosticSeverity.Error,
			source: '',
			relatedInformation: [
				new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`')
			]
		}, {
			code: '',
			message: 'function does not follow naming conventions',
			range: new vscode.Range(new vscode.Position(7, 10), new vscode.Position(7, 23)),
			severity: vscode.DiagnosticSeverity.Warning,
			source: ''
		}]);
	} else {
		collection.clear();
	}
}

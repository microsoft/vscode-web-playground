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
		enableTasks();

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

function enableTasks(): void {

	interface CustomBuildTaskDefinition extends vscode.TaskDefinition {
		/**
		 * The build flavor. Should be either '32' or '64'.
		 */
		flavor: string;

		/**
		 * Additional build flags
		 */
		flags?: string[];
	}

	class CustomBuildTaskProvider implements vscode.TaskProvider {
		static CustomBuildScriptType: string = 'custombuildscript';
		private tasks: vscode.Task[] | undefined;

		// We use a CustomExecution task when state needs to be shared accross runs of the task or when
		// the task requires use of some VS Code API to run.
		// If you don't need to share state between runs and if you don't need to execute VS Code API in your task,
		// then a simple ShellExecution or ProcessExecution should be enough.
		// Since our build has this shared state, the CustomExecution is used below.
		private sharedState: string | undefined;

		constructor(private workspaceRoot: string) { }

		async provideTasks(): Promise<vscode.Task[]> {
			return this.getTasks();
		}

		resolveTask(_task: vscode.Task): vscode.Task | undefined {
			const flavor: string = _task.definition.flavor;
			if (flavor) {
				const definition: CustomBuildTaskDefinition = <any>_task.definition;
				return this.getTask(definition.flavor, definition.flags ? definition.flags : [], definition);
			}
			return undefined;
		}

		private getTasks(): vscode.Task[] {
			if (this.tasks !== undefined) {
				return this.tasks;
			}
			// In our fictional build, we have two build flavors
			const flavors: string[] = ['32', '64'];
			// Each flavor can have some options.
			const flags: string[][] = [['watch', 'incremental'], ['incremental'], []];

			this.tasks = [];
			flavors.forEach(flavor => {
				flags.forEach(flagGroup => {
					this.tasks!.push(this.getTask(flavor, flagGroup));
				});
			});
			return this.tasks;
		}

		private getTask(flavor: string, flags: string[], definition?: CustomBuildTaskDefinition): vscode.Task {
			if (definition === undefined) {
				definition = {
					type: CustomBuildTaskProvider.CustomBuildScriptType,
					flavor,
					flags
				};
			}
			return new vscode.Task(definition, vscode.TaskScope.Workspace, `${flavor} ${flags.join(' ')}`,
				CustomBuildTaskProvider.CustomBuildScriptType, new vscode.CustomExecution(async (): Promise<vscode.Pseudoterminal> => {
					// When the task is executed, this callback will run. Here, we setup for running the task.
					return new CustomBuildTaskTerminal(this.workspaceRoot, flavor, flags, () => this.sharedState, (state: string) => this.sharedState = state);
				}));
		}
	}

	class CustomBuildTaskTerminal implements vscode.Pseudoterminal {
		private writeEmitter = new vscode.EventEmitter<string>();
		onDidWrite: vscode.Event<string> = this.writeEmitter.event;
		private closeEmitter = new vscode.EventEmitter<void>();
		onDidClose?: vscode.Event<void> = this.closeEmitter.event;

		private fileWatcher: vscode.FileSystemWatcher | undefined;

		constructor(private workspaceRoot: string, _flavor: string, private flags: string[], private getSharedState: () => string | undefined, private setSharedState: (state: string) => void) {
		}

		open(_initialDimensions: vscode.TerminalDimensions | undefined): void {
			// At this point we can start using the terminal.
			if (this.flags.indexOf('watch') > -1) {
				let pattern = this.workspaceRoot + '/customBuildFile';
				this.fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);
				this.fileWatcher.onDidChange(() => this.doBuild());
				this.fileWatcher.onDidCreate(() => this.doBuild());
				this.fileWatcher.onDidDelete(() => this.doBuild());
			}
			this.doBuild();
		}

		close(): void {
			// The terminal has been closed. Shutdown the build.
			if (this.fileWatcher) {
				this.fileWatcher.dispose();
			}
		}

		private async doBuild(): Promise<void> {
			return new Promise<void>((resolve) => {
				this.writeEmitter.fire('Starting build...\r\n');
				let isIncremental = this.flags.indexOf('incremental') > -1;
				if (isIncremental) {
					if (this.getSharedState()) {
						this.writeEmitter.fire('Using last build results: ' + this.getSharedState() + '\r\n');
					} else {
						isIncremental = false;
						this.writeEmitter.fire('No result from last build. Doing full build.\r\n');
					}
				}

				// Since we don't actually build anything in this example set a timeout instead.
				setTimeout(() => {
					const date = new Date();
					this.setSharedState(date.toTimeString() + ' ' + date.toDateString());
					this.writeEmitter.fire('Build complete.\r\n\r\n');
					if (this.flags.indexOf('watch') === -1) {
						this.closeEmitter.fire();
						resolve();
					}
				}, isIncremental ? 1000 : 4000);
			});
		}
	}

	vscode.tasks.registerTaskProvider(CustomBuildTaskProvider.CustomBuildScriptType, new CustomBuildTaskProvider(vscode.workspace.rootPath!));
}

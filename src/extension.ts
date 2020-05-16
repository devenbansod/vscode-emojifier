import * as vscode from 'vscode';
import * as emojer from './emojer-mod';

const convertSelectionToEmoji = async () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return; // No open text editor
	}

	const selection = editor.selection;
	const text = editor.document.getText(selection);
	if (!text || text.length <= 0) {
		return; // no text selected
	}

	const newText = emojer.parse(text);
	await editor.edit((builder) => {
		builder.replace(selection, newText);
	});
};

const convertEmojisAcrossDocument = async () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return; // No open text editor
	}

	const document = editor.document;
	const fullText = document.getText();
	if (!fullText || fullText.length <= 0) {
		return; // no text found
	}

	const newText = emojer.parse(fullText);
	const all = new vscode.Range(
		document.positionAt(0),
		document.positionAt(document.getText().length)
	);
	await editor.edit(editBuilder =>
		editBuilder.replace(all, newText)
	);
};

const addPatternToIgnore = () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return; // No open text editor
	}

	const selection = editor.selection;
	const text = editor.document.getText(selection);
	if (!text || text.length <= 0) {
		return; // no text selected
	}

	emojer.disableEmojis([text]);
};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'emojifier.convertSelectionToEmoji', convertSelectionToEmoji
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'emojifier.convertEmojisAcrossDocument', convertEmojisAcrossDocument
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'emojifier.addPatternToIgnore', addPatternToIgnore
		)
	);
}

export function deactivate() { }

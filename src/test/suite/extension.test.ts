import * as assert from 'assert';
import * as vscode from 'vscode';
import { before, after } from 'mocha';
import * as path from 'path';
import * as fs from 'fs';

const extension = vscode.extensions.getExtension(
	'devenbansod.emojifier'
);

export async function activateExtension() {
	await extension.activate();
}

export async function createTestFile(
	fileName: string,
	content: string = ''
): Promise<void> {
	const filePath = path.join(__dirname, fileName);
	fs.writeFileSync(filePath, content);
	const uri = vscode.Uri.file(filePath);
	await vscode.window.showTextDocument(uri);
}

export function getText(): string {
	return vscode.window.activeTextEditor.document.getText();
}

suite('emojifier Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	before(async () => {
		await activateExtension();
	});

	test('Run command on selection', async () => {
		const emojiAsText = ':-) :D';
		const normalText = 'Hello world!';
		const emojis = '😃 😁';
		const fullText = `${normalText} ${emojiAsText}`;
		const fullTextWithEmojis = `${normalText} ${emojis}`;
		const start = fullText.indexOf(emojiAsText), end = start + emojiAsText.length;

		await createTestFile('1.md', fullText);
		const editor = vscode.window.activeTextEditor;
		editor.selection = new vscode.Selection(
			editor.document.positionAt(start),
			editor.document.positionAt(end)
		);

		await vscode.commands.executeCommand('emojifier.convertSelectionToEmoji');
		assert.equal(await getText(), fullTextWithEmojis);
	});

	test('Run command on whole file', async () => {
		const fullText = 'Hello :-) World! :D';
		const fullTextWithEmojis = 'Hello 😃 World! 😁';

		await createTestFile('2.md', fullText);
		await vscode.commands.executeCommand('emojifier.convertEmojisAcrossDocument');

		assert.equal(await getText(), fullTextWithEmojis);
	});

	after(() => {
		vscode.window.showInformationMessage('Finished all tests.');
	});
});

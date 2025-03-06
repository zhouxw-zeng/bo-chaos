// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { dayjs } from "@mono/utils";
import { tuixiu } from "@mono/const";

function completeToTargetDigits(number: number | string, digits = 2) {
  return String(number).padStart(digits, "0");
}

function getCountDown(tuixiu: dayjs.Dayjs): string {
  const now: dayjs.Dayjs = dayjs();
  const diff = tuixiu.diff(now);
  const duration = dayjs.duration(diff);

  // 修改计算逻辑
  const totalHours = Math.floor(duration.asHours());
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return `${days} 天 ${completeToTargetDigits(hours)}:${completeToTargetDigits(minutes)}:${completeToTargetDigits(seconds)}`;
}

const { boTuiXiuDay } = tuixiu;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "bo-retire" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "bo-retire.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const botui = getCountDown(boTuiXiuDay);
      vscode.window.showInformationMessage(
        "Hello World from bo-retire! left:" + botui,
      );
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

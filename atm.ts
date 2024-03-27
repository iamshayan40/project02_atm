#! /usr/bin/env node
import inquirer from "inquirer";

async function run() {
    let myBalance = 50000;
    let myPin = 1435;
    let fastCashOptions = ["10000", "20000", "30000", "40000", "50000"];

    let pinResponse = await inquirer.prompt([
        {
            name: "name",
            type: "number",
            message: "Please enter your pin code:",
        }
    ]);
    console.log(pinResponse)

    if (pinResponse.name === myPin) {
        console.log("Your pin code is correct!")

        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: "Please select the operation you want to perform",
                choices: ["Withdraw", "Check Balance", "Fast Cash"],
            }
        ]);

        if (operationAns.operation === "Withdraw") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Please enter the amount you want to withdraw: ",
                }
            ]);

            if (amountAns.amount < myBalance) {
                myBalance -= amountAns.amount
                console.log(`Now your balance is ${myBalance}`)
            } else {
                console.log("Insufficient Balance!")
            }
        }
        else if (operationAns.operation === "Check Balance") {
            console.log(`Your current balance is ${myBalance}`)
        } else if (operationAns.operation === "Fast Cash") {

            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    choices: fastCashOptions.map(option => ({ name: option })),
                    message: "How much Fast Cash do you want? ",
                }
            ]);

            if (fastCashOptions.includes(fastCashAns.fastCash)) {
                console.log(`your fast cash amount is ${fastCashAns.fastCash}`);
                myBalance -= parseInt(fastCashAns.fastCash);
                console.log(`your remaining balance is ${myBalance}`);
            } else {
                console.log("Invalid Fast Cash amount selected");
            }
        }
    } else {
        console.log("Your pin code is incorrect!")
    }
}

run();



Task: Build an online vending machine that would simulate a real life one.

![Image description](https://raw.githubusercontent.com/PandasProperty/vending-machine/master/vending-machine.png)

Solution:
See vending-machine-automate.png for diagram regarding the vending machine state.
The functionality is based on it.

When starting the inventory of the machine is emptied (0 coins). During different operations the quantity of coins in the machine increases and then it can give you change (It can not give you any change if there are no available coins in the machine).

The maching is IDLE until you start to input. Then it goes into READING mode.

Once inputed the number of the product, when pressing enter, after the validation passes (the product number exists and there is a quantity of it), the machine moves in the PAYMENT mode. Where it waits for money. If the user's balance has some money (from past operations - someone couldn't get their change back because there weren't coins available) the ammount of money is commpered to see if it is enough. When the payment is accepted, the quantity of the product decreses, and the machine moved is state DELIVER.

In the state DELIVER the user can pick-up it's item and it will go in IDLE mode. Also if you start pressing the keypads it will move directly in the READING mode.

The structure of the products is generated randomlt and the sizes of the vendor can be configured.

The algorithm for change tried to find the maximum change it can give you with the amount of coints that the vending machine has.

Demo: See vending-machine.mov

Requirements: node v10.13.0 (sice the latest react and react-dom need it)

To start: npm start
Task: Create a very basic calculator application. Four basic operations is enough. What is nice to see is 1) separated ui and api; 2) some best coding and collaborative practices implemented; 3) tests.

Solution:

I have used in this little app react hooks, a bem approach for the style, and jst for testing my code. 
Anything inputed by the user is an operand (1, 2, 3 and so on) or an operator (+, /, -, *).
When inputing 1 + 2 * 3, until you press = it won't be evaluated (kind of what a Mac default calculator behaves). 

Demo: See basic-calculator.mov

Requirements: node v10.13.0 (sice the latest react and react-dom need it)

To start: npm start
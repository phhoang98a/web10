#include <bits/stdc++.h>
#include <stdlib.h>
#include <iostream>
#include <stack>

const int maxN=100000;

using namespace std;

stack <float> stackOperands;
stack <char> stackOperators;

int Precedence(char x)
{
	if (x == '(')
		return 0;
	if (x == '+' || x == '-')
		return 1 ;
	if (x == '*' || x == '/')
		return 2;
}

void turn_infix_into_postfix(){
    string infixExpression;
    char token;

    cin.ignore();
    cout<<"YOUR INFIX EXPRESSION:"<<endl;
    getline(std::cin,infixExpression);
    cout<<"RESULT:"<<endl;

    int n=infixExpression.length();
    for (int i=0; i<=n-1; i++)
    {
        token=infixExpression[i];
        if (isalnum(token)){
            cout<<token<<' ';
        }else{
            switch (token){
                case '(':
                    {
                        stackOperators.push(token);
                        break;
                    }
                case ')':
                    {
                        while (stackOperators.top()!='('){
                            cout<<stackOperators.top()<<' ';
                            stackOperators.pop();
                        }
                        stackOperators.pop();
                        break;
                    }
                default:
                    {
                        if (token==' ') break;
                        while ((!stackOperators.empty())&&(stackOperators.top()!='(')&&(Precedence(token)<=Precedence(stackOperators.top()))){
                            cout<<stackOperators.top()<<' ';
                            stackOperators.pop();
                        }
                        stackOperators.push(token);
                    }
            }
        }
    }
    while (!stackOperators.empty()){
        cout<<stackOperators.top()<<' ';
        stackOperators.pop();
    }
    cout<<endl;
}

void turn_postfix_into_infix(){
    string postfixExpression,expression1,expression2,x;
    char token;
    stack <string> stackExpression;

    cin.ignore();
    cout<<"YOUR POSTFIX EXPRESSION:"<<endl;
    getline(std::cin,postfixExpression);
    cout<<"RESULT:"<<endl;

    int n=postfixExpression.length();

    for (int i=0; i<=n-1; i++){
        token=postfixExpression[i];
        if (isalnum(token)){
            x="";
            x=x+token;
            stackExpression.push(x);
        }else{
            if (token==' ') continue;
            if (stackExpression.size()<2){
                cout<<"INPUT NOT SUFFICIENT VALUES IN THE EXPRESSION"<<endl;
                return;
            }
            expression2=stackExpression.top();
            stackExpression.pop();
            expression1=stackExpression.top();
            stackExpression.pop();
            if ((postfixExpression[i]=='*')||(postfixExpression[i]=='/')||(postfixExpression[i]=='^')){
                if (expression1.length()>1) expression1='('+expression1+')';
                if (expression2.length()>1) expression2='('+expression2+')';
            }
            stackExpression.push(expression1+postfixExpression[i]+expression2);
        }
    }

    if (stackExpression.size()==1){
        cout<<stackExpression.top()<<endl;
        stackExpression.pop();
    }else{
        cout<<"INPUT NOT SUFFICIENT VALUES IN THE EXPRESSION"<<endl;
    }
}

float cal(float x, float y, char operators){
    switch (operators){
        case '+':
            return (x+y);
        case '-':
			return (x-y);
		case '/':
			return (x/y);
		case '*':
			return (x*y);
    }
}

void process(){
    float x,y;
    char operators;

    y=stackOperands.top();
    stackOperands.pop();

    x=stackOperands.top();
    stackOperands.pop();

    operators=stackOperators.top();
    stackOperators.pop();

    stackOperands.push(cal(x,y,operators));
}

string fix_expression(string S){
    int x;
    while (S.find("--")!=-1){
        x=S.find("--");
        S.replace(x,2,"+");
    }

    while (S.find("++")!=-1){
        x=S.find("++");
        S.replace(x,2,"+");
    }

    while (S.find("-+")!=-1){
        x=S.find("-+");
        S.replace(x,2,"-");
    }

    while (S.find("+-")!=-1){
        x=S.find("+-");
        S.replace(x,2,"-");
    }
    return S;
}

void calculate_infix(){
    char token;
    string numbers,infixExpression;
    int n;

    cin.ignore();
    cout<<"YOUR INFIX EXPRESSION:"<<endl;
    getline(std::cin,infixExpression);
    cout<<"RESULT:"<<endl;

    infixExpression=fix_expression(infixExpression);

    n=infixExpression.length();
    numbers="";

    for (int i=0; i<=n-1; i++){
        token=infixExpression[i];
        if (isalnum(token)||(token=='.')){
            if ((int(token)<48)||(int(token)>57)){
                cout<<"Wrong infix expression"<<endl;
                return;
            }
            numbers=numbers+infixExpression[i];
            if (i==n-1) stackOperands.push(atof(numbers.c_str()));
        }else{
            if ((token=='-')||(token=='+')){
                if (i==0){
                    stackOperands.push(0);
                }else{
                    if ((infixExpression[i-1]=='+')||(infixExpression[i-1]=='-')||(infixExpression[i-1]=='*')||(infixExpression[i-1]=='/')||(infixExpression[i-1]=='(')){
                        numbers=numbers+token;
                        continue;
                    }
                }
            };

            if (numbers!=""){
                stackOperands.push(atof(numbers.c_str()));
                numbers="";
            }
            switch (token){
                case '(':
                    {
                        stackOperators.push(token);
                        break;
                    }
                case ')':
                    {
                        while (stackOperators.top()!='('){
                            if ((stackOperands.size()<2)|| (stackOperators.size()<1)){
                                cout<<"Wrong infix expression"<<endl;
                                return;
                            }
                            process();
                        }
                        stackOperators.pop();
                        break;
                    }
                default:
                    {
                        if (token==' ') break;
                        while ((!stackOperators.empty())&&(stackOperators.top()!='(')&&(Precedence(token)<=Precedence(stackOperators.top()))){
                            if ((stackOperands.size()<2)|| (stackOperators.size()<1)){
                                cout<<"Wrong infix expression"<<endl;
                                return;
                            }
                            process();
                        }
                        stackOperators.push(token);
                    }
            }
        }
    }

     while (!stackOperators.empty()){
        if ((stackOperands.size()<2)|| (stackOperators.size()<1)){
            cout<<"Wrong infix expression"<<endl;
            return;
        }
        process();
     }
    if (stackOperands.size()!=1){
        cout<<"Wrong infix expression"<<endl;
        return;
    }
    int oo= stackOperands.top();
    if (oo==-2147483648){
        cout<<"Wrong infix expression"<<endl;
    } else{
        cout<<stackOperands.top()<<endl;
    }
    stackOperands.pop();
}

int main()
{
    bool stop=false;
    int number;
    do
    {
        cout<<"1: TURN INFIX EXPRESSION INTO POSTFIX EXPRESSION"<<endl;
        cout<<"2: TURN POSTFIX EXPRESSION INTO INFIX EXPRESSION"<<endl;
        cout<<"3: CALCULATE THE VALUE OF THE INFIX EXPRESSION"<<endl;
        cout<<"4: END GAME"<<endl;
        cout<<"YOUR NUMBER: ";
        cin>>number;
        cout<<endl;
        switch (number){
            case 1:
                {
                    turn_infix_into_postfix();
                    break;
                }
            case 2:
                {
                    turn_postfix_into_infix();
                    break;
                }
            case 3:
                {
                    calculate_infix();
                    break;
                }
            case 4:
                {
                    cout<<"GOODBYE!!";
                    stop=true;
                }

        }


    }
    while (stop==false);
}


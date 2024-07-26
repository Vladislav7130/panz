
import React, { useState } from 'react';
import { evaluateExpression } from './mathParser.ts';

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const handleButtonClick = (value: string) => {
        setInput(prev => prev + value);
    };

    const handleCalculate = () => {
        const result = evaluateExpression(input);
        setResult(result !== null ? result.toString() : 'Error');
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    return (
        <div className="calculator">
            <input type="text" value={input} readOnly />
            <div className="buttons">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '(', ')'].map(button => (
                    <button key={button} onClick={() => handleButtonClick(button)}>
                        {button}
                    </button>
                ))}
                <button onClick={handleCalculate}>=</button>
                <button onClick={handleClear}>C</button>
            </div>
            <div className="result">Result: {result}</div>
        </div>
    );
};

export default Calculator;
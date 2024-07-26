
export function evaluateExpression(expression: string): number | null {
    try {
        return eval(expression); 
    } catch (error) {
        console.error("Error evaluating expression:", error);
        return null;
    }
}
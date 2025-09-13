import re
import decimal
import math
from decimal import Decimal, InvalidOperation
import cmath

# Set decimal context to handle larger numbers
decimal.getcontext().prec = 1000  # Set precision to 1000 digits
decimal.getcontext().Emax = 1000000  # Set maximum exponent to 1,000,000
decimal.getcontext().Emin = -1000000  # Set minimum exponent to -1,000,000

# Global variable for step-by-step evaluation steps
sbse = []

class BigNumber:
    def __init__(self, value=None, chunks=None, decimal_pos=None):
        if value is not None:
            if value == 'inf':
                self.chunks = ['inf']
                self.decimal_pos = None
                return
                
            # Remove any existing scientific notation
            if 'E' in value:
                value = self._from_scientific(value)
            
            # Handle decimal point
            if '.' in value:
                integer_part, fractional_part = value.split('.')
                self.decimal_pos = len(integer_part)
                digits = integer_part + fractional_part
            else:
                self.decimal_pos = len(value)
                digits = value
                
            # Remove leading zeros (but keep at least one zero if number is zero)
            digits = digits.lstrip('0')
            if not digits:
                digits = '0'
                self.decimal_pos = 1
            else:
                # Adjust decimal position after stripping zeros
                self.decimal_pos = max(1, self.decimal_pos - (len(value) - len(digits)))
                
            # Break into chunks of 50 digits
            self.chunks = [digits[i:i+50] for i in range(0, len(digits), 50)]
        else:
            self.chunks = chunks
            self.decimal_pos = decimal_pos
    
    def _from_scientific(self, sci_str):
        """Convert scientific notation to decimal string"""
        if 'E' not in sci_str:
            return sci_str
            
        num, exp = sci_str.split('E')
        exp = int(exp)
        
        if '.' in num:
            integer, fractional = num.split('.')
            num = integer + fractional
            exp -= len(fractional)
        
        if exp > 0:
            num += '0' * exp
        elif exp < 0:
            if len(num) > -exp:
                num = num[:-exp] + '.' + num[-exp:]
            else:
                num = '0.' + '0' * (-exp - len(num)) + num
        return num
    
    def to_string(self):
        """Convert back to number string with decimal point"""
        if 'inf' in self.chunks:
            return 'inf'
            
        digits = ''.join(self.chunks)
        if self.decimal_pos is None:
            return digits
            
        if self.decimal_pos == len(digits):
            return digits
        elif self.decimal_pos > len(digits):
            return digits + '0' * (self.decimal_pos - len(digits))
        else:
            return digits[:self.decimal_pos] + '.' + digits[self.decimal_pos:]
    
    def __str__(self):
        return self.to_string()

class ExpressionEvaluator:
    def __init__(self):
        self.operators = {
            '^': (4, lambda a, b: self._power(a, b)),
            '/': (3, lambda a, b: self._divide(a, b)),
            '*': (3, lambda a, b: self._multiply(a, b)),
            '+': (2, lambda a, b: self._add(a, b)),
            '-': (2, lambda a, b: self._subtract(a, b))
        }
        
        # Mathematical functions
        self.functions = {
            'sin': lambda x: str(Decimal(str(math.sin(float(x))))),
            'cos': lambda x: str(Decimal(str(math.cos(float(x))))),
            'tan': lambda x: str(Decimal(str(math.tan(float(x))))),
            'sqrt': lambda x: str(Decimal(str(math.sqrt(float(x))))),
            'log': lambda x: str(Decimal(str(math.log(float(x))))),
            'log10': lambda x: str(Decimal(str(math.log10(float(x))))),
            'exp': lambda x: str(Decimal(str(math.exp(float(x))))),
            'abs': lambda x: str(Decimal(str(abs(float(x))))),
            'floor': lambda x: str(Decimal(str(math.floor(float(x))))),
            'ceil': lambda x: str(Decimal(str(math.ceil(float(x))))),
            'round': lambda x: str(Decimal(str(round(float(x))))),
        }
        
        # Constants
        self.constants = {
            'pi': str(Decimal(str(math.pi))),
            'e': str(Decimal(str(math.e))),
        }
        
        # Variables (can be set by user)
        self.variables = {}
        
        # Step-by-step evaluation steps
        self.steps = []
    
    def set_variable(self, name, value):
        """Set a variable value"""
        try:
            # Validate that the value is a valid number
            Decimal(value)
            self.variables[name] = value
            return f"Variable '{name}' set to {value}"
        except (InvalidOperation, ValueError):
            return f"Error: Invalid value for variable '{name}'"
    
    def get_variable(self, name):
        """Get a variable value"""
        return self.variables.get(name, None)
    
    def evaluate(self, expression, show_steps=False):
        """Main evaluation method with comprehensive error handling"""
        global sbse
        
        try:
            # Reset steps
            self.steps = []
            
            # Validate expression for invalid characters
            self._validate_expression(expression)
            
            # Preprocess expression
            expr = self._preprocess(expression)
            
            # Check for mismatched parentheses
            if expr.count('(') != expr.count(')'):
                raise ValueError("Mismatched parentheses")
            
            # Evaluate using BODMAS
            result = self._evaluate_expression(expr, show_steps)
            
            # Convert to BigNumber and return as string
            if result == 'inf':
                result_str = 'inf'
            else:
                result_str = str(BigNumber(result))
            
            # Set global sbse variable
            sbse = self.steps.copy()
            
            # Return result with steps if requested
            if show_steps:
                return {"result": result_str, "steps": self.steps}
            return result_str
            
        except ZeroDivisionError:
            error_msg = "Error: Division by zero"
            sbse = []
            return error_msg
        except ValueError as ve:
            error_msg = f"Error: {str(ve)}"
            sbse = []
            return error_msg
        except (InvalidOperation, OverflowError):
            error_msg = "Error: Number too large or invalid operation"
            sbse = []
            return error_msg
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            sbse = []
            return error_msg
    
    def _validate_expression(self, expr):
        """Validate expression for invalid characters"""
        # Remove spaces and valid characters to check for invalid ones
        valid_chars = set("0123456789.+-*/^()eE×· ")
        expr_no_spaces = expr.replace(' ', '')
        
        for char in expr_no_spaces:
            if char not in valid_chars and not char.isalpha():
                raise ValueError(f"Invalid character '{char}' in expression")
        
        # Check for consecutive operators that don't make sense
        invalid_patterns = [
            r'[+\-*/^]{2,}',  # Multiple operators in a row
            r'[+\-*/^]\)',     # Operator followed by closing parenthesis
            r'\([+\-*/^]',     # Opening parenthesis followed by operator
            r'[+\-*/^]$',      # Expression ends with operator
            r'^[+\-*/^]',      # Expression starts with operator (except for leading minus)
        ]
        
        for pattern in invalid_patterns:
            if re.search(pattern, expr_no_spaces) and not (expr_no_spaces.startswith('-') and pattern == r'^[+\-*/^]'):
                raise ValueError("Invalid operator sequence")
    
    def _preprocess(self, expr):
        """Handle implicit multiplication, scientific notation, functions, and variables"""
        # Remove spaces
        expr = expr.replace(' ', '')
        
        # Replace multiplication symbols
        expr = expr.replace('×', '*')
        expr = expr.replace('·', '*')
        
        # Process functions and variables
        expr = self._process_functions(expr)
        expr = self._process_variables(expr)
        expr = self._process_constants(expr)
        
        # Handle scientific notation followed by parentheses or variables
        expr = re.sub(r'(\d+\.?\d*[eE][+-]?\d+)(\()', r'\1*\2', expr)
        expr = re.sub(r'(\d+\.?\d*[eE][+-]?\d+)([a-zA-Z])', r'\1*\2', expr)
        
        # Handle implicit multiplication
        expr = re.sub(r'(\))(\()', r'\1*\2', expr)    # )(
        expr = re.sub(r'(\d)(\()', r'\1*\2', expr)    # digit(
        expr = re.sub(r'(\))(\d)', r'\1*\2', expr)    # )digit
        expr = re.sub(r'(\))([a-zA-Z])', r'\1*\2', expr)  # )variable
        expr = re.sub(r'([a-zA-Z])(\()', r'\1*\2', expr)  # variable(
        expr = re.sub(r'([a-zA-Z])(\d)', r'\1*\2', expr)  # variable digit
        
        return expr
    
    def _process_functions(self, expr):
        """Process mathematical functions"""
        for func_name in self.functions:
            pattern = rf'{func_name}\(([^)]+)\)'
            while re.search(pattern, expr):
                match = re.search(pattern, expr)
                arg = match.group(1)
                try:
                    # Evaluate the argument first
                    arg_value = self._evaluate_expression(arg)
                    # Apply the function
                    result = self.functions[func_name](arg_value)
                    # Replace the function call with the result
                    expr = expr.replace(match.group(0), result)
                except Exception:
                    raise ValueError(f"Error in function {func_name}")
        return expr
    
    def _process_variables(self, expr):
        """Replace variables with their values"""
        for var_name, var_value in self.variables.items():
            # Use word boundaries to avoid partial matches
            pattern = rf'\b{var_name}\b'
            expr = re.sub(pattern, var_value, expr)
        return expr
    
    def _process_constants(self, expr):
        """Replace constants with their values"""
        for const_name, const_value in self.constants.items():
            # Use word boundaries to avoid partial matches
            pattern = rf'\b{const_name}\b'
            expr = re.sub(pattern, const_value, expr)
        return expr
    
    def _evaluate_expression(self, expr, show_steps=False):
        """Evaluate expression following BODMAS rules"""
        if show_steps:
            self.steps.append(f"Evaluating: {expr}")
        
        # First handle parentheses
        while '(' in expr:
            expr = self._evaluate_parentheses(expr, show_steps)
        
        # Then evaluate operators in precedence order
        for op in sorted(self.operators.keys(), key=lambda x: self.operators[x][0], reverse=True):
            expr = self._evaluate_operator(expr, op, show_steps)
        
        return expr
    
    def _evaluate_parentheses(self, expr, show_steps=False):
        """Evaluate innermost parentheses"""
        start = expr.rfind('(')
        end = expr.find(')', start)
        if start == -1 or end == -1:
            return expr
            
        inner_expr = expr[start+1:end]
        if show_steps:
            self.steps.append(f"Evaluating parentheses: {inner_expr}")
        result = self._evaluate_expression(inner_expr, show_steps)
        new_expr = expr[:start] + result + expr[end+1:]
        if show_steps:
            self.steps.append(f"After parentheses: {new_expr}")
        return new_expr
    
    def _evaluate_operator(self, expr, op, show_steps=False):
        """Evaluate all instances of an operator in expression"""
        precedence, func = self.operators[op]
        pattern = r'([+\-*/^])'
        tokens = re.split(pattern, expr)
        
        i = 0
        while i < len(tokens):
            if tokens[i] == op:
                # Get left and right operands
                left = tokens[i-1]
                right = tokens[i+1]
                
                # Evaluate operation
                try:
                    if show_steps:
                        self.steps.append(f"Evaluating: {left} {op} {right}")
                    result = func(left, right)
                    if show_steps:
                        self.steps.append(f"Result: {result}")
                    tokens[i-1:i+2] = [result]
                    i -= 1
                except (InvalidOperation, ValueError, ZeroDivisionError, OverflowError) as e:
                    raise e
            i += 1
        
        return ''.join(tokens)
    
    def _decimal_to_string(self, d):
        """Convert Decimal to string without scientific notation"""
        if d.is_infinite():
            return 'inf'
        if d.is_nan():
            return 'NaN'
        
        sign, digits, exponent = d.as_tuple()
        # Convert digits to string
        digits_str = ''.join(str(digit) for digit in digits)
        
        if exponent >= 0:
            result = digits_str + '0' * exponent
        else:
            exp = -exponent
            if len(digits_str) <= exp:
                result = '0.' + '0' * (exp - len(digits_str)) + digits_str
            else:
                result = digits_str[:-exp] + '.' + digits_str[-exp:]
        
        if sign:
            result = '-' + result
        return result
    
    def _power(self, a, b):
        """Handle exponentiation with overflow protection"""
        try:
            a_dec = Decimal(a)
            b_dec = Decimal(b)
            
            # Check for potential overflow
            if abs(b_dec) > 10000 and abs(a_dec) > 1:
                return 'inf'
                
            result = a_dec ** b_dec
            
            # Check for overflow
            if abs(result) > Decimal('1e1000000'):
                return 'inf'
                
            return self._decimal_to_string(result)
        except (InvalidOperation, ValueError, OverflowError) as e:
            raise e
    
    def _divide(self, a, b):
        """Handle division with zero and overflow protection"""
        try:
            a_dec = Decimal(a)
            b_dec = Decimal(b)
            
            if b_dec == 0:
                raise ZeroDivisionError("Division by zero")
                
            result = a_dec / b_dec
            
            # Check for overflow
            if abs(result) > Decimal('1e1000000'):
                return 'inf'
                
            return self._decimal_to_string(result)
        except (InvalidOperation, ValueError, OverflowError) as e:
            raise e
    
    def _multiply(self, a, b):
        """Handle multiplication with overflow protection"""
        try:
            a_dec = Decimal(a)
            b_dec = Decimal(b)
            
            result = a_dec * b_dec
            
            # Check for overflow
            if abs(result) > Decimal('1e1000000'):
                return 'inf'
                
            return self._decimal_to_string(result)
        except (InvalidOperation, ValueError, OverflowError) as e:
            raise e
    
    def _add(self, a, b):
        """Handle addition with overflow protection"""
        try:
            a_dec = Decimal(a)
            b_dec = Decimal(b)
            
            result = a_dec + b_dec
            
            # Check for overflow
            if abs(result) > Decimal('1e1000000'):
                return 'inf'
                
            return self._decimal_to_string(result)
        except (InvalidOperation, ValueError, OverflowError) as e:
            raise e
    
    def _subtract(self, a, b):
        """Handle subtraction with overflow protection"""
        try:
            a_dec = Decimal(a)
            b_dec = Decimal(b)
            
            result = a_dec - b_dec
            
            # Check for overflow
            if abs(result) > Decimal('1e1000000'):
                return 'inf'
                
            return self._decimal_to_string(result)
        except (InvalidOperation, ValueError, OverflowError) as e:
            raise e

def solve_expression(expression, show_steps=False):
    """Main function to solve the expression with error handling"""
    evaluator = ExpressionEvaluator()
    return evaluator.evaluate(expression, show_steps)

def main():
    """Main function to interact with the user"""
    global sbse
    
    evaluator = ExpressionEvaluator()
    
    print("Expression Evaluator")
    print("Enter 'exit' to quit, 'set <variable> <value>' to set a variable")
    
    while True:
        expression = input("\nEnter an expression: ").strip()
        
        if expression.lower() == 'exit':
            break
        
        # Check if user wants to set a variable
        if expression.lower().startswith('set '):
            parts = expression.split()
            if len(parts) >= 3:
                var_name = parts[1]
                var_value = ' '.join(parts[2:])
                result = evaluator.set_variable(var_name, var_value)
                print(result)
            else:
                print("Usage: set <> <value>")
            continue
        
        # Evaluate the expression with step-by-step evaluation
        result = evaluator.evaluate(expression, show_steps=True)
        
        # Print the result
        if isinstance(result, dict):
            print("Result:", result["result"])
        else:
            print("Result:", result)
        
        # Print the steps (for demonstration)
        print("\nStep-by-step evaluation:")
        for i, step in enumerate(sbse, 1):
            print(f"{i}. {step}")

if __name__ == "__main__":
    main()
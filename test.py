import re
import decimal
import math
from decimal import Decimal, InvalidOperation
import cmath


decimal.getcontext().prec = 1000  
decimal.getcontext().Emax = 1000000  
decimal.getcontext().Emin = -1000000  


sbse = []

class BigNumber:
    def __init__(self, value=None, chunks=None, decimal_pos=None):
        if value is not None:
            if value == 'inf':
                self.chunks = ['inf']
                self.decimal_pos = None
                return
                
            
            if 'E' in value:
                value = self._from_scientific(value)
            
            
            if '.' in value:
                integer_part, fractional_part = value.split('.')
                self.decimal_pos = len(integer_part)
                digits = integer_part + fractional_part
            else:
                self.decimal_pos = len(value)
                digits = value
                
            
            digits = digits.lstrip('0')
            if not digits:
                digits = '0'
                self.decimal_pos = 1
            else:
                
                self.decimal_pos = max(1, self.decimal_pos - (len(value) - len(digits)))
                
            
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
        
        
        self.functions = {
            'sin': lambda x: self._trig(math.sin, x),
            'cos': lambda x: self._trig(math.cos, x),
            'tan': lambda x: self._trig(math.tan, x),
            'sqrt': lambda x: self._sqrt(x),
            'log': lambda x: self._log(x),
            'log10': lambda x: self._log10(x),
            'exp': lambda x: self._exp(x),
            'abs': lambda x: self._abs(x),
            'floor': lambda x: self._floor(x),
            'ceil': lambda x: self._ceil(x),
            'round': lambda x: self._round(x),
        }
        
        
        self.constants = {
            'pi': str(Decimal(str(math.pi))),
            'e': str(Decimal(str(math.e))),
        }
        
        
        self.variables = {}
        
        
        self.steps = []
    
    def set_variable(self, name, value):
        """Set a variable value"""
        try:
            
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
            
            self.steps = []
            
            
            self._validate_expression(expression)
            
            
            expr = self._preprocess(expression)
            
            
            if expr.count('(') != expr.count(')'):
                raise ValueError("Mismatched parentheses")
            
            
            result = self._evaluate_expression(expr, show_steps)
            
            
            if result == 'inf':
                result_str = 'inf'
            else:
                result_str = str(BigNumber(result))
            
            
            sbse = self.steps.copy()
            
            
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
        
        valid_chars = set("0123456789.+-*/^()eE×· ")
        expr_no_spaces = expr.replace(' ', '')
        
        for char in expr_no_spaces:
            if char not in valid_chars and not char.isalpha():
                raise ValueError(f"Invalid character '{char}' in expression")
    
    def _preprocess(self, expr):
        """Handle implicit multiplication, scientific notation, functions, and variables"""
        
        expr = expr.replace(' ', '')
        
        
        expr = expr.replace('×', '*')
        expr = expr.replace('·', '*')
        
        
        expr = self._process_signs_and_multiplication(expr)
        
        
        expr = self._process_constants(expr)
        
        expr = self._process_variables(expr)
        
        expr = self._process_functions(expr)
        
        
        expr = re.sub(r'(\d+\.?\d*[eE][+-]?\d+)(\()', r'\1*\2', expr)
        expr = re.sub(r'(\d+\.?\d*[eE][+-]?\d+)([a-zA-Z])', r'\1*\2', expr)
        
        return expr
    
    def _process_signs_and_multiplication(self, expr):
        """Process unary signs and implicit multiplication according to basic math rules"""
        
        
        expr = re.sub(r'(\d)(\()', r'\1*\2', expr)    
        expr = re.sub(r'(\))(\d)', r'\1*\2', expr)    
        expr = re.sub(r'(\))([a-zA-Z])', r'\1*\2', expr)  
        expr = re.sub(r'([a-zA-Z])(\()', r'\1*\2', expr)  
        expr = re.sub(r'([a-zA-Z])(\d)', r'\1*\2', expr)  
        expr = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', expr)  
        expr = re.sub(r'(\))(\()', r'\1*\2', expr)    
        
        
        
        tokens = []
        i = 0
        n = len(expr)
        
        while i < n:
            if expr[i] in '+-':
                
                is_unary = False
                
                
                if i == 0:
                    is_unary = True
                
                elif i > 0 and expr[i-1] == '(':
                    is_unary = True
                
                elif i > 0 and expr[i-1] in '+-*/^':
                    is_unary = True
                
                if is_unary:
                    if expr[i] == '-':
                        tokens.append('u-')  
                    
                    i += 1
                else:
                    tokens.append(expr[i])
                    i += 1
            else:
                tokens.append(expr[i])
                i += 1
        
        
        expr = ''.join(tokens)
        
        return expr
    
    def _process_functions(self, expr):
        """Process mathematical functions with proper handling of nested parentheses"""
        
        i = 0
        while i < len(expr):
            
            matched = False
            for func_name in self.functions:
                if expr.startswith(func_name, i) and i+len(func_name) < len(expr) and expr[i+len(func_name)] == '(':
                    
                    
                    start = i + len(func_name) + 1  
                    count = 1
                    j = start
                    while j < len(expr) and count > 0:
                        if expr[j] == '(':
                            count += 1
                        elif expr[j] == ')':
                            count -= 1
                        j += 1
                    if count == 0:
                        
                        arg = expr[start:j-1]
                        try:
                            
                            arg_value = self._evaluate_expression(arg)
                            
                            result = self.functions[func_name](arg_value)
                            
                            expr = expr[:i] + result + expr[j:]
                            
                            matched = True
                            break
                        except Exception as e:
                            raise ValueError(f"Error in function {func_name}: {str(e)}")
                    else:
                        
                        raise ValueError(f"Mismatched parentheses in function {func_name}")
            if not matched:
                i += 1
        return expr
    
    def _process_variables(self, expr):
        """Replace variables with their values"""
        for var_name, var_value in self.variables.items():
            
            pattern = rf'\b{var_name}\b'
            expr = re.sub(pattern, var_value, expr)
        return expr
    
    def _process_constants(self, expr):
        """Replace constants with their values"""
        for const_name, const_value in self.constants.items():
            
            pattern = rf'\b{const_name}\b'
            expr = re.sub(pattern, const_value, expr)
        return expr
    
    def _evaluate_expression(self, expr, show_steps=False):
        """Evaluate expression following BODMAS rules"""
        if show_steps:
            self.steps.append(f"Evaluating: {expr}")
        
        
        while 'u-' in expr:
            expr = self._evaluate_unary_minus(expr, show_steps)
        
        
        while '(' in expr:
            expr = self._evaluate_parentheses(expr, show_steps)
        
        
        for op in sorted(self.operators.keys(), key=lambda x: self.operators[x][0], reverse=True):
            expr = self._evaluate_operator(expr, op, show_steps)
        
        return expr
    
    def _evaluate_unary_minus(self, expr, show_steps=False):
        """Evaluate unary minus operations"""
        i = 0
        while i < len(expr):
            if expr.startswith('u-', i):
                
                j = i + 2  
                
                if j >= len(expr):
                    raise ValueError("Incomplete unary minus operation")
                
                if expr[j] == '(':
                    
                    count = 1
                    k = j + 1
                    while k < len(expr) and count > 0:
                        if expr[k] == '(':
                            count += 1
                        elif expr[k] == ')':
                            count -= 1
                        k += 1
                    
                    if count != 0:
                        raise ValueError("Mismatched parentheses")
                    
                    operand = expr[j:k]
                    
                    
                    operand_value = self._evaluate_expression(operand)
                    
                    
                    if show_steps:
                        self.steps.append(f"Evaluating: -({operand}) = -({operand_value})")
                    result = self._apply_unary_minus(operand_value)
                    if show_steps:
                        self.steps.append(f"Result: {result}")
                    
                    
                    expr = expr[:i] + result + expr[k:]
                    
                else:
                    
                    k = j
                    while k < len(expr) and expr[k] not in '+-*/^()':
                        k += 1
                    
                    operand = expr[j:k]
                    
                    
                    if show_steps:
                        self.steps.append(f"Evaluating: -{operand}")
                    result = self._apply_unary_minus(operand)
                    if show_steps:
                        self.steps.append(f"Result: {result}")
                    
                    
                    expr = expr[:i] + result + expr[k:]
                    
            else:
                i += 1
        
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
                
                left = tokens[i-1]
                right = tokens[i+1]
                
                
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
    
    def _apply_unary_minus(self, value):
        """Apply unary minus to a value"""
        try:
            
            if value in self.variables:
                value = self.variables[value]
            
            
            d = Decimal(value)
            result = -d
            
            
            return self._decimal_to_string(result)
        except (InvalidOperation, ValueError, OverflowError) as e:
            raise e
    
    def _decimal_to_string(self, d):
        """Convert Decimal to string without scientific notation"""
        if d.is_infinite():
            return 'inf'
        if d.is_nan():
            return 'NaN'
        
        sign, digits, exponent = d.as_tuple()
        
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
            
            
            if a_dec < 0 and b_dec != b_dec.to_integral_value():
                raise ValueError("Negative base raised to fractional exponent results in complex number")
            
            
            if abs(b_dec) > 10000 and abs(a_dec) > 1:
                return 'inf'
                
            result = a_dec ** b_dec
            
            
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
            
            
            if abs(result) > Decimal('1e1000000'):
                return 'inf'
                
            return self._decimal_to_string(result)
        except (InvalidOperation, ValueError, OverflowError) as e:
            raise e
    
    
    def _trig(self, func, x):
        """Handle trigonometric functions with better range checking"""
        try:
            d = Decimal(x)
            
            
            
            
            if abs(d) > Decimal('1e10'):
                
                two_pi = Decimal('2') * Decimal(str(math.pi))
                d = d % two_pi
            
            
            result = Decimal(str(func(float(d))))
            return str(result)
        except Exception as e:
            raise ValueError(f"Error in trigonometric function: {str(e)}")
    
    def _sqrt(self, x):
        """Handle square root using Decimal's sqrt method"""
        try:
            d = Decimal(x)
            if d < 0:
                raise ValueError("Square root of negative number")
            result = d.sqrt()
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in sqrt function: {str(e)}")
    
    def _log(self, x):
        """Handle natural logarithm using Decimal's ln method"""
        try:
            d = Decimal(x)
            if d <= 0:
                raise ValueError("Logarithm of non-positive number")
            result = d.ln()
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in log function: {str(e)}")
    
    def _log10(self, x):
        """Handle base-10 logarithm using Decimal's log10 method"""
        try:
            d = Decimal(x)
            if d <= 0:
                raise ValueError("Logarithm of non-positive number")
            result = d.log10()
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in log10 function: {str(e)}")
    
    def _exp(self, x):
        """Handle exponential using Decimal's exp method"""
        try:
            d = Decimal(x)
            
            if abs(d) > 1000:
                raise ValueError("Exponent too large")
            result = d.exp()
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in exp function: {str(e)}")
    
    def _abs(self, x):
        """Handle absolute value using Decimal's abs method"""
        try:
            d = Decimal(x)
            result = abs(d)
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in abs function: {str(e)}")
    
    def _floor(self, x):
        """Handle floor using Decimal's to_integral_value method"""
        try:
            d = Decimal(x)
            result = d.to_integral_value(rounding=decimal.ROUND_FLOOR)
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in floor function: {str(e)}")
    
    def _ceil(self, x):
        """Handle ceiling using Decimal's to_integral_value method"""
        try:
            d = Decimal(x)
            result = d.to_integral_value(rounding=decimal.ROUND_CEILING)
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in ceil function: {str(e)}")
    
    def _round(self, x):
        """Handle rounding using Decimal's to_integral_value method"""
        try:
            d = Decimal(x)
            result = d.to_integral_value(rounding=decimal.ROUND_HALF_UP)
            return self._decimal_to_string(result)
        except Exception as e:
            raise ValueError(f"Error in round function: {str(e)}")

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
        
        
        if expression.lower().startswith('set '):
            parts = expression.split()
            if len(parts) >= 3:
                var_name = parts[1]
                var_value = ' '.join(parts[2:])
                result = evaluator.set_variable(var_name, var_value)
                print(result)
            else:
                print("Usage: set <variable> <value>")
            continue
        
        
        result = evaluator.evaluate(expression, show_steps=True)
        
        
        if isinstance(result, dict):
            print("Result:", result["result"])
        else:
            print("Result:", result)
        
        
        print("\nStep-by-step evaluation:")
        for i, step in enumerate(sbse, 1):
            print(f"{i}. {step}")

if __name__ == "__main__":
    main()
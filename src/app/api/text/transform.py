import sys
import json

def main():
    """
    Standalone Python script for text transformation.
    Reads JSON from stdin and outputs transformed text to stdout.
    """
    try:
        # Read all input from stdin
        input_data = ""
        for line in sys.stdin:
            input_data += line

        if not input_data.strip():
            result = {"error": "No input received"}
            print(json.dumps(result))
            return

        # Parse JSON input
        data = json.loads(input_data.strip())
        input_text = data.get('text', '')

        if not input_text:
            result = {"error": "text field is required"}
            print(json.dumps(result))
            return

        # Transform the text
        transformed_text = ""
        for char in input_text:
            if char == ' ':
                # If it's already a space, add 4 more spaces (total 5 spaces)
                transformed_text += '     '
            else:
                # Capitalize the letter and add 2 spaces
                transformed_text += char.upper() + '  '

        result = {
            'original': input_text,
            'transformed': transformed_text,
            'length': len(transformed_text)
        }

        print(json.dumps(result))

    except json.JSONDecodeError as e:
        result = {"error": f"Invalid JSON input: {str(e)}"}
        print(json.dumps(result))
    except Exception as e:
        result = {"error": f"Failed to transform text: {str(e)}"}
        print(json.dumps(result))

if __name__ == "__main__":
    main()
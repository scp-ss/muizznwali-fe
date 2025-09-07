#include <iostream>
#include <string>
#include <cctype>
#include <limits>

using namespace std;

string transformText(const string& input) {
    string result = "";

    for (char c : input) {
        if (c == ' ') {
            // If it's already a space, add 4 more spaces (total 5 spaces)
            result += "     ";
        } else {
            // Capitalize the letter and add 2 spaces
            result += toupper(c);
            result += "  ";
        }
    }

    return result;
}

int main() {
    cout << "=====================================" << endl;
    cout << "   Text Transformer & Capitalizer" << endl;
    cout << "=====================================" << endl;
    cout << endl;
    cout << "This program will:" << endl;
    cout << "• Convert all letters to UPPERCASE" << endl;
    cout << "• Add 2 spaces after each character" << endl;
    cout << "• Add 4 extra spaces to existing spaces (5 total)" << endl;
    cout << endl;
    cout << "Example: 'hi there' -> 'H  I       T  H  E  R  E  '" << endl;
    cout << endl;

    while (true) {
        cout << "Enter your text (or 'quit' to exit): ";
        string input;

        // Clear any remaining newline characters
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        // Read the entire line including spaces
        getline(cin, input);

        // Check if user wants to quit
        if (input == "quit" || input == "QUIT" || input == "Quit") {
            cout << endl;
            cout << "Thank you for using Text Transformer!" << endl;
            cout << "Goodbye! 👋" << endl;
            break;
        }

        // Check if input is empty
        if (input.empty()) {
            cout << "❌ Error: Please enter some text!" << endl;
            cout << endl;
            continue;
        }

        // Transform the text
        string transformed = transformText(input);

        // Display results
        cout << endl;
        cout << "📝 Original Text:" << endl;
        cout << "\"" << input << "\"" << endl;
        cout << endl;
        cout << "✨ Transformed Text:" << endl;
        cout << "\"" << transformed << "\"" << endl;
        cout << endl;
        cout << "📊 Statistics:" << endl;
        cout << "• Original length: " << input.length() << " characters" << endl;
        cout << "• Transformed length: " << transformed.length() << " characters" << endl;
        cout << "• Length increase: " << (transformed.length() - input.length()) << " characters" << endl;
        cout << endl;
        cout << "----------------------------------------" << endl;
        cout << endl;
    }

    return 0;
}
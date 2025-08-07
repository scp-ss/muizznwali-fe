import './abt-section.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <h2>🧠 About the Heavy Duty Calculator</h2>
      <p>
        Most calculators sacrifice precision when dealing with extremely large or small numbers.
        They round off values, drop decimals, and simplify results—sometimes drastically.
        Our calculator doesn’t do that. It preserves <strong>every digit</strong>, <strong>every decimal</strong>,
        and <strong>every nuance</strong> of your calculation.
      </p>

      <div className="comparison-block">
        <h3>🧮 Normal Calculator</h3>
        <pre>
{`99999999999999999999 × 100
= 1E+22   // Rounded scientific notation

÷ 100
= 10000000000000000000   // Lost precision

99999999999999999999.999999 + 10
= 1E+20   // Decimal stripped

- 10
= 1E+20   // Still inaccurate

1.00000000E+22 - 10
= 1.00000000E+22   // Doesn't reflect subtraction due to rounding`}
        </pre>

        <h3>✅ Heavy Duty Calculator</h3>
        <pre>
{`99999999999999999999 × 100
= 9999999999999999999900   // Full precision

÷ 100
= 99999999999999999999   // Accurate result

99999999999999999999.999999 + 10
= 100000000000000000009.999999   // Decimal preserved

- 10
= 99999999999999999999.999999   // Back to original value

1.00000000E+22 - 10
= 9999999999999999999990   // Accurate result
(Use "Display Full Value" to reveal exact digits)`}
        </pre>

        <p className="accuracy-note">
          Our calculator uses string-based computation to preserve every digit—no rounding, no truncation,
          and no reliance on floating-point limitations.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;

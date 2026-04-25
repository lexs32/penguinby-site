const Li = ({ children }) => (
  <li className="pl-5 relative before:content-['▸'] before:absolute before:left-0 before:text-primary before:text-[0.75rem] before:top-[2px]">
    {children}
  </li>
);

const H3 = ({ children }) => (
  <h3 className="font-orbitron font-bold text-[0.9rem] text-primary mt-6 mb-2 tracking-[1px]">{children}</h3>
);

export default function RefundContent() {
  return (
    <div>
      <p className="mb-3">
        This Refund Policy helps you understand when refunds may be granted for digital goods and services.
      </p>

      <H3>1. Eligibility for Refunds</H3>
      <p className="mb-3">Refunds may be issued under the following conditions:</p>
      <ul className="flex flex-col gap-1.5 mb-4">
        <Li>1.1 Undelivered goods or services may be refundable.</Li>
        <Li>1.2 Billing errors may be corrected via refund or credit.</Li>
        <Li>1.3 Service availability credits are evaluated case-by-case.</Li>
      </ul>

      <H3>2. Non-Refundable Conditions</H3>
      <p className="mb-3">Refunds will not be issued in the following situations:</p>
      <ul className="flex flex-col gap-1.5 mb-4">
        <Li>
          2.1 <strong className="text-foreground">Change of Mind:</strong> If you decide you no longer want the product after purchase.
        </Li>
        <Li>
          2.2 <strong className="text-foreground">User Error:</strong> Incorrect installation or failure to follow setup instructions.
        </Li>
      </ul>

      <H3>3. Refund Request Process</H3>
      <p className="mb-3">To request a refund:</p>
      <ul className="flex flex-col gap-1.5 mb-4">
        <Li>
          3.1 Contact support at{" "}
          <a href="mailto:support.penguinby@gmail.com" className="text-accent underline hover:text-primary">
            support.penguinby@gmail.com
          </a>{" "}
          within 7 days of purchase.
        </Li>
        <Li>3.2 Provide proof of purchase and a detailed issue description.</Li>
        <Li>3.3 Requests are typically reviewed within 5 business days.</Li>
      </ul>
    </div>
  );
}


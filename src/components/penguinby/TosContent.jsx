export default function TosContent() {
  return (
    <div>
      <p className="mb-3">
        Welcome to <strong className="text-foreground">penguinby.site</strong>. This document outlines how we handle basic site usage and
        communications.
      </p>
      <h3 className="font-orbitron font-bold text-[0.9rem] text-primary mt-6 mb-2 tracking-[1px]">1. Information We Collect</h3>
      <p className="mb-3">
        <strong className="text-foreground">Contact Information:</strong> We may collect email addresses you provide for fulfillment and support.
      </p>
      <p className="mb-3">
        <strong className="text-foreground">Automatically Collected Information:</strong> Basic technical data such as IP address and browser type
        may be logged for security and troubleshooting.
      </p>
      <h3 className="font-orbitron font-bold text-[0.9rem] text-primary mt-6 mb-2 tracking-[1px]">2. Use of Information</h3>
      <ul className="flex flex-col gap-1.5 mb-4">
        {[
          "2.1 To provide and maintain our services.",
          "2.2 To respond to support inquiries.",
          "2.3 To improve site reliability and security.",
          "2.4 To comply with legal obligations.",
        ].map((item) => (
          <li key={item} className="pl-5 relative before:content-['▸'] before:absolute before:left-0 before:text-primary before:text-[0.75rem] before:top-[2px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}


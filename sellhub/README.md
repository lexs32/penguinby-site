# PenguinBy SellHub Liquid Theme

Two files, paste each into SellHub's Code Editor:

1. **`layout.liquid`** → SellHub Dashboard → **Code Editor → Layout (Global)**
2. **`home.liquid`** → SellHub Dashboard → **Code Editor → Custom Pages → Home / Store**

## Notes

- Uses Tailwind (already loaded by SellHub).
- Custom fonts (Orbitron, Rajdhani, JetBrains Mono) loaded from Google Fonts in the layout.
- The product grid auto-renders from your SellHub products. Add Arc Raiders Pro and R6 Pro as products in the dashboard with subscription pricing for 1 Day / 1 Week / 1 Month.
- Discord link points to `https://discord.gg/HtSVra2rFS`. Edit in `layout.liquid` if needed.
- TOS / Refund text is in `layout.liquid` modals.
- Cloudflare Turnstile is removed since SellHub handles bot protection at checkout.

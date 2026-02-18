# Specification

## Summary
**Goal:** Build a premium dark-themed sales website for AI Academy to showcase and sell courses and ebooks, support WhatsApp contact, and provide a simple checkout + ebook download experience.

**Planned changes:**
- Create a consistent premium dark UI (royal blue/purple gradients, glassmorphism cards, smooth hover/scroll animations) with full mobile responsiveness and professional typography (Poppins/Inter).
- Implement the homepage with the required sections in order, including the exact hero copy and CTA labels, plus footer content and social icon placeholders.
- Add backend-driven catalog listings for exactly 4 courses and exactly 4 ebooks (name, price, image, buy button), and wire hero CTAs to scroll/navigate to the correct sections.
- Implement WhatsApp integration so all WhatsApp CTAs open chat to +91 8171739752, including a dedicated banner and a persistent entry point.
- Add a checkout UI for selecting payment method (Razorpay, UPI, Paytm, Debit/Credit card) and redirect via backend-configured payment links per product/method, with WhatsApp fallback when missing; record purchase intents/orders in the backend.
- Provide instant ebook downloads after payment using backend-gated download tokens for frontend-served static ebook files, plus a “My Downloads” page listing paid ebook purchases for the current session/principal.
- Add a Testimonials/Student Results section (4–6 cards) including “earnings screenshot style” placeholder assets consistent with the site theme.
- Include and render all required static images from frontend assets (no backend image serving).

**User-visible outcome:** Users can browse a premium AI Academy homepage, view 4 featured courses and 4 ebooks, start a purchase via a payment-method checkout (redirecting to configured payment links or WhatsApp fallback), chat via WhatsApp from multiple entry points, and download paid ebooks from a “My Downloads” page.

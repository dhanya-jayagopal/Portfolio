'use client';

export default function SubscribeForm() {
  return (
    <>
      <form
        className="subscribe"
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="email" placeholder="you@somewhere.com" />
        <button type="submit">Subscribe</button>
      </form>
      <span className="footer-hint">A handful of letters a year. No funnel.</span>
    </>
  );
}

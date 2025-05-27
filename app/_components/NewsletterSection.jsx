export default function NewsletterSection() {
  return (
    <section className="bg-muted py-16 px-4 text-center mt-5">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Join Our Newsletter
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto mb-6">
        Subscribe to get special offers, free giveaways, and exclusive deals on new anime digital products.
      </p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-4 py-3 rounded-md bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          className="px-6 py-3 bg-anime-purple text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

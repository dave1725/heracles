export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/90 backdrop-blur-sm py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-2 md:mb-0">
          © {new Date().getFullYear()} <span className="font-semibold text-primary">HERACLES</span>. All rights reserved.
        </p>
        <div className="flex gap-4 items-center">
          <span className="hidden sm:inline text-xs">v1.0.0</span>
          <a
            href="https://github.com/dave1725/heracles"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

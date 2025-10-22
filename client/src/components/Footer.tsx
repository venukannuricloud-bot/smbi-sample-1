export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 SBMI Membership Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button onClick={() => console.log('Privacy clicked')} className="hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => console.log('Terms clicked')} className="hover:text-foreground transition-colors">
              Terms of Service
            </button>
            <button onClick={() => console.log('Support clicked')} className="hover:text-foreground transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

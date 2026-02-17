import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        <div>
          <h3 className="text-white text-xl font-bold">Sommaire</h3>
          <p className="mt-3 text-sm text-slate-400">
            AI-powered PDF summarization and chat platform.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/upload">Upload PDF</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Features</h4>
          <ul className="space-y-2 text-sm">
            <li>AI Summaries</li>
            <li>Chat with PDF</li>
            <li>Cloud Storage</li>
            <li>Secure Auth</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Sommaire. All rights reserved.
      </div>
    </footer>
  );
}

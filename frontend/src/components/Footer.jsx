export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 text-center py-6 text-sm">
      <div className="flex flex-col gap-2">
        <p>Decentralized Ledger • Distributed Storage • Confidential Submissions</p>
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Disclosure Hub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

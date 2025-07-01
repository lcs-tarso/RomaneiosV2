export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">{children}</div>;
}

export function DialogContent({ children, className }) {
  return <div className={`bg-white rounded-lg p-6 w-full max-w-lg ${className}`}>{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

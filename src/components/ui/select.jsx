export function Select({ children, ...props }) {
  return <select className="w-full border rounded px-3 py-2" {...props}>{children}</select>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export function CamBtn({
  variant,
  size,
  children,
  onClick,
  ...rest
}: {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: string;
  onClick: () => void
}) {
  return (
    // using tailwind
    <button
      className={`text-white font-bold rounded-lg px-4 py-2 capitalize ${
        variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'
      } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-md'}`}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CamBtn;

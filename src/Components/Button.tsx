type ChildrenProps = {
  children: React.ReactNode;
  onClick: () => unknown;
  className: string;
};
export default function Button({
  children,
  onClick,
  className,
}: ChildrenProps) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

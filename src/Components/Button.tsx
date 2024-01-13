type ChildrenProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => unknown;
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

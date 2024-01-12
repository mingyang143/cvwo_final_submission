type ChildrenProps = {
  children: React.ReactNode;
};
export default function Comment({ children }: ChildrenProps) {
  return <p>{children}</p>;
}

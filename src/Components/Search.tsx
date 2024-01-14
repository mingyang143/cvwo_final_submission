import styles from "./Search.module.css";
import { useKey } from "../Hooks/useKey";
import { useRef } from "react";
type ChildrenProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};
export default function Search({ query, setQuery }: ChildrenProps) {
  const inputEl = useRef<HTMLInputElement>(null);
  //focus on search bar on keypress "enter"
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Search for a post..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

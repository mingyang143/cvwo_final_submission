type ChildrenProps = {
  currTag: string;
  onSetCurrTag: React.Dispatch<React.SetStateAction<string>>;
};
import { usePosts } from "../Contexts/Hooks/postContextHook";

export default function TagSelection({ currTag, onSetCurrTag }: ChildrenProps) {
  const { tagsAll } = usePosts();

  return (
    <>
      <label>Filter Posts</label>
      <select onChange={(e) => onSetCurrTag(e.target.value)} value={currTag}>
        <option>All Posts</option>
        {tagsAll.map((tag) => (
          <option key={tag.id}>{tag.tag}</option>
        ))}
      </select>
    </>
  );
}

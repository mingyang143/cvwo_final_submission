import Button from "./Button";
import { usePosts } from "../Contexts/Hooks/postContextHook";

function BackButton() {
  const { postFormToggle } = usePosts();
  function backNavigate(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    postFormToggle();
  }
  return (
    <Button
      className="clear"
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        backNavigate(e);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;

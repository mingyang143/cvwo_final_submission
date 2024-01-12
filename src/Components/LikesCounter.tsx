import Button from "./Button";

export default function LikesCounter({
  likes,
  onUpdateLikes,
}: {
  likes: number;
  onUpdateLikes: () => void;
}) {
  return (
    <div className="hearts-counter">
      <span>{likes} ❤️</span>
      <Button className="" onClick={onUpdateLikes}>
        Like 💖
      </Button>
    </div>
  );
}

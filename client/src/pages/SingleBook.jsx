import { useParams } from "react-router-dom";

export default function Home() {
     const { id } = useParams();

  return (
    <div className="single-book">
      Single Book {id}
    </div>
  );
}

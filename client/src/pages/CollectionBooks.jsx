import { useParams } from "react-router-dom";

export default function CollectionBooks() {
const { slug } = useParams();
  console.log(slug);

  return (
    <div className="collection-books">
      CollectionBooks <br/>
      Books from {slug}
    </div>
  );
}
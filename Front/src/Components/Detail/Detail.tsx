import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/index";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const article = useSelector((state: RootState) =>
    state.articles.list.find((article) => article.id === Number(id))
  );

  return (
    <div>
      <img src={article?.img} alt={article?.title} />
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
      <p>{article?.price}</p>
    </div>
  );
}

export default Detail;

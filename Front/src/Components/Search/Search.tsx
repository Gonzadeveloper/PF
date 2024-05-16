import Card from "../Card/card";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../Redux/index";
import { Article } from "../../Redux/Slices/ArticlesSlice";

interface Props {
  articles: Article[];
}

const Search: React.FC<Props> = ({ articles }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <h4>Filtros</h4>
        </div>
        <div className="col-md-10">
          <div className="row">
            {articles.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                img={card.img}
                title={card.title}
                content={card.content}
                price={card.price}
                ratings={card.ratings}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  articles: state.articles.list, // Suponiendo que tienes un slice llamado articles en tu store
});

export default connect(mapStateToProps)(Search);

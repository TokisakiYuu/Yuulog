import React, { FC, useState } from "react";
import styled from "styled-components/macro";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

type ArticleComponent = FC<{}>;
const Article: ArticleComponent = () => {
  const [changed, setChanged] = useState(false);
  return (
    <Container onClick={() => setChanged(!changed)}>
      <Header change={changed} />
      <Body />
      <Footer />
    </Container>
  );
};

const Container = styled.article.attrs({
  itemScope: true,
  itemType: "https://schema.org/Article"
})`
  background-color: #808080;
`;

export default Article;

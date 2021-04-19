import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import { BaseLayout } from '../components/BaseLayout';
import SEO from '../components/seo';
import { CodeHightLight } from '../components/CodeHighLight';
import {H1} from '../components/PostH1';
import { Container } from '@material-ui/core';

const MyH1 = props => <h1 style={{ color: "tomato" }} {...props} />;
const MyParagraph = props => (
  <p style={{ fontSize: "18px", lineHeight: 1.6 }} {...props} />
);

const components = {
  h1: H1,
  p: MyParagraph,
  code: CodeHightLight,
  // wrapper: ({children}:any)=><Container maxWidth="md">{children}</Container>,
  wrapper: ({children, ...props}) => {
    console.log(children.map(child => child.props.mdxType));
    return <Container maxWidth="md">{children}</Container>;
  }
};

export default (props)=>{
  const post = props.pageContext;
  return (
    <BaseLayout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Container maxWidth="md">
        <MDXProvider components={components}>
          {props.children}
        </MDXProvider>
      </Container>
    </BaseLayout>
  );
};


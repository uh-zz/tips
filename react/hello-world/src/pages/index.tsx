import React from "react";
import { graphql } from "gatsby";
import {BaseLayout} from "../components/BaseLayout";
import { PostList } from "../components/PostsList";
import SEO from "../components/seo";
export default function Home({data}) {
  return (
    <BaseLayout>
      <SEO title={data.site.siteMetadata.title} description={data.site.siteMetadata.description} />
      <PostList nodes={data.allMdx.nodes as any[]} />
    </BaseLayout>
  );
}
export const query = graphql`
  query {
    allMdx {
      nodes {
        id
        frontmatter {
          title
          date
        }
        excerpt
        fields {
          slug
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
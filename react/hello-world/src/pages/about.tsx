import React from 'react';
import { Link, graphql } from 'gatsby';

import { BaseLayout } from '../components/BaseLayout';

type AboutProps = {
  data:{
    site:{
      siteMetadata:{
        title:string
      }
    }
  }
}
export default function About({ data }:AboutProps) {
  return (
    <BaseLayout>
      <h1>
        About
        {data.site.siteMetadata.title}
      </h1>
      <Link to="/">Home</Link>
      <p>
        We&apos;re the only site running on your computer dedicated to showing the
        best photos and videos of pandas eating lots of food.
      </p>
    </BaseLayout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

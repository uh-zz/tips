// import React from "react";
// import { graphql } from "gatsby";
// import { BaseLayout } from "../components/BaseLayout";
// import SEO from "../components/seo";

// export default function BlogPost({ data }) {
//   const post = data.markdownRemark;
//   return (
//     <BaseLayout>
//       <SEO title={post.frontmatter.title} description={post.excerpt} />
//       <div>
//         <h1>{post.frontmatter.title}</h1>
//         <div dangerouslySetInnerHTML={{ __html: post.html }} />
//       </div>
//     </BaseLayout>
//   );
// }

// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//       excerpt
//     }
//   }
// `;
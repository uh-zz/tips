import { Container, Paper } from '@material-ui/core';
import React from 'react';
import { PostItem } from './PostItem';

type PostListProps = {
  nodes: any[]
}

export const PostList = ({nodes}:PostListProps)=>{
  const postItems = nodes.map(node => <PostItem node={node} />);
  return (
    <Container maxWidth="md">
      {/* <Paper elevation={3}> */}
      {postItems}
      {/* </Paper> */}
    </Container>
  );
};
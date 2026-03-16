import React from 'react';
import BlogPostItemFooter from '@theme-original/BlogPostItem/Footer';
import GiscusComment from '@site/src/components/GiscusComment';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemFooterWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  return (
    <>
      <BlogPostItemFooter {...props} />
      {isBlogPostPage && <GiscusComment />}
    </>
  );
}

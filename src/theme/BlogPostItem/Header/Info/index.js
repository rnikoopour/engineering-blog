import React from 'react';
import BlogPostItemHeaderInfo from '@theme-original/BlogPostItem/Header/Info';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function BlogPostItemHeaderInfoWrapper(props) {
  const { metadata } = useBlogPost();
  const { tags } = metadata;

  return (
    <>
      <BlogPostItemHeaderInfo {...props} />
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Link
              key={tag.permalink}
              to={tag.permalink}
              className={styles.tag}
            >
              {tag.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

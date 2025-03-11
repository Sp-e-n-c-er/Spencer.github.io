import React from 'react';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import TagsListInline from '@theme/TagsListInline';

export default function BlogPostItemWrapper(props) {
  const { metadata } = useBlogPost();
  const { tags } = metadata;

  return (
    <>
      <article className="margin-bottom--xl">
        <header>
          <BlogPostItemHeaderTitle />
          <BlogPostItemHeaderInfo />
          <BlogPostItemHeaderAuthors />
          {tags.length > 0 && (
            <div className="margin-top--sm">
              <TagsListInline tags={tags} />
            </div>
          )}
        </header>
        <div className="margin-top--md">
          <BlogPostItemContent {...props} />
        </div>
        <BlogPostItemFooter />
      </article>
    </>
  );
}
const fs = require('fs');
const path = require('path');

function extractTags(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];
  const frontmatter = match[1];
  const tagsMatch = frontmatter.match(/^tags:\s*\n((?:\s+-\s+.+\n?)*)/m);
  if (!tagsMatch) return [];
  return tagsMatch[1]
    .split('\n')
    .map((line) => line.replace(/^\s+-\s+/, '').trim())
    .filter(Boolean);
}

function slugify(tag) {
  return tag
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .replace(/(\d)([a-zA-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = function (context) {
  return {
    name: 'blog-tags-plugin',
    async contentLoaded({ actions }) {
      const blogDir = path.join(context.siteDir, 'blog');
      const tagCounts = {};

      function walk(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            walk(full);
          } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
            const content = fs.readFileSync(full, 'utf8');
            for (const tag of extractTags(content)) {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
          }
        }
      }

      walk(blogDir);

      const tags = Object.entries(tagCounts)
        .map(([label, count]) => ({
          label,
          permalink: `/tags/${slugify(label)}`,
          count,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      actions.setGlobalData({ tags });
    },
  };
};

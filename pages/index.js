import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { format } from "date-fns";
import Link from "next/link";

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const htmlContent = remark().use(html).processSync(content).toString();
    const slug = filename.replace(/\.md$/, "");
    return { ...data, content: htmlContent, slug };
  });
  return { props: { posts } };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, "MMMM dd, yyyy");
}

export default function Home({ posts }) {
  return (
    <div>
      <h1 class="title">My Blog</h1>
      {posts.map((post) => (
        <div key={post.slug} class="post">
          <h2>{post.title}</h2>
          <p class="date">{formatDate(post.date)}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ))}
      <div>
        <button>
          <Link href="/new">Create new post</Link>
        </button>
      </div>
    </div>
  );
}


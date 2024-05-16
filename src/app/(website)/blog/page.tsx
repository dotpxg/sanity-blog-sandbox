import PostComponent from "@/components/PostComponent";
import { client } from "../../../../sanity/lib/client";
import { Post } from "@/utils/interface";
import Image from "next/image";
async function getPosts() {
  const query = `
  *[_type == "post"] {
    title,
    slug,
    publishedAt,
    body,
    "imageUrl": mainImage.asset->url
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function BlogHomePage() {
  const posts: Post[] = await getPosts();
  console.log(posts, "posts");
  return (
    <div>
      {posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
    </div>
  );
}

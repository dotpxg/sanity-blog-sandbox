import { client } from "../../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPost(slug: string) {
  const query = `
  *[_type == 'post' && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    _id,
    body,
    excerpt,
    categories[] -> {
            _id,
            title,
            slug,
    },
    "imageUrl": mainImage.asset->url
  }
  `;
  const post = await client.fetch(query);
  return post;
}
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata | undefined> {
//   const post = await getPost(params?.slug);
//   if (!post) {
//     return;
//   }

//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       type: "article",
//       locale: "en_US",
//       url: `https://interiayano.com/${params.slug}`,
//       siteName: "Interiayano",
//       images: [
//         // {
//         //   url: post.image,
//         // }
//         // {
//         //   url: urlForImage(post?.body?.find((b: any) => b._type === "image")).width(1200).height(630).url(),
//         //   width: 1200,
//         //   height: 630,
//         // },
//       ],
//     },
//   };
// }
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const post = await getPost(params?.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params?.slug);
  console.log(post);
  return (
    <div>
      <Image src={post?.imageUrl} alt="Image" height={200} width={500} />
      My Post: {params.slug}
      <h2 className="text-3xl">{post?.title}</h2>
      <PortableText value={post?.body} />
    </div>
  );
};

export default BlogPost;

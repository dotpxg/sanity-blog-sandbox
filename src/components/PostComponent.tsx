import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Post } from "@/utils/interface";
import Image from "next/image";

interface Props {
  post: Post;
}
const PostComponent = ({ post }: Props) => {
  return (
    <div>
      <Link href={`/blog/${[post?.slug?.current]}`}>
        <Image src={post?.imageUrl} alt="Image" height={200} width={500} />
        <h2 className={`text-2xl dark:text-slate-800`}>{post?.title}</h2>
        <p className={`my-2 text-purple-800`}>
          {new Date(post?.publishedAt).toDateString()}
        </p>
        <div className="dark:text-gray-600 mb-4 line-clamp-2">
          <PortableText value={post.body} />
        </div>
      </Link>
    </div>
  );
};

export default PostComponent;

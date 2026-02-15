import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns" // Assure-toi d'avoir date-fns ou utilise JS natif
import { urlFor } from "@/sanity/lib/image"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  post: any
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={post.mainImage ? urlFor(post.mainImage).url() : "/placeholder.svg"}
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex gap-2 mb-3">
            {post.categories?.map((cat: string) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                </Badge>
            ))}
        </div>
        
        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Footer: Author & Date */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            {post.author?.image && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                 <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill className="object-cover"/>
              </div>
            )}
            <span className="text-xs font-medium">{post.author?.name || "Team"}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
          </span>
        </div>
      </div>
    </Link>
  )
}
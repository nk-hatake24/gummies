import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/sanity-blog"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "@/components/ui/button"
import  PageWrapper  from "@/components/shared/page-wrapper"





// Configuration du rendu du texte riche (H1, H2, Images dans le texte...)
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Post image"}
            fill
            className="object-cover"
          />
        </div>
      )
    }
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-serif mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-serif mt-8 mb-3">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg leading-relaxed text-muted-foreground mb-6">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-xl">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-6 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 mb-6 space-y-2">{children}</ol>,
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    description: post.excerpt, // Tu pourras rajouter un champ description dans Sanity pour le SEO
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <PageWrapper>
      
    <article className="min-h-screen bg-background pt-24 pb-20">
      
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
           <span className="flex items-center gap-2">
             <Calendar className="h-4 w-4" />
             {new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
           </span>
           <span className="flex items-center gap-2">
             <User className="h-4 w-4" />
             {post.author?.name}
           </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex gap-2 mb-8">
            {post.categories?.map((cat: string) => (
                <span key={cat} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                    {cat}
                </span>
            ))}
        </div>
      </div>

      {/* Main Image */}
      {post.mainImage && (
        <div className="w-full max-w-[1400px] mx-auto aspect-[21/9] relative mb-16 px-6 lg:px-12">
           <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
             <Image
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
             />
           </div>
        </div>
      )}

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={post.body} components={ptComponents} />
        </div>
        
        {/* Author Bio (Optional) */}
        {post.author && (
            <div className="mt-16 p-8 bg-muted/30 rounded-xl flex items-center gap-6 border border-border">
                {post.author.image && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                         <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill className="object-cover"/>
                    </div>
                )}
                <div>
                    <h4 className="font-bold text-lg">Written by {post.author.name}</h4>
                    {/* Si tu veux afficher la bio de l'auteur ici, il faudra aussi utiliser PortableText */}
                </div>
            </div>
        )}
      </div>

    </article>
    </PageWrapper>
  )
}
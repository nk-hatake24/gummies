
import { getBlogPosts } from "@/lib/sanity-blog"
import { BlogCard } from "@/components/blog/blog-card"
import  PageWrapper  from "@/components/shared/page-wrapper"

export const metadata = {
  title: "Blog | Vape Wholesale Insights & Industry News",
  description:
    "Read the latest vape wholesale news, guides, and industry insights. Stay ahead in disposable, THC & CBD vape markets.",

  alternates: {
    canonical: "/blog",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    title: "Blog | Vape Wholesale Insights & Industry News",
    description:
      "Latest vape wholesale news, guides, and industry updates.",
    siteName: "BULK VAPES",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog | Vape Wholesale Insights",
    description:
      "Guides, trends and insights about vape wholesale and disposable vapes.",
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <PageWrapper>
      <div className="min-h-screen bg-background pt-24 pb-20">
          
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
           <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
             Knowledge Base
           </p>
           <h1 className="font-serif text-4xl md:text-5xl mb-6">Latest Articles</h1>
           <p className="text-muted-foreground text-lg">
             Stay updated with the latest trends in the vaping industry, wholesale tips, and product guides.
           </p>
        </div>

        {/* Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No articles published yet.</p>
          </div>
        )}
      </div>
      </div>
    </PageWrapper>
  )
}
import type { Metadata } from "next"
import PageWrapper from "@/components/shared/page-wrapper"
import { getBlogPosts } from "@/lib/sanity-blog"
import { BlogCard } from "@/components/blog/blog-card"

export const metadata: Metadata = {
  title: "Blog | Gummies Guides, Wholesale Insights & Industry Updates | GUMMIESSHOP",
  description:
    "Read the latest gummies guides, wholesale insights, and industry updates. Tips on sourcing, ordering, and product education for THC & CBD gummies.",

  alternates: {
    canonical: "/blog",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://gummiesshop.us"}/blog`,
    title: "Blog | Gummies Guides, Wholesale Insights & Industry Updates",
    description: "Latest gummies guides, wholesale tips, and product education updates.",
    siteName: "GUMMIESSHOP",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog | Gummies Guides & Wholesale Insights | GUMMIESSHOP",
    description: "Guides, trends, and insights about gummies, sourcing, and wholesale buying.",
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
              Stay updated with gummies buying guides, wholesale tips, and product education—built for retailers and
              informed customers.
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
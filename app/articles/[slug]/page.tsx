import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

async function getArticle(slug: string) {
  const articlesDirectory = path.join(process.cwd(), 'content/articles/persona-based')
  const filePath = path.join(articlesDirectory, `${slug}.mdx`)
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      frontmatter: data,
      content: content
    }
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'content/articles/persona-based')
  const filenames = await fs.readdir(articlesDirectory)
  
  return filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      slug: filename.replace('.mdx', '')
    }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    notFound()
  }
  
  // Convert content to HTML with better markdown parsing
  const contentHtml = article.content
    .split('\n')
    .map((line) => {
      if (line.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold mb-6 mt-8 text-gray-900">${line.slice(2)}</h1>`
      }
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold mb-4 mt-6 text-gray-800">${line.slice(3)}</h2>`
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold mb-3 mt-4 text-gray-800">${line.slice(4)}</h3>`
      }
      if (line.startsWith('#### ')) {
        return `<h4 class="text-lg font-medium mb-2 mt-3 text-gray-700">${line.slice(5)}</h4>`
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return `<p class="font-bold mb-2 text-gray-900">${line.slice(2, -2)}</p>`
      }
      if (line.startsWith('- ')) {
        return `<li class="ml-6 mb-1 text-gray-700">• ${line.slice(2)}</li>`
      }
      if (line.includes('```')) {
        return `<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">${line.replace(/```/g, '')}</code></pre>`
      }
      if (line === '') {
        return '<div class="my-4"></div>'
      }
      return `<p class="mb-4 text-gray-700 leading-relaxed">${line}</p>`
    })
    .join('\n')
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/articles"
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
          >
            ← 記事一覧に戻る
          </Link>
        </div>
        
        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.frontmatter.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {article.frontmatter.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {article.frontmatter.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-gray-500 text-sm">
              {article.frontmatter.publishedAt} | {article.frontmatter.author}
            </div>
          </header>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
        
        <div className="mt-12 text-center">
          <Link 
            href="/articles"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            他の記事を見る
          </Link>
        </div>
      </div>
    </div>
  )
}
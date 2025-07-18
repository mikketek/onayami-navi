import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PersonaArticle {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  publishedAt: string
  personaNumber: number
  personaName: string
}

async function getPersonaArticles(): Promise<PersonaArticle[]> {
  const articlesDirectory = path.join(process.cwd(), 'content/articles/persona-based')
  const filenames = await fs.readdir(articlesDirectory)
  
  const articles = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const filePath = path.join(articlesDirectory, filename)
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        // Extract persona number and name from filename
        const match = filename.match(/persona-(\d+)-(.+)\.mdx/)
        const personaNumber = match ? parseInt(match[1]) : 0
        const personaName = match ? match[2] : ''
        
        return {
          slug: filename.replace('.mdx', ''),
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          tags: data.tags || [],
          publishedAt: data.publishedAt || '',
          personaNumber,
          personaName
        }
      })
  )
  
  // Sort by persona number
  return articles.sort((a, b) => a.personaNumber - b.personaNumber)
}

export default async function ArticlesPage() {
  const articles = await getPersonaArticles()
  
  // Group articles by age range
  const twenties = articles.filter(a => a.personaNumber >= 1 && a.personaNumber <= 11)
  const thirties = articles.filter(a => a.personaNumber >= 12 && a.personaNumber <= 21)
  const fortiesAndAbove = articles.filter(a => a.personaNumber >= 22 && a.personaNumber <= 30)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AIツールで解決する30人の悩み
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            年齢・職業・悩みが異なる30人のペルソナに寄り添い、
            AIツールを活用して実践的な解決策を提供します
          </p>
        </div>
        
        <div className="space-y-16">
          {/* 20代の悩み */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-md mr-3">20代</span>
              新しい挑戦と不安の世代
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {twenties.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      #{article.personaNumber}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
          {/* 30代の悩み */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-green-500 text-white px-3 py-1 rounded-md mr-3">30代</span>
              責任と葛藤の世代
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {thirties.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="text-sm text-green-600 font-semibold mb-2">
                      #{article.personaNumber}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
          {/* 40代以上の悩み */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-md mr-3">40代以上</span>
              人生の転換と新しい価値の世代
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fortiesAndAbove.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="text-sm text-purple-600 font-semibold mb-2">
                      #{article.personaNumber}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
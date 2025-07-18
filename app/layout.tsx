import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'お悩みナビ - AIツールで解決する30人の悩み',
  description: '20-30代ビジネスパーソンのための、AIツールを活用した悩み解決サイト。ChatGPT、Claude、Notion AIなどの実践的な使い方を紹介。',
  keywords: 'AI, ChatGPT, Claude, Notion AI, 悩み解決, ビジネス, 20代, 30代',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900">
                  お悩みナビ
                </Link>
              </div>
              <div className="flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  ホーム
                </Link>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900">
                  記事一覧
                </Link>
              </div>
            </div>
          </nav>
        </header>
        
        <main>{children}</main>
        
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold mb-4">お悩みナビ</h3>
                <p className="text-gray-300">
                  20-30代ビジネスパーソンのための、AIツールを活用した悩み解決サイト
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">記事カテゴリ</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>キャリア・転職</li>
                  <li>人間関係</li>
                  <li>健康・生活</li>
                  <li>将来設計</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">AIツール</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>ChatGPT</li>
                  <li>Claude</li>
                  <li>Notion AI</li>
                  <li>その他のAIツール</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 お悩みナビ. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
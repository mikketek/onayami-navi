import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            お悩みナビ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            20-30代ビジネスパーソンのための、AIツールを活用した悩み解決サイト
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-blue-500 text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">30人のペルソナ</h3>
            <p className="text-gray-600">
              様々な年齢・職業・悩みを持つ30人のリアルな体験談
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-green-500 text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3">AIツール活用</h3>
            <p className="text-gray-600">
              ChatGPT、Claude、Notion AIなどの実践的な使い方
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-purple-500 text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-3">実践的な解決策</h3>
            <p className="text-gray-600">
              今すぐ使える具体的なアクションプランを提供
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/articles"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            記事一覧を見る
          </Link>
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            こんな悩みを解決します
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">仕事・キャリア</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 転職を考えているが踏み切れない</li>
                <li>• 仕事にやりがいを感じられない</li>
                <li>• 人間関係で悩んでいる</li>
                <li>• スキルアップしたいが方法が分からない</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">プライベート</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 将来への不安が大きい</li>
                <li>• 健康管理ができていない</li>
                <li>• 恋愛・結婚について悩んでいる</li>
                <li>• 時間管理が上手くできない</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
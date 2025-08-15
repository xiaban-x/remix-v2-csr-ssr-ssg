import { useLoaderData, Link } from "react-router";

// 模拟静态数据生成
async function getStaticData() {
  // 模拟从 CMS 或数据库获取静态内容
  return {
    message: "这是在构建时预生成的静态内容",
    buildTime: new Date().toLocaleString('zh-CN'),
    articles: [
      {
        id: 1,
        title: "React Router 7 新特性介绍",
        excerpt: "探索 React Router 7 带来的全新功能和改进...",
        publishDate: "2024-01-15",
        readTime: "5 分钟",
        category: "技术"
      },
      {
        id: 2,
        title: "现代前端渲染策略对比",
        excerpt: "深入了解 CSR、SSR、SSG 等不同渲染方式的优缺点...",
        publishDate: "2024-01-10",
        readTime: "8 分钟",
        category: "架构"
      },
      {
        id: 3,
        title: "Web 性能优化最佳实践",
        excerpt: "从多个维度提升 Web 应用的性能表现...",
        publishDate: "2024-01-05",
        readTime: "12 分钟",
        category: "性能"
      },
      {
        id: 4,
        title: "TypeScript 在大型项目中的应用",
        excerpt: "如何在大型前端项目中有效使用 TypeScript...",
        publishDate: "2023-12-28",
        readTime: "10 分钟",
        category: "开发"
      }
    ],
    stats: {
      totalArticles: 156,
      totalViews: 89432,
      totalComments: 2341,
      avgReadTime: "7.5 分钟"
    }
  };
}

export async function loader() {
  const data = await getStaticData();
  
  return {
    ...data,
    generatedAt: new Date().toISOString(),
  };
}

export default function SSGPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首页
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SSG - 静态站点生成</h1>
                <p className="text-gray-600">Static Site Generation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">特点</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      构建时预生成静态 HTML
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      极快的页面加载速度
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      优秀的 SEO 表现
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      CDN 友好，易于缓存
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">构建信息</h3>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-gray-800 mb-2">{data.message}</p>
                    <p className="text-sm text-green-700">
                      构建时间: {data.buildTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      页面生成于: {new Date(data.generatedAt).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">网站统计</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">总文章数:</span>
                      <span className="font-bold text-blue-900">{data.stats.totalArticles}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">总浏览量:</span>
                      <span className="font-bold text-blue-900">{data.stats.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">总评论数:</span>
                      <span className="font-bold text-blue-900">{data.stats.totalComments.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">平均阅读:</span>
                      <span className="font-bold text-blue-900">{data.stats.avgReadTime}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">适用场景</h3>
                  <ul className="space-y-2 text-yellow-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      博客和文档网站
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      营销落地页
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      产品展示网站
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      内容更新不频繁的站点
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">静态内容示例</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.articles.map((article) => (
                <div key={article.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {article.publishDate}
                    </span>
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      阅读更多 →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                💡 这些内容在构建时就已经生成，无需服务器运行时处理。刷新页面不会改变构建时间，但会显示新的页面生成时间。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
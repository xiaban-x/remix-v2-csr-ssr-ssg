import { Link } from "react-router";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            React Router 渲染模式演示
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            探索不同的渲染策略：CSR、SSR、SSG 和缓存优化
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Link 
            to="/csr" 
            className="group bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 p-8 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">CSR</h2>
            <p className="text-gray-600">客户端渲染</p>
            <p className="text-sm text-gray-500 mt-2">在浏览器中动态渲染内容</p>
          </Link>
          
          <Link 
            to="/ssr" 
            className="group bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-400 p-8 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">SSR</h2>
            <p className="text-gray-600">服务端渲染</p>
            <p className="text-sm text-gray-500 mt-2">服务器预渲染 HTML</p>
          </Link>
          
          <Link 
            to="/ssg" 
            className="group bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 p-8 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">SSG</h2>
            <p className="text-gray-600">静态站点生成</p>
            <p className="text-sm text-gray-500 mt-2">构建时预生成静态页面</p>
          </Link>
          
          <Link 
            to="/cached" 
            className="group bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400 p-8 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">缓存优化</h2>
            <p className="text-gray-600">智能缓存</p>
            <p className="text-sm text-gray-500 mt-2">类似 ISR 的缓存策略</p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">关于渲染模式</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">CSR (Client-Side Rendering)</h4>
                <p className="text-gray-600 text-sm">JavaScript 在浏览器中动态生成内容，适合交互性强的应用。</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">SSR (Server-Side Rendering)</h4>
                <p className="text-gray-600 text-sm">服务器预渲染 HTML，提供更好的 SEO 和首屏加载性能。</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">SSG (Static Site Generation)</h4>
                <p className="text-gray-600 text-sm">构建时生成静态 HTML，提供最佳的性能和 CDN 缓存效果。</p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">缓存优化</h4>
                <p className="text-gray-600 text-sm">结合缓存策略，在性能和数据新鲜度之间找到平衡。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
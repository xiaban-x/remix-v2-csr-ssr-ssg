import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";

// 模拟服务器端数据获取
async function getServerData() {
  // 模拟数据库查询或 API 调用
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    message: "这是在服务器端预渲染的数据",
    timestamp: new Date().toLocaleString('zh-CN'),
    serverInfo: {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: Math.floor(process.uptime()),
    },
    randomData: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `服务器数据项 ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
    })),
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await getServerData();
  
  return {
    ...data,
    url: request.url,
    userAgent: request.headers.get("User-Agent") || "Unknown",
  };
}

export default function SSRPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首页
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SSR - 服务端渲染</h1>
                <p className="text-gray-600">Server-Side Rendering</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">特点</h3>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      服务器预渲染 HTML
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      更好的 SEO 支持
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      更快的首屏加载
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      服务器端数据获取
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">服务器信息</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Node.js 版本:</span>
                      <span className="font-mono text-blue-900">{data.serverInfo.nodeVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">平台:</span>
                      <span className="font-mono text-blue-900">{data.serverInfo.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">运行时间:</span>
                      <span className="font-mono text-blue-900">{data.serverInfo.uptime}秒</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">请求信息</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-700 block mb-1">请求 URL:</span>
                      <span className="font-mono text-sm text-gray-900 bg-white p-2 rounded border break-all">
                        {data.url}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-700 block mb-1">User Agent:</span>
                      <span className="font-mono text-sm text-gray-900 bg-white p-2 rounded border break-all">
                        {data.userAgent}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">服务器数据</h3>
                  <div className="bg-white p-4 rounded border mb-4">
                    <p className="text-gray-800 mb-2">{data.message}</p>
                    <p className="text-sm text-purple-700">
                      渲染时间: {data.timestamp}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-purple-900">随机数据列表:</h4>
                    {data.randomData.map((item) => (
                      <div key={item.id} className="bg-white p-3 rounded border flex justify-between items-center">
                        <span className="text-gray-800">{item.name}</span>
                        <span className="font-mono text-purple-600 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">适用场景</h3>
                  <ul className="space-y-2 text-yellow-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      需要 SEO 的页面
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      内容驱动的网站
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      电商产品页面
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      新闻文章页面
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">注意事项</h3>
                  <ul className="space-y-2 text-red-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      每次请求都会执行服务器代码
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      服务器负载相对较高
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      需要考虑缓存策略
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                💡 这个页面的所有数据都是在服务器端预渲染的，刷新页面可以看到时间戳和随机数据的变化
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
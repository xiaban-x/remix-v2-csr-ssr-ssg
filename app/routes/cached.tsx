import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link, useFetcher } from "react-router";

// 模拟缓存存储
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

// 模拟动态数据获取
async function getDynamicData() {
  // 模拟 API 调用延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    message: "这是带有智能缓存的动态内容",
    timestamp: new Date().toLocaleString('zh-CN'),
    randomId: Math.random().toString(36).substr(2, 9),
    weatherData: {
      city: "上海",
      temperature: Math.floor(Math.random() * 15) + 15, // 15-30度
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      condition: ["晴天", "多云", "小雨", "阴天"][Math.floor(Math.random() * 4)]
    },
    newsItems: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      title: `实时新闻 ${i + 1} - ${new Date().getHours()}:${new Date().getMinutes()}`,
      summary: `这是第 ${i + 1} 条新闻的摘要内容...`,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleString('zh-CN')
    }))
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get('refresh') === 'true';
  const cacheKey = 'cached-page-data';
  const cacheTTL = 30 * 1000; // 30秒缓存

  // 检查缓存
  const cached = cache.get(cacheKey);
  const now = Date.now();

  if (!forceRefresh && cached && (now - cached.timestamp) < cached.ttl) {
    // 返回缓存数据，并标记为来自缓存
    return {
      ...cached.data,
      fromCache: true,
      cacheAge: Math.floor((now - cached.timestamp) / 1000),
      nextRefresh: Math.ceil((cached.ttl - (now - cached.timestamp)) / 1000)
    };
  }

  // 获取新数据
  const freshData = await getDynamicData();
  
  // 更新缓存
  cache.set(cacheKey, {
    data: freshData,
    timestamp: now,
    ttl: cacheTTL
  });

  return {
    ...freshData,
    fromCache: false,
    cacheAge: 0,
    nextRefresh: cacheTTL / 1000
  };
}

export default function CachedPage() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const handleRefresh = () => {
    fetcher.load('/cached?refresh=true');
  };

  const handleNormalLoad = () => {
    fetcher.load('/cached');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-orange-600 hover:text-orange-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首页
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">缓存优化</h1>
                  <p className="text-gray-600">智能缓存策略 (类似 ISR)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {data.fromCache ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    来自缓存
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    新鲜数据
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">缓存策略特点</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      智能缓存管理 (30秒 TTL)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      按需重新验证数据
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      性能与新鲜度平衡
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      支持强制刷新
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">缓存状态</h3>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-gray-800 mb-2">{data.message}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">数据时间:</span>
                        <span className="block font-mono text-blue-900">{data.timestamp}</span>
                      </div>
                      <div>
                        <span className="text-blue-700">随机ID:</span>
                        <span className="block font-mono text-blue-900">{data.randomId}</span>
                      </div>
                      <div>
                        <span className="text-blue-700">缓存年龄:</span>
                        <span className="block font-mono text-blue-900">{data.cacheAge}秒</span>
                      </div>
                      <div>
                        <span className="text-blue-700">下次刷新:</span>
                        <span className="block font-mono text-blue-900">{data.nextRefresh}秒后</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">实时天气</h3>
                  <div className="bg-white p-4 rounded border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{data.weatherData.city}</h4>
                        <p className="text-2xl font-bold text-green-600">{data.weatherData.temperature}°C</p>
                        <p className="text-gray-600">{data.weatherData.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">湿度</p>
                        <p className="text-lg font-semibold text-gray-900">{data.weatherData.humidity}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">操作面板</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={handleNormalLoad}
                      disabled={fetcher.state !== 'idle'}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                      {fetcher.state !== 'idle' ? '加载中...' : '正常加载 (使用缓存)'}
                    </button>
                    
                    <button 
                      onClick={handleRefresh}
                      disabled={fetcher.state !== 'idle'}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      {fetcher.state !== 'idle' ? '刷新中...' : '强制刷新 (跳过缓存)'}
                    </button>
                    
                    <Link 
                      to="/cached"
                      className="block w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-center transition-colors"
                    >
                      页面刷新
                    </Link>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">适用场景</h3>
                  <ul className="space-y-2 text-yellow-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      新闻资讯网站
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      电商产品页面
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      社交媒体动态
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      数据仪表板
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">实时新闻</h2>
            
            <div className="space-y-4">
              {data.newsItems.map((item:{
                id:number
                title:string
                summary:string
                timestamp:string
              }) => (
                <div key={item.id} className="border-l-4 border-orange-500 pl-4 py-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.summary}</p>
                  <p className="text-xs text-gray-500">{item.timestamp}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                💡 这个页面演示了智能缓存策略：数据在30秒内会被缓存，超过30秒后会自动获取新数据。
                你可以使用上面的按钮测试不同的加载方式。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
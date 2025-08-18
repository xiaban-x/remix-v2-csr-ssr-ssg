import { type LoaderFunctionArgs } from "react-router";

// 简单的缓存演示
let cacheData: { data: any; timestamp: number } | null = null;
let cacheTimer = 0;

async function getData() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    message: "这是动态数据",
    timestamp: new Date().toLocaleString('zh-CN'),
    randomId: Math.random().toString(36).substr(2, 9)
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get('refresh') === 'true';
  const now = Date.now();
  
  // 缓存10秒
  const cacheTTL = 10 * 1000;
  
  if (!forceRefresh && cacheData && (now - cacheData.timestamp) < cacheTTL) {
    return {
      ...cacheData.data,
      fromCache: true,
      cacheAge: Math.floor((now - cacheData.timestamp) / 1000),
      nextRefresh: Math.ceil((cacheTTL - (now - cacheData.timestamp)) / 1000)
    };
  }
  
  // 获取新数据
  const freshData = await getData();
  cacheData = { data: freshData, timestamp: now };
  
  return {
    ...freshData,
    fromCache: false,
    cacheAge: 0,
    nextRefresh: cacheTTL / 1000
  };
}

export default function SimpleCached({ data }: { data: any }) {
  return (
    <div className="min-h-screen bg-orange-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">缓存演示</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">数据状态</h2>
            <span className={`px-3 py-1 rounded text-sm ${
              data.fromCache ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {data.fromCache ? '来自缓存' : '新鲜数据'}
            </span>
          </div>
          
          <div className="space-y-2">
            <p><strong>消息:</strong> {data.message}</p>
            <p><strong>时间:</strong> {data.timestamp}</p>
            <p><strong>随机ID:</strong> {data.randomId}</p>
            <p><strong>缓存年龄:</strong> {data.cacheAge}秒</p>
            <p><strong>下次刷新:</strong> {data.nextRefresh}秒后</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">测试链接</h2>
          <div className="space-y-3">
            <a 
              href="/simple-cached" 
              className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
            >
              正常加载
            </a>
            <a 
              href="/simple-cached?refresh=true" 
              className="block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-center"
            >
              强制刷新
            </a>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <p className="text-sm text-yellow-800">
              💡 等待10秒后再次访问，你会看到数据来自缓存
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";

interface ApiData {
  message: string;
  timestamp: string;
  randomData: string;
}

// CSR 数据获取示例
export default function TestPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 测试 CSR 数据加载
    fetch("/api/data")
      .then(res => res.json())
      .then((data: ApiData) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("数据加载失败:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">CSR 测试页面</h1>
        
        {data && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">数据加载成功！</h2>
            <div className="space-y-2">
              <p><strong>消息:</strong> {data.message}</p>
              <p><strong>时间:</strong> {data.timestamp}</p>
              <p><strong>随机数据:</strong> {data.randomData}</p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">CSR 特点</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 客户端动态渲染</li>
              <li>• 无需服务器交互</li>
              <li>• 适合交互性强的应用</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded">
            <h3 className="font-semibold text-green-900 mb-2">测试说明</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 数据通过 fetch 获取</li>
              <li>• 页面完全在客户端渲染</li>
              <li>• 查看网络标签页验证</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
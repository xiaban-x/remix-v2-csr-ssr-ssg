import { useState, useEffect } from "react";

export default function SimpleCSR() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(`数据加载成功 - ${new Date().toLocaleTimeString('zh-CN')}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">简单 CSR 演示</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">计数器测试</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCount(prev => prev - 1)} 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button 
              onClick={() => setCount(prev => prev + 1)} 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">数据获取测试</h2>
          <button 
            onClick={fetchData} 
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
          >
            {loading ? '加载中...' : '获取数据'}
          </button>
          {data && (
            <div className="p-4 bg-gray-100 rounded">
              <p className="text-gray-800">{data}</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded">
          <p className="text-sm text-yellow-800">
            💡 点击按钮测试交互性 - 所有操作都在客户端完成
          </p>
        </div>
      </div>
    </div>
  );
}
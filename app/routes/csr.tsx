// 推荐路径: app/routes/csr-demo.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router";

// 模拟 API 数据获取
const fetchData = async (): Promise<{ message: string; timestamp: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟
  return {
    message: "这是纯客户端 JavaScript 获取的数据",
    timestamp: new Date().toLocaleString('zh-CN')
  };
};

export default function CSRPage() {
  const [data, setData] = useState<{ message: string; timestamp: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // CSR 核心：客户端数据获取
  useEffect(() => {
    let cancelled = false;
    
    const loadData = async () => {
      if (!cancelled) {
        setLoading(true);
        const result = await fetchData();
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRefetch = () => {
    setLoading(true);
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  };

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              {/* SVG Icon */}
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              返回首页
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              {/* Header Icon & Title */}
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CSR - 客户端渲染 (演示)</h1>
                <p className="text-gray-600">Client-Side Rendering</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ... 左侧的静态内容和计数器部分 ... */}
              <div className="space-y-6">
                 {/* ... 特点 ... */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">交互演示</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">计数器：</span>
                      <div className="flex items-center space-x-3">
                        <button onClick={() => setCount(prev => prev - 1)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors" type="button">-</button>
                        <span className="text-xl font-bold text-gray-900 min-w-[3rem] text-center">{count}</span>
                        <button onClick={() => setCount(prev => prev + 1)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors" type="button">+</button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">这个计数器完全在客户端运行，无需服务器交互</p>
                  </div>
                </div>
              </div>

              {/* 右侧的动态数据部分 */}
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">动态数据</h3>
                  {loading ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                      <span className="text-green-800">正在加载数据...</span>
                    </div>
                  ) : data ? (
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded border"><p className="text-gray-800">{data.message}</p></div>
                      <p className="text-sm text-green-700">获取时间: {data.timestamp}</p>
                      <button onClick={handleRefetch} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors" type="button">重新获取数据</button>
                    </div>
                  ) : null}
                </div>
                {/* ... 适用场景部分 ... */}
              </div>
            </div>
            {/* ... Footer ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
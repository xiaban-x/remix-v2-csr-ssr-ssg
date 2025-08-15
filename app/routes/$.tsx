import { type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  // 处理 favicon.ico 请求
  if (url.pathname === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }
  
  // 处理其他静态文件请求
  if (url.pathname.startsWith("/.well-known/") || 
      url.pathname.endsWith(".ico") || 
      url.pathname.endsWith(".png") || 
      url.pathname.endsWith(".jpg") || 
      url.pathname.endsWith(".svg")) {
    return new Response(null, { status: 404 });
  }
  
  // 对于其他未匹配的路由，返回 404 页面
  throw new Response("Not Found", { status: 404 });
}

export default function CatchAll() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">页面未找到</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
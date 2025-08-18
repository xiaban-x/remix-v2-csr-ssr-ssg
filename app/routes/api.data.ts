export async function loader() {
  return new Response(JSON.stringify({
    message: "这是来自 API 的数据",
    timestamp: new Date().toLocaleString('zh-CN'),
    randomData: Math.random().toString(36).substr(2, 9)
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
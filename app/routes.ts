import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("csr", "routes/csr.tsx"),
  route("ssr", "routes/ssr.tsx"),
  route("ssg", "routes/ssg.tsx"),
  route("cached", "routes/cached.tsx"),
  route("test", "routes/test.tsx"),
  route("api/data", "routes/api.data.ts"),
  route("simple-csr", "routes/simple-csr.tsx"),
  route("simple-cached", "routes/simple-cached.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;

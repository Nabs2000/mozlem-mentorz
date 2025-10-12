import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("user:professionalId", "routes/professionalPage.tsx"),
  route("user:clientId", "routes/clientPage.tsx"),
] satisfies RouteConfig;

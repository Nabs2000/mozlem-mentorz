import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("user:professionalId", "routes/professionalPage.tsx"),
  route("user:clientId", "routes/clientPage.tsx"),
  route("register", "routes/register.tsx"),
] satisfies RouteConfig;

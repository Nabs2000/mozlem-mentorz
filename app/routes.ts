import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("professional/:professionalId", "routes/professionalPage.tsx"),
  route("client/:clientId", "routes/clientPage.tsx"),
  route("register", "routes/register.tsx"),
] satisfies RouteConfig;

import type { Route } from "./+types/clientPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function ClientPage() {
    return <div>Client Page</div>;
}
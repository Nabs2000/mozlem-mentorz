import type { Route } from "./+types/professionalPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function ProfessionalPage() {
  return <div>Professional Page</div>;
}

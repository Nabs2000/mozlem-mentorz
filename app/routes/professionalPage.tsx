import type { Route } from "./+types/professionalPage";
import { getDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { Professional } from "~/types/professional.types";

const db = getFirestore();

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Professional Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const { professionalId } = params;
    const userDoc = await getDoc(doc(db, "professionals", professionalId));
    if (!userDoc.exists()) {
        throw new Response("User not found", { status: 404 });
    }
    return userDoc.data();
}

export default function ProfessionalPage({ loaderData }: {loaderData: Professional}) {
    return <div>Hello {loaderData.firstName}!</div>;
}

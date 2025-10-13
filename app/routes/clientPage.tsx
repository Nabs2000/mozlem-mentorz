import ReferralForm from "~/components/referralForm";
import type { Route } from "./+types/clientPage";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import type { Client } from "~/types/client.types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const userId = params.clientId;
  const db = getFirestore();
  const docRef = doc(db, "clients", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } else {
    console.log("No such document!");
  }
}

export default function ClientPage({ loaderData }: { loaderData: Client }) {
  return <div>
    Hello {loaderData.firstName}!
    <ReferralForm client={loaderData} />
  </div>;
}

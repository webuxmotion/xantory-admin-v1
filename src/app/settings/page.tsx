import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const resp = await fetch("http://localhost:3000/api/whoAmI", {
    method: "GET",
    headers: headers()
  }).then((res) => res.json());

  return <div>Settings. Name: {resp?.name}</div>;
};

export default Settings;

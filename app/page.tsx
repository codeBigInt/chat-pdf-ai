import { auth } from "@clerk/nextjs/server";
import LandingPage from "./custom-components/LandingPage";
import { redirect } from "next/navigation";
import Loader from "./custom-components/Loader";

export default async function Home() {
  const { sessionId, userId } = await auth()
  if (userId && sessionId) {
    return redirect("/dashboard");
  }
  return (
    userId && sessionId ? <Loader /> : <LandingPage />
  );
}

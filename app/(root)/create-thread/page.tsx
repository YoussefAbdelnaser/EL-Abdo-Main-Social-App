import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import TellAbdo from "@/components/forms/TellAbdo";

async function Page() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Tell Abdo</h1>

      <TellAbdo userId={userInfo._id} />
    </>
  );
}

export default Page;

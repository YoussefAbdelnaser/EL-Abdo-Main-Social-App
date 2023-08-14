import AbdoCard from "@/components/cards/AbdoCard";
import Comment from "@/components/forms/Comment";
import { fetchPostById } from "@/lib/actions/abdo.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo.onboarded) redirect("/onboarding");

  const abdo = await fetchPostById(params.id);

  return (
    <section className="relative">
      <div>
        <AbdoCard
          key={abdo.id}
          id={abdo.id}
          currentUserId={user?.id || ""}
          parentId={abdo.parentId}
          content={abdo.text}
          author={abdo.author}
          community={abdo.community}
          createdAt={abdo.createdAt}
          comments={abdo.children}
        />
      </div>
      <div className="mt-7">
        <Comment />
      </div>
    </section>
  );
};

export default Page;

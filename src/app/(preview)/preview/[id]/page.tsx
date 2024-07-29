import { Link } from "@/interfaces/link.interface";
import { User } from "@/interfaces/user.interface";
import { fetchUserData, fetchUserLinks } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PreviewComp from "../components/PreviewComp";
import PreviewHeader from "../components/PreviewHeader";

interface IPreview {
  params: { id: string };
}

export const generateMetadata = async ({
  params,
}: IPreview): Promise<Metadata> => {
  const uid = params.id;
  const user = (await fetchUserData(uid)) as User;

  return {
    title: user?.displayName,
    // description: user?.description,
    alternates: {
      canonical: `/preview/${user?.uid}`,
    },
    openGraph: {
      title: user?.displayName || "",
      // description: user?.description,
      images: [user?.photoURL || ""],
    },
  };
};

const PreviewPage = async ({ params }: IPreview) => {
  const user = (await fetchUserData(params.id)) as User as any;
  const links = (await fetchUserLinks(params.id)) as Link[];

  if (!user) {
    notFound();
  }

  return (
    <div className="w-full">
      <PreviewHeader user={user} />

      <div className="py-[60px] container mx-auto px-2">
        <PreviewComp user={user} links={links} />
      </div>
    </div>
  );
};

export default PreviewPage;

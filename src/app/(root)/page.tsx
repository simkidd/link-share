import PageHeader from "@/components/PageHeader";
import LinkList from "./components/LinkList";

const Home = () => {
  return (
    <div className="w-full py-10">
      <div className="w-full lg:px-10 md:px-6 px-4">
        <PageHeader
          title="Customize Your Links"
          desc="Add/edit/remove links below and then share all your profiles with the
          world!"
        />
      </div>
      <LinkList />
    </div>
  );
};

export default Home;

import Button from "@/components/ui/Button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto px-2">
        <Link href="/editor">
          <Button>Customize your links</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

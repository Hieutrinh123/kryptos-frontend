import Image from "next/image";
import FullLayout from "@/layouts/FullLayout";
import mainThumbnail from "#/assets/main-thumbnail.avif";

export default function Home() {
  return (
    <FullLayout>
      <Image src={mainThumbnail} alt="Thumbnail" layout="responsive" />
    </FullLayout>
  );
}

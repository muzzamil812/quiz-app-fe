import { Suspense } from "react";
import Stack from "./Stack";
import Loading from "@/app/components/Loading";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

async function page({ params }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <Stack params={params} />
    </Suspense>
  )
}

export default page
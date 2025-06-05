import { Suspense } from "react";
import Stacks from "./Stacks";
import Loading from "./components/Loading";

export default function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <Stacks />
    </Suspense>
  );
}

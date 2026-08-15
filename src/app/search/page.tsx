import React, { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <SearchClient />
    </Suspense>
  );
}

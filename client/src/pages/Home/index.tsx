import React from "react";
import {
  Banner,
  DisplayCatOne,
  DisplayCatTwo,
  TopPicks,
  HotspotBanner,
} from "../../components";

export default function Home() {
  return (
    <>
      <Banner />
      <DisplayCatOne />
      <DisplayCatTwo />
      <TopPicks />
      <HotspotBanner />
    </>
  );
}

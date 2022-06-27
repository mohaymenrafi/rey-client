import React from "react";
import {
  Banner,
  DisplayCatOne,
  DisplayCatTwo,
  TopPicks,
  HotspotBanner,
  Logos,
} from "../../components";

export default function Home() {
  return (
    <>
      <Banner />
      <DisplayCatOne />
      <DisplayCatTwo />
      <TopPicks />
      <HotspotBanner />
      <Logos />
    </>
  );
}

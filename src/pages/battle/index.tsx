import NftDetails from "@/components/nft/nft-details";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next/types";
import { useEffect, useMemo, useState } from "react";
import { nftData } from "@/data/static/single-nft";
import DashboardLayout from "@/layouts/_dashboard";

import { isBrowser } from "../_app";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

function Battle() {
  const [series, setSeries] = useState<number[]>([]);

  const wsInstance = useMemo(
    () =>
      isBrowser
        ? new WebSocket(
            "wss://ws.coincap.io/prices?assets=bitcoin",
            "websocket"
          )
        : null,
    []
  );

  useEffect(() => {
    if (wsInstance) {
      wsInstance.onopen = (event) => {
        console.log("connected");
      };

      wsInstance.onmessage = (event) => {
        let parsedPrice = JSON.parse(event.data);
        let price = parseFloat(parsedPrice.bitcoin);
        setSeries((currSeries) => currSeries.concat(price));
      };
    }
  }, []);

  return (
    <>
      <NextSeo
        title="NFT details"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <NftDetails product={nftData} />
    </>
  );
}

Battle.getLayout = function getLayout(page) {
  return <DashboardLayout contentClassName="!pb-0">{page}</DashboardLayout>;
};

export default Battle;

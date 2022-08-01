import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { isBrowser } from "../_app";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
    <div className="h-screen bg-background p-20 px-40 ">
      <div className="p-4 bg-white rounded-sm border border-gray-200 shadow-md dark:bg-primary dark:border-gray-700 w-full  flex-row flex">
        <div className="flex-col ">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            BITCOIN PRICE
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.sdsdsdsdsd
          </p>
        </div>

        <div className="flex-col">
          <span>Dasasasas</span>
        </div>
      </div>

      <div className="flex">
        <Chart
          series={[
            {
              name: "series-1",
              data: series,
            },
          ]}
          options={{
            chart: {
              id: "basic-line",
            },
            stroke: {
              curve: "smooth",
            },
          }}
          type="line"
        />
      </div>
    </div>
  );
}

export default Battle;

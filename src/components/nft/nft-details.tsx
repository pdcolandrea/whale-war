import cn from "classnames";
import { StaticImageData } from "next/image";
import ParamTab, { TabPanel } from "@/components/ui/param-tab";
import Image from "@/components/ui/image";
import FeaturedCard from "@/components/nft/featured-card";
import ListCard from "@/components/ui/list-card";
import AuctionCountdown from "@/components/nft/auction-countdown";
import AnchorLink from "@/components/ui/links/anchor-link";
import Button from "@/components/ui/button";
import { ArrowLinkIcon } from "@/components/icons/arrow-link-icon";
import { DotsIcon } from "@/components/icons/dots-icon";
import Avatar1 from "@/assets/images/avatar/3.png";
import { useModal } from "@/components/modal-views/context";
import { nftData } from "@/data/static/single-nft";
import NftDropDown from "./nft-dropdown";
import Avatar from "@/components/ui/avatar";
import { SwapIcon } from "../icons/swap-icon";
import CoinInput from "../ui/coin-input";
import Trade from "../ui/trade";
import TransactionInfo from "../ui/transaction-info";
import { useState } from "react";

interface NftFooterProps {
  className?: string;
  currentBid: any;
  auctionTime: Date | string | number;
  isAuction?: boolean;
  price?: number;
}

function NftFooter({
  className = "md:hidden",
  currentBid,
  auctionTime,
  isAuction,
  price,
}: NftFooterProps) {
  const { openModal } = useModal();
  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2",
        className
      )}
    >
      <div className="-mx-4 border-t-2 border-gray-900 px-4 pt-4 pb-5 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pt-6 lg:pb-7">
        {isAuction && (
          <div className="flex gap-4 pb-3.5 md:pb-4 xl:gap-5">
            <div className="block w-1/2 shrink-0 md:w-2/5">
              <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
                Current bid <span className="md:hidden">by</span>{" "}
                <AnchorLink
                  href={currentBid?.authorSlug ?? "#"}
                  className="normal-case text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
                >
                  @{currentBid?.name}
                </AnchorLink>
              </h3>
              <div className="text-lg font-medium -tracking-wider md:text-xl xl:text-2xl">
                {currentBid?.amount} ETH
              </div>
              <AnchorLink
                href={currentBid?.authorSlug ?? "#"}
                className="mt-2 hidden items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:inline-flex"
              >
                <div className="h-6 w-6 rounded-full ltr:mr-2 rtl:ml-2">
                  <Image src={Avatar1} alt="avatar" width={24} height={24} />
                </div>
                @{currentBid?.name}
              </AnchorLink>
            </div>
            <div className="block w-1/2 shrink-0 md:w-3/5">
              <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
                Auction ends in
              </h3>
              <AuctionCountdown date={auctionTime} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button shape="rounded">
            {isAuction ? "PLACE A BID" : `BUY FOR ${price} ETH`}
          </Button>
          <Button
            shape="rounded"
            variant="solid"
            color="gray"
            className="dark:bg-gray-800"
            onClick={() => openModal("SHARE_VIEW")}
          >
            SHARE
          </Button>
        </div>
      </div>
    </div>
  );
}

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};
type NftDetailsProps = {
  isAuction?: boolean;
  image: StaticImageData;
  name: string;
  description: string;
  minted_date: string;
  minted_slug: string;
  price: number;
  creator: Avatar;
  collection: Avatar;
  owner: Avatar;
  block_chains: Avatar[];
};

export default function NftDetails({ product }: { product: NftDetailsProps }) {
  let [toggleCoin, setToggleCoin] = useState(false);

  const {
    isAuction,
    image,
    name,
    description,
    minted_date,
    minted_slug,
    price,
    creator,
    collection,
    owner,
    block_chains,
  } = product;
  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 rtl:md:pr-6 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full overflow-hidden rounded-lg"></div>
          </div>
        </div>

        <div className="relative flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
          <Trade>
            <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
              <div
                className={cn(
                  "relative flex gap-3",
                  toggleCoin ? "flex-col-reverse" : "flex-col"
                )}
              >
                <CoinInput
                  label={"From"}
                  exchangeRate={0.0}
                  defaultCoinIndex={0}
                  getCoinValue={(data) => console.log("From coin value:", data)}
                />
                <div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-white shadow-large dark:bg-gray-600">
                  <Button
                    size="mini"
                    color="gray"
                    shape="circle"
                    variant="transparent"
                    onClick={() => setToggleCoin(!toggleCoin)}
                  >
                    <SwapIcon className="h-auto w-3" />
                  </Button>
                </div>
                <CoinInput
                  label={"To"}
                  exchangeRate={0.0}
                  defaultCoinIndex={1}
                  getCoinValue={(data) => console.log("To coin value:", data)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 xs:gap-[18px]">
              <TransactionInfo label={"Min. Received"} />
              <TransactionInfo label={"Rate"} />
              <TransactionInfo label={"Offered by"} />
              <TransactionInfo label={"Price Slippage"} value={"1%"} />
              <TransactionInfo label={"Network Fee"} />
              <TransactionInfo label={"Criptic Fee"} />
            </div>
            <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
            >
              SWAP
            </Button>
          </Trade>
        </div>
      </div>
    </div>
  );
}

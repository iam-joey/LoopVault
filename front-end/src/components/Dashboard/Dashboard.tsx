"use client";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const mockFunds = [
  {
    id: 1,
    name: "DeFi Yield Fund",
    description: "High-yield farming across multiple DeFi protocols",
    target: 1000000,
    raised: 750000,
    investors: 1250,
    apy: 12.5,
  },
  {
    id: 2,
    name: "NFT Collector's Fund",
    description: "Curated collection of rare and valuable NFTs",
    target: 500000,
    raised: 320000,
    investors: 890,
    apy: 8.7,
  },
  {
    id: 3,
    name: "Crypto Blue Chips",
    description: "Portfolio of top 10 cryptocurrencies by market cap",
    target: 2000000,
    raised: 1800000,
    investors: 3200,
    apy: 15.2,
  },
  {
    id: 4,
    name: "Web3 Startup Fund",
    description: "Investing in promising Web3 startups and protocols",
    target: 5000000,
    raised: 2100000,
    investors: 450,
    apy: 22.8,
  },
];

export default function Dashboard() {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"></h1>
        <Button
          onClick={() => {
            console.log("clicked");
            router.push("/createfund");
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Create Fund
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFunds.map((fund) => (
          <Card
            key={fund.id}
            className="cursor-pointer"
            onClick={() => {
              router.push("/fund/asdasd");
            }}
          >
            <CardHeader>
              <CardTitle>{fund.name}</CardTitle>
              <CardDescription>{fund.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={(fund.raised / fund.target) * 100} />
                <div className="text-sm text-muted-foreground">
                  ${fund.raised.toLocaleString()} raised of $
                  {fund.target.toLocaleString()} target
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm">
                <span className="font-semibold">{fund.investors}</span>{" "}
                investors
              </div>
              <div className="text-sm">
                <span className="font-semibold">{fund.apy}%</span> APY
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

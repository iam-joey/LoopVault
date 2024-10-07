"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fundDetails = {
  id: "1",
  name: "Example Fund",
  contributionAmount: 1000,
  cycleDuration: 30,
  totalCycles: 6,
  collateralRequirement: 500,
  maxParticipants: 50,
  currentParticipants: 25,
  disbursementSchedule: ["100", "200", "300", "400", "500", "600"],
};

export default function Fund() {
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinFund = () => {
    setIsJoined(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {fundDetails.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Contribution Amount</h3>
              <p>${fundDetails.contributionAmount}</p>
            </div>
            <div>
              <h3 className="font-semibold">Cycle Duration</h3>
              <p>{fundDetails.cycleDuration} days</p>
            </div>
            <div>
              <h3 className="font-semibold">Total Cycles</h3>
              <p>{fundDetails.totalCycles}</p>
            </div>
            <div>
              <h3 className="font-semibold">Collateral Requirement</h3>
              <p>${fundDetails.collateralRequirement}</p>
            </div>
            <div>
              <h3 className="font-semibold">Max Participants</h3>
              <p>{fundDetails.maxParticipants}</p>
            </div>
            <div>
              <h3 className="font-semibold">Current Participants</h3>
              <p>{fundDetails.currentParticipants}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Participants Progress</h3>
            <Progress
              value={
                (fundDetails.currentParticipants /
                  fundDetails.maxParticipants) *
                100
              }
              className="w-full"
            />
            <p className="text-sm mt-1">
              {fundDetails.currentParticipants} / {fundDetails.maxParticipants}{" "}
              participants
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Disbursement Schedule</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {fundDetails.disbursementSchedule.map((amount, index) => (
                <div key={index} className="bg-secondary p-2 rounded">
                  <p className="text-sm font-medium">Month {index + 1}</p>
                  <p>${amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Dashboard
            </Button>
            <Button onClick={handleJoinFund} disabled={isJoined}>
              {isJoined ? "Joined" : "Join Fund"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

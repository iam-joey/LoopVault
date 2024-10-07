"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function CreateFund() {
  const router = useRouter();
  const [maxParticipants, setMaxParticipants] = useState<number>(6);
  const [totalCycles, setTotalCycles] = useState<number>(6);
  const [disbursementSchedule, setDisbursementSchedule] = useState<string[]>(
    Array(6).fill("")
  );

  useEffect(() => {
    setDisbursementSchedule(Array(totalCycles).fill(""));
    setMaxParticipants(totalCycles);
  }, [totalCycles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with max participants:", maxParticipants);
    console.log("Disbursement schedule:", disbursementSchedule);
    router.push("/"); // Navigate back to dashboard after submission
  };

  const handleSliderChange = (value: number[]) => {
    setMaxParticipants(value[0]);
  };

  const handleDisbursementChange = (index: number, value: string) => {
    const newSchedule = [...disbursementSchedule];
    newSchedule[index] = value;
    setDisbursementSchedule(newSchedule);
  };

  const handleTotalCyclesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTotalCycles(value);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Fund</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contribution_amount">Contribution Amount</Label>
              <Input
                id="contribution_amount"
                type="number"
                placeholder="Enter contribution amount"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle_duration">Cycle Duration (in days)</Label>
              <Input
                id="cycle_duration"
                type="number"
                placeholder="Enter cycle duration"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_cycles">Total Cycles</Label>
              <Input
                id="total_cycles"
                type="number"
                placeholder="Enter total cycles"
                value={totalCycles}
                onChange={handleTotalCyclesChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collateral_requirement">
                Collateral Requirement
              </Label>
              <Input
                id="collateral_requirement"
                type="number"
                placeholder="Enter collateral requirement"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_participants">Max Participants</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="max_participants"
                  min={1}
                  max={totalCycles}
                  step={1}
                  value={[maxParticipants]}
                  onValueChange={handleSliderChange}
                  className="flex-grow"
                />
                <span className="w-12 text-center">{maxParticipants}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Disbursement Schedule</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {disbursementSchedule.map((schedule, index) => (
                  <Input
                    key={index}
                    value={schedule}
                    onChange={(e) =>
                      handleDisbursementChange(index, e.target.value)
                    }
                    placeholder={`month ${index + 1} `}
                    required
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button type="submit">Create Fund</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

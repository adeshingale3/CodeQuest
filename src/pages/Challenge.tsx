
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const Challenge = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    toast({
      title: "Code submitted!",
      description: "Your solution has been submitted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40}>
            <div className="h-full p-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">Two Sum</h1>
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold mb-2">Problem Description</h3>
                  <p className="text-sm text-muted-foreground">
                    Given an array of integers nums and an integer target, return
                    indices of the two numbers such that they add up to target. You
                    may assume that each input would have exactly one solution, and
                    you may not use the same element twice.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold mb-2">Example</h3>
                  <pre className="text-sm">
                    Input: nums = [2,7,11,15], target = 9{"\n"}
                    Output: [0,1]{"\n"}
                    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                  </pre>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={60}>
            <div className="h-full p-6">
              <div className="h-[calc(100vh-180px)] flex flex-col">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 p-4 bg-muted rounded-lg font-mono text-sm resize-none focus:outline-none"
                  placeholder="Write your solution here..."
                />
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSubmit}>Submit Solution</Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Challenge;

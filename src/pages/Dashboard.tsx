
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const challenges = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    points: 100,
    description: "Find two numbers in an array that add up to a target sum.",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Medium",
    category: "Stacks",
    points: 200,
    description: "Determine if the input string has valid parentheses ordering.",
  },
  {
    id: 3,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked Lists",
    points: 300,
    description: "Merge k sorted linked lists into one sorted linked list.",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "outline";
      case "Medium":
        return "secondary";
      case "Hard":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Coding Challenges</h1>
            <p className="text-muted-foreground mt-2">
              Test your skills with our collection of programming challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="code-challenge-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{challenge.title}</CardTitle>
                    <Badge variant={getDifficultyVariant(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{challenge.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {challenge.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {challenge.points} points
                    </span>
                    <Button
                      onClick={() => navigate(`/challenge/${challenge.id}`)}
                    >
                      Solve Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

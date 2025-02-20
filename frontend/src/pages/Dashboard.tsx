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
import { useUser } from '@/contexts/UserContext';

export const challenges = [
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
  {
    id: 4,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Strings",
    points: 75,
    description: "Determine if a string is a palindrome, considering only alphanumeric characters and ignoring case.",
  },
  {
    id: 5,
    title: "Single Number",
    difficulty: "Easy",
    category: "Arrays",
    points: 75,
    description: "Find the number that appears only once in an array where all other numbers appear twice.",
  },
  {
    id: 6,
    title: "Maximum Subarray",
    difficulty: "Easy",
    category: "Arrays",
    points: 100,
    description: "Find the contiguous subarray with the largest sum within an array of integers.",
  },
  {
    id: 7,
    title: "First Unique Character",
    difficulty: "Easy",
    category: "Strings",
    points: 75,
    description: "Find the first non-repeating character in a string and return its index.",
  },
  {
    id: 8,
    title: "Power of Two",
    difficulty: "Easy",
    category: "Math",
    points: 50,
    description: "Determine if a given integer is a power of two.",
  },
  {
    id: 9,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    points: 100,
    description: "Determine if a string of parentheses, brackets, and curly braces is valid.",
  },
  {
    id: 10,
    title: "Missing Number",
    difficulty: "Easy",
    category: "Arrays",
    points: 75,
    description: "Find the missing number in an array containing n distinct numbers taken from 0 to n.",
  },
  {
    id: 11,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Searching",
    points: 100,
    description: "Implement binary search to find a target value in a sorted array.",
  },
  {
    id: 12,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    points: 100,
    description: "Count the number of ways to climb n stairs, taking either 1 or 2 steps at a time.",
  },
  {
    id: 15,
    title: "Merge Sorted Arrays",
    difficulty: "Easy",
    category: "Arrays",
    points: 100,
    description: "Merge two sorted arrays into a single sorted array.",
  }
];

const Dashboard = () => {
  const { user, updateUserPoints } = useUser();
  const navigate = useNavigate();

  const handleChallengeComplete = async (challengeId: number, points: number) => {
    await updateUserPoints(points);
    // Navigate to the challenge page
    navigate(`/challenge/${challengeId}`);
  };

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
                      onClick={() => handleChallengeComplete(challenge.id, challenge.points)}
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


import { Navbar } from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    username: "AlgorithmAce",
    points: 3200,
    solved: 45,
    avatarUrl: "",
  },
  {
    rank: 2,
    username: "CodeNinja",
    points: 2800,
    solved: 40,
    avatarUrl: "",
  },
  {
    rank: 3,
    username: "ByteMaster",
    points: 2600,
    solved: 38,
    avatarUrl: "",
  },
  {
    rank: 4,
    username: "DataWizard",
    points: 2400,
    solved: 35,
    avatarUrl: "",
  },
  {
    rank: 5,
    username: "LogicLegend",
    points: 2200,
    solved: 32,
    avatarUrl: "",
  },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-yellow-500";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-amber-600";
    default:
      return "text-muted-foreground";
  }
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <Trophy className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold">Global Leaderboard</h1>
            <p className="text-muted-foreground mt-2">
              Top performers in coding challenges
            </p>
          </div>

          <div className="glassmorphism rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="text-right">Challenges Solved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow key={user.rank}>
                    <TableCell>
                      <span className={`font-bold ${getRankColor(user.rank)}`}>
                        #{user.rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>
                            {user.username.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {user.points}
                    </TableCell>
                    <TableCell className="text-right">{user.solved}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;

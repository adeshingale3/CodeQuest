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
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

interface LeaderboardUser {
  rank: number;
  username: string;
  points: number;
  solved: number;
  avatarUrl?: string;
}

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
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/api/auth/leaderboard/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const users = await response.json();
          // Transform the data to include ranks
          const rankedUsers = users
            .sort((a: LeaderboardUser, b: LeaderboardUser) => b.points - a.points)
            .map((user: LeaderboardUser, index: number) => ({
              ...user,
              rank: index + 1,
              solved: user.solved_challenges?.length || 0
            }));
          setLeaderboardData(rankedUsers);
        } else {
          console.error('Failed to fetch leaderboard data');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Loading leaderboard...
                    </TableCell>
                  </TableRow>
                ) : leaderboardData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  leaderboardData.map((user) => (
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;

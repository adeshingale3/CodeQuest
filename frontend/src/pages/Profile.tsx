import { Navbar } from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { useUser } from '@/contexts/UserContext';
import { Code2, Brain, Zap, Trophy } from 'lucide-react';

const COLORS = ["#9b87f5", "#10b981", "#f43f5e"];
const DIFFICULTY_COLORS = {
  easy: "#10b981",
  medium: "#f59e0b",
  hard: "#ef4444"
};

const Profile = () => {
  const { user } = useUser();

  // Mock data for language distribution
  const languageData = [
    { name: 'Python', value: 45 },
    { name: 'JavaScript', value: 30 },
    { name: 'Java', value: 15 },
    { name: 'C++', value: 10 }
  ];

  // Mock data for problem-solving progress
  const progressData = [
    { name: 'Easy', solved: 15, total: 20 },
    { name: 'Medium', solved: 10, total: 25 },
    { name: 'Hard', solved: 5, total: 15 }
  ];

  // Mock data for weekly activity
  const weeklyActivity = [
    { day: 'Mon', problems: 3 },
    { day: 'Tue', problems: 5 },
    { day: 'Wed', problems: 2 },
    { day: 'Thu', problems: 4 },
    { day: 'Fri', problems: 6 },
    { day: 'Sat', problems: 3 },
    { day: 'Sun', problems: 1 }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  <p className="text-muted-foreground">
                    Total Points: {user.points || 0}
                  </p>
                  <p className="text-muted-foreground">
                    Solved Challenges: {user.solved_challenges?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Statistics
                </CardTitle>
                <CardDescription>Your coding journey progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center text-sm text-muted-foreground">
                    Programming Language Distribution
                  </div>
                </div>

                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="solved" fill="#10b981" name="Solved" />
                      <Bar dataKey="total" fill="#9b87f5" name="Total" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-center text-sm text-muted-foreground">
                    Problem Difficulty Distribution
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Your earned badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {user.points >= 100 && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/20">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        <div>
                          <div className="font-semibold">Century Scorer</div>
                          <div className="text-sm text-muted-foreground">100+ points earned</div>
                        </div>
                      </div>
                    )}
                    {user.solved_challenges?.length >= 5 && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/20">
                        <Brain className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="font-semibold">Problem Solver</div>
                          <div className="text-sm text-muted-foreground">5+ challenges completed</div>
                        </div>
                      </div>
                    )}
                    {user.points >= 500 && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/20">
                        <Trophy className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="font-semibold">Master Coder</div>
                          <div className="text-sm text-muted-foreground">500+ points earned</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Your problem-solving consistency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyActivity}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="problems" 
                          stroke="#9b87f5" 
                          strokeWidth={2}
                          dot={{ fill: "#9b87f5" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
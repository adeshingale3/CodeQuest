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
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useUser } from '@/contexts/UserContext';

const COLORS = ["#9b87f5", "#10b981", "#f43f5e"];

const Profile = () => {
  const { user } = useUser();

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
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your coding journey progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Solved', value: user.solved_challenges?.length || 0 },
                          { name: 'Points', value: user.points || 0 },
                        ]}
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
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your earned badges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {user.points >= 100 && (
                  <Badge variant="secondary">Century Scorer</Badge>
                )}
                {user.solved_challenges?.length >= 5 && (
                  <Badge variant="secondary">Problem Solver</Badge>
                )}
                {user.points >= 500 && (
                  <Badge variant="secondary">Master Coder</Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

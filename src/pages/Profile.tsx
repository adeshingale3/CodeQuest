
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

const COLORS = ["#9b87f5", "#10b981", "#f43f5e"];

const profileData = {
  username: "JohnDoe",
  totalPoints: 1250,
  solvedChallenges: 15,
  stats: [
    { name: "Easy", value: 8 },
    { name: "Medium", value: 5 },
    { name: "Hard", value: 2 },
  ],
  recentActivity: [
    {
      challenge: "Two Sum",
      points: 100,
      date: "2024-02-20",
      status: "Completed",
    },
    {
      challenge: "Valid Parentheses",
      points: 200,
      date: "2024-02-19",
      status: "Completed",
    },
    {
      challenge: "Merge K Sorted Lists",
      points: 300,
      date: "2024-02-18",
      status: "In Progress",
    },
  ],
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profileData.username}</h1>
                  <p className="text-muted-foreground">
                    Total Points: {profileData.totalPoints}
                  </p>
                  <p className="text-muted-foreground">
                    Solved Challenges: {profileData.solvedChallenges}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Distribution</CardTitle>
                <CardDescription>
                  Challenges completed by difficulty
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={profileData.stats}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {profileData.stats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted"
                    >
                      <div>
                        <p className="font-medium">{activity.challenge}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            activity.status === "Completed"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {activity.status}
                        </Badge>
                        <span className="text-sm font-medium">
                          {activity.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

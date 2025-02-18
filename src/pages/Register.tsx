
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Register = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      toast({
        title: "Registration successful!",
        description: "Welcome to CodeQuest",
      });
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 glassmorphism p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Start your coding journey today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                required
                className="w-full"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

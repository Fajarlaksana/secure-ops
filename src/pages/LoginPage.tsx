import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = isSignUp 
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    if (isSignUp) {
      toast({ title: "Success", description: "Check your email to confirm your account." });
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-sm glow-primary relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 glow-primary">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground text-glow-primary">SecureOps</h1>
          <p className="text-[11px] text-muted-foreground mt-1">Login Attack Monitoring Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/50 border-border/30 text-xs h-10"
              required
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted/50 border-border/30 text-xs h-10 pr-10"
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full h-10 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-[10px] text-muted-foreground hover:text-primary text-center mt-4 w-full block transition-colors"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </motion.div>
    </div>
  );
}

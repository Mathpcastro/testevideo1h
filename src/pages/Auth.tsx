import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/app");
      } else {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (signUpError) throw signUpError;
        
        toast.success("Verifique seu email para confirmar o cadastro");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <GraduationCap className="w-12 h-12 text-primary" />
          <h1 className="text-2xl font-bold text-primary">ExamWise Buddy</h1>
          <p className="text-center text-gray-600">Seu assistente de estudos pessoal</p>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setIsLogin(true)}
            variant={isLogin ? "default" : "outline"}
            className="flex-1"
          >
            Login
          </Button>
          <Button
            onClick={() => setIsLogin(false)}
            variant={!isLogin ? "default" : "outline"}
            className="flex-1"
          >
            Criar Conta
          </Button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isLogin && (
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;

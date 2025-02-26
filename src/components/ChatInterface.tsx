import { useState } from "react";
import { Send, GraduationCap, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{ type: "user" | "bot"; content: string }>>([
    { type: "bot", content: "Olá! Sou seu assistente de estudos para concursos. Como posso ajudar você hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const formatMessage = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => (
        <p key={i} className={`mb-4 last:mb-0 ${line.startsWith('•') ? 'pl-4' : ''}`}>
          {line}
        </p>
      ));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: input },
      });

      if (error) {
        throw error;
      }

      if (data?.response) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: data.response }
        ]);
      } else {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Desculpe, houve um erro ao processar sua mensagem. Tente novamente em alguns instantes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-gray-900">ExamWise Buddy</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white shadow-sm border"
              }`}
            >
              <div className="prose prose-sm">
                {formatMessage(message.content)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm border rounded-lg p-4">
              <div className="animate-pulse">Digitando...</div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

import { useState, useRef } from "react";
import { Send, GraduationCap, LogOut, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Simulação de respostas para diferentes tipos de perguntas
const simulatedResponses = [
  {
    keywords: ["olá", "oi", "ei", "bom dia", "boa tarde", "boa noite"],
    response: "Olá! Como posso ajudar você com seus estudos para concursos hoje?"
  },
  {
    keywords: ["direito", "constitucional", "constituição"],
    response: "O Direito Constitucional é um ramo do direito público que estuda a Constituição Federal. Alguns tópicos importantes incluem:\n\n• Princípios fundamentais\n• Direitos e garantias fundamentais\n• Organização do Estado\n• Organização dos Poderes\n• Processo legislativo\n\nQual aspecto específico do Direito Constitucional você gostaria de explorar?"
  },
  {
    keywords: ["português", "gramática", "ortografia", "concordância"],
    response: "A Língua Portuguesa é uma matéria fundamental em concursos públicos. Alguns tópicos importantes:\n\n• Interpretação de texto\n• Tipologia textual\n• Ortografia oficial\n• Acentuação gráfica\n• Concordância verbal e nominal\n• Regência verbal e nominal\n• Pontuação\n\nQual aspecto da gramática você gostaria de revisar?"
  },
  {
    keywords: ["matemática", "cálculo", "estatística", "probabilidade"],
    response: "A Matemática é uma disciplina importante em muitos concursos. Tópicos frequentes incluem:\n\n• Aritmética básica\n• Porcentagem\n• Juros simples e compostos\n• Probabilidade\n• Estatística básica\n• Análise combinatória\n• Geometria\n\nEm qual desses tópicos você está tendo dificuldade?"
  },
  {
    keywords: ["estudo", "estudar", "método", "técnica", "aprendizado"],
    response: "Existem várias técnicas de estudo eficazes para concursos públicos:\n\n• Pomodoro: alternar entre 25 minutos de estudo e 5 minutos de descanso\n• Mapas mentais: organizar visualmente os conceitos\n• Resumos ativos: escrever com suas próprias palavras\n• Flashcards: para memorização espaçada\n• Resolução de questões anteriores\n• Simulados com controle de tempo\n\nVocê gostaria de saber mais sobre alguma dessas técnicas?"
  }
];

// Função para encontrar uma resposta simulada com base na entrada do usuário
const getSimulatedResponse = (input: string) => {
  const lowercaseInput = input.toLowerCase();
  
  // Verificar se a entrada contém palavras-chave de alguma resposta simulada
  for (const item of simulatedResponses) {
    if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return item.response;
    }
  }
  
  // Resposta padrão se nenhuma palavra-chave for encontrada
  return "Entendo sua pergunta. Para concursos públicos, é importante estudar de forma organizada e consistente. Recomendo focar em resolver questões anteriores, criar resumos e utilizar técnicas de memorização. Posso ajudar com algum tópico específico?";
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{ type: "user" | "bot"; content: string }>>([
    { type: "bot", content: "Olá! Sou seu assistente de estudos para concursos. Como posso ajudar você hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
      // Simular um atraso de resposta para parecer mais natural
      setTimeout(() => {
        const simulatedResponse = getSimulatedResponse(input);
        
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: simulatedResponse }
        ]);
        
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Desculpe, houve um erro ao processar sua mensagem. Tente novamente em alguns instantes.");
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!chatContainerRef.current || messages.length <= 1) {
      toast.error("Não há conteúdo suficiente para gerar um PDF");
      return;
    }

    try {
      toast.info("Gerando PDF, aguarde...");
      
      const chatElement = chatContainerRef.current;
      const canvas = await html2canvas(chatElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Determinar a orientação com base na altura do conteúdo
      const orientation = canvas.height > canvas.width ? 'portrait' : 'landscape';
      
      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calcular a proporção para ajustar a imagem à página
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10; // Margem superior
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Adicionar mais páginas se necessário
      if (imgHeight * ratio > pdfHeight - 20) {
        let remainingHeight = imgHeight * ratio;
        let currentY = 0;
        
        while (remainingHeight > 0) {
          pdf.addPage();
          const pageHeight = pdfHeight - 20;
          pdf.addImage(
            imgData, 
            'PNG', 
            imgX, 
            imgY - currentY, 
            imgWidth * ratio, 
            imgHeight * ratio
          );
          currentY += pageHeight;
          remainingHeight -= pageHeight;
        }
      }
      
      pdf.save('conversa-examwise-buddy.pdf');
      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error("Erro ao gerar o PDF. Tente novamente.");
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
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadPDF}
            disabled={messages.length <= 1}
            title="Baixar conversa como PDF"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
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

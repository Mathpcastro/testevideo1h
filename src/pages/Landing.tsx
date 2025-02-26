import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  MessageCircle, 
  Target, 
  Users, 
  BarChart, 
  Library,
  Calendar,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background";

const Landing = () => {
  const checkoutUrl = "https://go.tribopay.com.br/mlq22";
  
  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };
  
  return (
    <div className="min-h-screen">
      {/* Cabeçalho */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-primary">ExamWise Buddy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#beneficios" className="text-lg text-gray-600 hover:text-primary">Benefícios</a>
            <a href="#funcionalidades" className="text-lg text-gray-600 hover:text-primary">Funcionalidades</a>
            <a href="#depoimentos" className="text-lg text-gray-600 hover:text-primary">Depoimentos</a>
            <a href="#precos" className="text-lg text-gray-600 hover:text-primary">Preços</a>
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={handleCheckout}>
              <Button className="text-lg px-6 py-2">Iniciar Agora</Button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section com Aurora Background */}
      <AuroraBackground className="h-screen">
        <div className="container mx-auto px-4 pt-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-7xl md:text-9xl font-bold text-black mb-8 z-10">
              Acelere seu Estudo com o Melhores Chatbot para Concursos!
            </h1>
            <p className="text-3xl md:text-5xl text-gray-800 mb-10 z-10">
              Prepare-se para suas provas com interações personalizadas e materiais de qualidade.
            </p>
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={handleCheckout} className="z-10">
              <Button size="lg" className="text-2xl px-10 py-7">
                Experimente Grátis
              </Button>
            </a>
          </div>
        </div>
      </AuroraBackground>

      {/* Benefícios */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">Por Que Escolher Nosso App?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <MessageCircle className="h-12 w-12" />,
                title: "Respostas Instantâneas",
                description: "Obtenha respostas para suas dúvidas de forma instantânea, 24/7."
              },
              {
                icon: <Target className="h-12 w-12" />,
                title: "Conteúdos Personalizados",
                description: "Tenha acesso a materiais e dicas adaptadas ao seu perfil de estudo."
              },
              {
                icon: <BarChart className="h-12 w-12" />,
                title: "Simulados Eficazes",
                description: "Teste seus conhecimentos com questões praticadas que ajudam a identificar suas fraquezas."
              },
              {
                icon: <Calendar className="h-12 w-12" />,
                title: "Cronograma Personalizado",
                description: "Organize seus estudos com um cronograma feito sob medida para você."
              },
              {
                icon: <TrendingUp className="h-12 w-12" />,
                title: "Feedback e Melhoria Contínua",
                description: "Aprenda com seus erros e melhore constantemente seu desempenho."
              }
            ].map((benefit, index) => (
              <div key={index} className="p-8 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mb-6">{benefit.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-lg text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">Funcionalidades Poderosas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: <MessageCircle className="h-12 w-12" />,
                title: "Chatbot Interativo",
                description: "Pergunte, aprenda e teste seus conhecimentos a qualquer hora."
              },
              {
                icon: <Target className="h-12 w-12" />,
                title: "Simulados Detalhados",
                description: "Avaliação de cada tentativa com dicas para melhorar."
              },
              {
                icon: <Library className="h-12 w-12" />,
                title: "Biblioteca de Conteúdos",
                description: "Acesso a materiais relevantes de estudos e informações atualizadas sobre concursos."
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: "Comunidade de Estudantes",
                description: "Conecte-se com outros estudantes, compartilhe dicas e experiências."
              }
            ].map((feature, index) => (
              <div key={index} className="p-8 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-lg text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">O Que Nossos Usuários Dizem</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                text: "O chatbot me ajudou a entender tópicos que eu tinha dúvida e o cronograma é incrível!",
                author: "Maria",
                role: "Estudante de Direito"
              },
              {
                text: "Com os simulados, consegui focar nos meus pontos fracos e melhorar significativamente.",
                author: "João",
                role: "Estudante de Medicina"
              },
              {
                text: "A biblioteca de conteúdos é extensão do meu material de estudo!",
                author: "Ana",
                role: "Estudante de Engenharia"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 rounded-lg border bg-white shadow-sm">
                <p className="text-lg text-gray-600 mb-6">"{testimonial.text}"</p>
                <div className="text-xl font-semibold">{testimonial.author}</div>
                <div className="text-base text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">Escolha seu Pacote</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Gratuito",
                price: "R$ 0",
                features: ["Acesso básico ao chatbot", "Alguns simulados"]
              },
              {
                title: "Mensal",
                price: "R$ 49,90",
                features: [
                  "Acesso completo ao chatbot",
                  "Simulados ilimitados",
                  "Conteúdos extras"
                ]
              },
              {
                title: "Anual",
                price: "R$ 399,90",
                features: [
                  "Acesso total",
                  "2 meses grátis",
                  "Suporte prioritário",
                  "Simulados ilimitados",
                  "Conteúdos extras"
                ]
              }
            ].map((plan, index) => (
              <div key={index} className="p-8 rounded-lg border bg-white shadow-sm">
                <h3 className="text-2xl font-semibold mb-3">{plan.title}</h3>
                <div className="text-4xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg">
                      <Clock className="h-6 w-6 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href={checkoutUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={handleCheckout}
                >
                  <Button className="w-full text-lg py-3">Assine Agora</Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8">Experimente 7 Dias Grátis!</h2>
          <a 
            href={checkoutUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handleCheckout}
          >
            <Button size="lg" className="text-2xl px-10 py-6">
              Comece Agora
            </Button>
          </a>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h4 className="text-xl font-semibold mb-6">Sobre Nós</h4>
              <p className="text-lg text-gray-400">
                Ajudamos estudantes a alcançarem seus objetivos nos concursos públicos.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Links Úteis</h4>
              <ul className="space-y-3 text-lg text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Contato</h4>
              <ul className="space-y-3 text-lg text-gray-400">
                <li>suporte@examwise.com</li>
                <li>(11) 99999-9999</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Redes Sociais</h4>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    {/* Ícones de redes sociais aqui */}
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-gray-800 text-center text-lg text-gray-400">
            <p>&copy; 2024 ExamWise Buddy. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 
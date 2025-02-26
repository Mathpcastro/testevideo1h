
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!openAIApiKey) {
    console.error('Error: OPENAI_API_KEY não encontrada');
    return new Response(
      JSON.stringify({ error: 'Configuração da API não encontrada' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      throw new Error('Mensagem é obrigatória');
    }

    console.log('Enviando mensagem para OpenAI:', message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente de estudos especializado em preparação para concursos. Seu objetivo é ajudar os estudantes a se prepararem da melhor forma possível, fornecendo explicações claras, exemplos práticos e dicas de estudo. Mantenha suas respostas concisas e focadas. Sempre responda em português.'
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Erro na resposta da OpenAI:', error);
      throw new Error(error.error?.message || 'Erro ao processar a resposta');
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    console.log('Resposta recebida da OpenAI');

    return new Response(
      JSON.stringify({ response: botResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro na função chat:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erro interno no servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

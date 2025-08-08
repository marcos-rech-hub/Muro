import React, { useState } from 'react';
import { MapPin, Clock, Users, Heart, BookOpen, Camera, ArrowRight } from 'lucide-react';
import BerlinMap from './components/BerlinMap';

function App() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'Introdução', icon: BookOpen },
    { id: 'division', title: 'A Divisão', icon: MapPin },
    { id: 'timeline', title: 'Linha do Tempo', icon: Clock },
    { id: 'daily-life', title: 'Vida Cotidiana', icon: Users },
    { id: 'escape', title: 'Tentativas de Fuga', icon: Heart },
    { id: 'gallery', title: 'Galeria Histórica', icon: Camera }
  ];

  const timelineEvents = [
    { year: '1961', event: 'Construção do Muro', description: 'Na madrugada de 13 de agosto, soldados da Alemanha Oriental começaram a construir o muro.' },
    { year: '1963', event: 'Discurso de JFK', description: 'President Kennedy pronuncia o famoso "Ich bin ein Berliner".' },
    { year: '1975', event: 'Acordo de Helsinque', description: 'Tratado que reconheceu as fronteiras europeias pós-guerra.' },
    { year: '1987', event: 'Reagan em Berlim', description: 'Reagan desafia Gorbachev: "Derrube este muro!"' },
    { year: '1989', event: 'Queda do Muro', description: 'Em 9 de novembro, o muro é derrubado pela população.' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-center">
            Muro de Berlim: Divisão Física e Ideológica
          </h1>
          <p className="text-gray-300 text-center mt-2">
            Uma simulação interativa sobre 28 anos de divisão (1961-1989)
          </p>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-gray-800 min-h-screen p-4 sticky top-20">
          <ul className="space-y-2">
            {sections.map(({ id, title, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span>{title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Introdução */}
          {activeSection === 'intro' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-4xl font-bold mb-6 text-center">O Muro de Berlim</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Contexto Histórico</h3>
                    <p className="text-gray-300 mb-4">
                      Após a Segunda Guerra Mundial, Berlim foi dividida em quatro setores controlados pelos Aliados. 
                      A crescente tensão da Guerra Fria levou à criação de duas Alemanhas distintas.
                    </p>
                    <p className="text-gray-300 mb-4">
                      O Muro de Berlim, erguido na madrugada de 13 de agosto de 1961, tornou-se o símbolo 
                      mais visível da divisão ideológica entre o mundo capitalista e comunista.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Dados Importantes</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• <strong>Extensão:</strong> 155 km de comprimento</li>
                      <li>• <strong>Altura:</strong> 3,6 metros</li>
                      <li>• <strong>Período:</strong> 28 anos (1961-1989)</li>
                      <li>• <strong>Vítimas:</strong> Mais de 140 mortos tentando cruzar</li>
                      <li>• <strong>Famílias separadas:</strong> Milhares</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Divisão da Cidade */}
          {activeSection === 'division' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">A Divisão de Berlim</h2>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Berlim Ocidental */}
                <div className="bg-blue-900 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-200">Berlim Ocidental</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-800 rounded p-4">
                      <h4 className="font-semibold mb-2">Sistema Político</h4>
                      <p className="text-blue-200">Democracia capitalista sob influência dos Aliados (EUA, Reino Unido, França)</p>
                    </div>
                    <div className="bg-blue-800 rounded p-4">
                      <h4 className="font-semibold mb-2">Economia</h4>
                      <p className="text-blue-200">Economia de mercado, reconstrução com ajuda do Plano Marshall</p>
                    </div>
                    <div className="bg-blue-800 rounded p-4">
                      <h4 className="font-semibold mb-2">Sociedade</h4>
                      <p className="text-blue-200">Liberdade de expressão, consumo, cultura ocidental</p>
                    </div>
                  </div>
                </div>

                {/* Berlim Oriental */}
                <div className="bg-red-900 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-200">Berlim Oriental</h3>
                  <div className="space-y-4">
                    <div className="bg-red-800 rounded p-4">
                      <h4 className="font-semibold mb-2">Sistema Político</h4>
                      <p className="text-red-200">Socialismo sob controle soviético, partido único (SED)</p>
                    </div>
                    <div className="bg-red-800 rounded p-4">
                      <h4 className="font-semibold mb-2">Economia</h4>
                      <p className="text-red-200">Economia planificada, coletivização, reconstrução lenta</p>
                    </div>
                    <div className="bg-red-800 rounded p-4">
                      <h4 className="font-semibold mb-2">Sociedade</h4>
                      <p className="text-red-200">Controle estatal, censura, propaganda comunista</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa Interativo Simulado */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center">Mapa da Divisão</h3>
                <div className="flex justify-center mb-6">
                  <img 
                    src="/src/components/mapa.png" 
                    alt="Mapa da divisão de Berlim" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4">
                    <h4 className="text-xl font-bold text-blue-200 mb-2">BERLIM OCIDENTAL</h4>
                    <p className="text-blue-200 text-sm">Setores: Americano, Britânico, Francês</p>
                    <p className="text-blue-200 text-sm mt-2">Área: ~480 km² | População: ~2,2 milhões</p>
                  </div>
                  <div className="bg-red-900 bg-opacity-50 rounded-lg p-4">
                    <h4 className="text-xl font-bold text-red-200 mb-2">BERLIM ORIENTAL</h4>
                    <p className="text-red-200 text-sm">Setor Soviético</p>
                    <p className="text-red-200 text-sm mt-2">Área: ~403 km² | População: ~1,3 milhões</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          {activeSection === 'timeline' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">Linha do Tempo</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                <div className="space-y-8">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold z-10">
                        {index + 1}
                      </div>
                      <div className="ml-6 bg-gray-800 rounded-lg p-6 flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl font-bold text-red-400">{event.year}</span>
                          <ArrowRight className="ml-2 text-gray-400" size={16} />
                          <span className="ml-2 text-xl font-semibold">{event.event}</span>
                        </div>
                        <p className="text-gray-300">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vida Cotidiana */}
          {activeSection === 'daily-life' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">Vida Cotidiana Dividida</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">Berlim Ocidental</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Trabalho</h4>
                      <p className="text-gray-300">Empregos em empresas privadas, salários competitivos, oportunidades de carreira</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Compras</h4>
                      <p className="text-gray-300">Lojas bem abastecidas, produtos importados, variedade de escolhas</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Lazer</h4>
                      <p className="text-gray-300">Cinemas, teatros, música ocidental, viagens ao exterior</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Educação</h4>
                      <p className="text-gray-300">Sistema educacional democrático, acesso a informações diversas</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-400">Berlim Oriental</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold">Trabalho</h4>
                      <p className="text-gray-300">Empregos estatais garantidos, salários fixos, produtividade baixa</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold">Compras</h4>
                      <p className="text-gray-300">Filas longas, produtos escassos, economia de racionamento</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold">Lazer</h4>
                      <p className="text-gray-300">Cultura controlada pelo Estado, propaganda, limitações artísticas</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold">Educação</h4>
                      <p className="text-gray-300">Educação ideológica, censura, doutrinação comunista</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center">Impactos Sociais</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Heart className="text-white" size={24} />
                    </div>
                    <h4 className="font-semibold mb-2">Famílias Separadas</h4>
                    <p className="text-gray-300">Milhares de famílias foram separadas da noite para o dia</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="text-white" size={24} />
                    </div>
                    <h4 className="font-semibold mb-2">Isolamento Social</h4>
                    <p className="text-gray-300">Perda de contato com amigos e colegas do outro lado</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <h4 className="font-semibold mb-2">Mudança de Rotina</h4>
                    <p className="text-gray-300">Rotas de trabalho e vida social completamente alteradas</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tentativas de Fuga */}
          {activeSection === 'escape' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">Tentativas de Fuga</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">Métodos de Fuga</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-700 rounded p-4">
                    <h4 className="font-semibold mb-2">Túneis</h4>
                    <p className="text-gray-300 text-sm">Escavação de túneis subterrâneos para passar por baixo do muro</p>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <h4 className="font-semibold mb-2">Balões</h4>
                    <p className="text-gray-300 text-sm">Uso de balões de ar quente para voar sobre o muro</p>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <h4 className="font-semibold mb-2">Carros</h4>
                    <p className="text-gray-300 text-sm">Esconderijos em veículos ou blindagem para quebrar barreiras</p>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <h4 className="font-semibold mb-2">Documentos</h4>
                    <p className="text-gray-300 text-sm">Falsificação de documentos para passar pelos checkpoints</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-green-400">Histórias de Sucesso</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Família Wetzel e Strelzyk (1979)</h4>
                      <p className="text-gray-300">Duas famílias fugiram em um balão de ar quente caseiro</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Túnel 57 (1964)</h4>
                      <p className="text-gray-300">57 pessoas escaparam através de um túnel de 145 metros</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Conrad Schumann (1961)</h4>
                      <p className="text-gray-300">Guarda fronteiriço que saltou sobre arame farpado em agosto de 1961</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-red-400">Consequências</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold">Mortes</h4>
                      <p className="text-gray-300">Mais de 140 pessoas morreram tentando cruzar o muro</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold">Prisões</h4>
                      <p className="text-gray-300">Milhares foram presas por tentativas de fuga</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold">Fortificação</h4>
                      <p className="text-gray-300">Cada tentativa levou ao reforço das barreiras</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Galeria */}
          {activeSection === 'gallery' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">Galeria Histórica</h2>
              
              <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="bg-gray-700 h-48 rounded mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                    src="/src/components/construcaomuro.jpg" 
                    alt="Mapa da divisão de Berlim" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                  </div>
                  <h3 className="font-semibold mb-2">Construção do Muro (1961)</h3>
                  
                  <p className="text-gray-300 text-sm">Soldados da Alemanha Oriental construindo as primeiras barreiras</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="bg-gray-700 h-48 rounded mb-4 flex items-center justify-center overflow-hidden">
                    
                    <img 
                    src="src/components/checkpoint.jpg" 
                    alt="Mapa da divisão de Berlim" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                  </div>
                  <h3 className="font-semibold mb-2">Checkpoint Charlie</h3>
                  
                  <p className="text-gray-300 text-sm">O mais famoso posto de controle entre Berlim Oriental e Ocidental</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="bg-gray-700 h-48 rounded mb-4 flex items-center justify-center overflow-hidden">
                    
                     <img 
                    src="src/components/queda.jpg" 
                    alt="Mapa da divisão de Berlim" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                  </div>
                  <h3 className="font-semibold mb-2">Queda do Muro (1989)</h3>
                  
                  <p className="text-gray-300 text-sm">Berlinenses celebrando e derrubando o muro em novembro de 1989</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="bg-gray-700 h-48 rounded mb-4 flex items-center justify-center overflow-hidden">
                    
                    <img 
                    src="/src/components/reunificacao.jpg" 
                    alt="Mapa da divisão de Berlim" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                  </div>
                  <h3 className="font-semibold mb-2">Reunificação</h3>
                  
                  <p className="text-gray-300 text-sm">Celebração da reunificação alemã em 1990</p>
                </div>
              </div>

              <div className="mt-8 bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Testemunhos</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <blockquote className="border-l-4 border-yellow-500 pl-6 italic">
                    <p className="text-gray-300 mb-4">
                      "Acordei e não podia mais ver minha mãe. O muro havia sido construído durante a noite, 
                      e ela estava do outro lado. Não a vi por 28 anos."
                    </p>
                    <cite className="text-yellow-400">- Ingrid Müller, separada de sua família em 1961</cite>
                  </blockquote>
                  
                  <blockquote className="border-l-4 border-yellow-500 pl-6 italic">
                    <p className="text-gray-300 mb-4">
                      "Quando o muro caiu, não conseguíamos acreditar. Corremos para o outro lado e abraçamos 
                      estranhos. Era como se o mundo inteiro estivesse celebrando conosco."
                    </p>
                    <cite className="text-yellow-400">- Hans Weber, testemunha da queda do muro</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Esta simulação foi criada com base em fontes históricas confiáveis para fins educacionais.
          </p>
          <div className="text-sm text-gray-500">
            <p>Fontes: Arquivo Federal Alemão, Museu do Muro de Berlim, National Geographic, BBC History</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
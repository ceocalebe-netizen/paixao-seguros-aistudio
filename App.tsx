
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  ThumbsUp,
  Headphones
} from 'lucide-react';
import { SERVICES, TESTIMONIALS, getIcon } from './constants';
import { getInsuranceRecommendation } from './services/geminiService';
import { RecommendationResponse } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setAiLoading(true);
    const result = await getInsuranceRecommendation(aiInput);
    setRecommendation(result);
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen selection:bg-blue-100">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-blue-900">Segura<span className="text-blue-600">Mais</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Seguros</a>
            <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Sobre Nós</a>
            <a href="#testimonials" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Depoimentos</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95">
              Cotação Grátis
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-slate-800">Seguros</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-slate-800">Sobre Nós</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-slate-800">Depoimentos</a>
              <button className="bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl">Cotação Grátis</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Proteção inteligente para o seu futuro</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Segurança é ter <span className="text-blue-600">quem cuide</span> de você.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Simplificamos o mundo dos seguros para que você foque no que realmente importa. Cotações rápidas, atendimento humano e a melhor cobertura do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                Começar Cotação <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white border-2 border-slate-200 hover:border-blue-200 px-8 py-4 rounded-2xl font-bold text-lg text-slate-700 transition-all hover:bg-blue-50">
                Ver Planos
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i+10}/50/50`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="text-slate-900 font-bold">+10k clientes</span> protegidos em todo o Brasil
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl p-1 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
               <img 
                src="https://picsum.photos/seed/insurance-hero/800/800" 
                alt="Seguro e Proteção" 
                className="w-full h-full object-cover rounded-[22px] opacity-90"
              />
            </div>
            {/* Floating Card 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="bg-green-100 p-2 rounded-lg"><CheckCircle2 className="text-green-600 w-5 h-5" /></div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Aprovação</p>
                <p className="text-sm font-bold text-slate-800">Instantânea</p>
              </div>
            </motion.div>
            {/* Floating Card 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]"
            >
              <p className="text-2xl font-bold text-blue-600">98%</p>
              <p className="text-sm font-medium text-slate-600">De satisfação no atendimento</p>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Nossos Serviços</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900">Soluções para cada etapa da vida</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 bg-${service.color}-100 text-${service.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {getIcon(service.icon, "w-7 h-7")}
                </div>
                <h4 className="text-2xl font-bold text-slate-800 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                <button className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Tool */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.4),transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 text-blue-400 font-bold mb-4">
                  <Sparkles className="w-6 h-6" />
                  <span>CONSULTOR INTELIGENTE</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-6">Não sabe por onde começar? Deixe a nossa IA ajudar.</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Descreva brevemente o que você busca ou seu momento de vida e nosso assistente analisará as melhores opções para você em segundos.
                </p>
                
                <form onSubmit={handleAiConsult} className="relative mb-8">
                  <textarea 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ex: Tenho 30 anos, moro em SP, comprei um carro novo e me preocupo com minha família..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all min-h-[120px] resize-none"
                  />
                  <button 
                    disabled={aiLoading}
                    className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
                  >
                    {aiLoading ? 'Analisando...' : 'Consultar'}
                    {!aiLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>

                <AnimatePresence>
                  {recommendation && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm"
                    >
                      <h4 className="text-xl font-bold text-blue-400 mb-2">Recomendação SeguraMais:</h4>
                      <p className="text-2xl font-bold mb-4 underline decoration-blue-500 underline-offset-4">{recommendation.mainInsurance}</p>
                      <p className="text-slate-300 mb-6 italic">"{recommendation.reason}"</p>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.suggestedAddons.map((addon, i) => (
                          <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-slate-700">
                            + {addon}
                          </span>
                        ))}
                      </div>
                      <button className="mt-8 w-full bg-white text-blue-900 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                        Solicitar Proposta Baseada na IA
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-8 rounded-3xl text-center">
                <Clock className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-slate-900 mb-1">24/7</p>
                <p className="text-slate-500 text-sm">Suporte Emergencial</p>
              </div>
              <div className="bg-emerald-50 p-8 rounded-3xl text-center translate-y-8">
                <ThumbsUp className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-slate-900 mb-1">99%</p>
                <p className="text-slate-500 text-sm">Índice de Renovação</p>
              </div>
              <div className="bg-rose-50 p-8 rounded-3xl text-center">
                <ShieldCheck className="w-10 h-10 text-rose-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-slate-900 mb-1">R$ 50M+</p>
                <p className="text-slate-500 text-sm">Em Indenizações</p>
              </div>
              <div className="bg-amber-50 p-8 rounded-3xl text-center translate-y-8">
                <Headphones className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-slate-900 mb-1">10k+</p>
                <p className="text-slate-500 text-sm">Vidas Protegidas</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-blue-600 font-bold mb-4">SOBRE NÓS</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Mais que uma corretora, somos seus parceiros de jornada.</h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nascemos da necessidade de desmistificar os seguros. Acreditamos que a tecnologia deve servir para aproximar as pessoas e tornar processos complexos em experiências transparentes e ágeis.
              </p>
              <ul className="space-y-4 mb-10">
                {['Atendimento personalizado via WhatsApp', 'Parceria com as maiores seguradoras', 'Acompanhamento total em casos de sinistro', 'Consultoria gratuita vitalícia'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-blue-600" /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-700 hover:border-blue-700 transition-all">
                Conheça nossa história completa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">O que dizem nossos clientes</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Confiança se conquista com transparência e resultados. Veja por que somos a escolha número 1.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} className="w-12 h-12 rounded-full" alt={t.name} />
                  <div>
                    <h5 className="font-bold text-slate-900">{t.name}</h5>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">Pronto para viver <br />sem preocupações?</h2>
              <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
                Faça uma simulação agora e descubra como podemos proteger você, sua família e seu patrimônio pelo melhor custo-benefício.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:bg-blue-50 transition-all hover:scale-105">
                  Falar com um Especialista
                </button>
                <button className="bg-blue-700/50 text-white border border-blue-400/30 px-10 py-5 rounded-2xl font-bold text-xl backdrop-blur-sm hover:bg-blue-700 transition-all">
                  Cotação Online
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-blue-900">Segura<span className="text-blue-600">Mais</span></span>
              </div>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Especialistas em transformar insegurança em tranquilidade. Atuamos em todo o território nacional.
              </p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h6 className="font-bold text-slate-900 mb-6">Seguros</h6>
              <ul className="space-y-4">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.id}><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">{s.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="font-bold text-slate-900 mb-6">Empresa</h6>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Carreiras</a></li>
                <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Parcerias</a></li>
              </ul>
            </div>

            <div>
              <h6 className="font-bold text-slate-900 mb-6">Contato</h6>
              <ul className="space-y-4">
                <li className="text-slate-500">0800 123 4567</li>
                <li className="text-slate-500">contato@seguramais.com.br</li>
                <li className="text-slate-500">Av. Paulista, 1000 - Bela Vista, SP</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© 2024 SeguraMais Corretora de Seguros. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-400 text-sm hover:text-slate-600">Privacidade</a>
              <a href="#" className="text-slate-400 text-sm hover:text-slate-600">Termos</a>
              <a href="#" className="text-slate-400 text-sm hover:text-slate-600">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import QRCodeStyling from 'qr-code-styling';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      qrCodeInstance.current = new QRCodeStyling({
        width: 200,
        height: 200,
        type: "canvas",
        data: "",
        image: "",
        dotsOptions: {
          color: "#1e40af",
          type: "rounded"
        },
        cornersSquareOptions: {
          color: "#3b82f6",
          type: "extra-rounded"
        },
        cornersDotOptions: {
          color: "#60a5fa",
          type: "dot"
        },
        backgroundOptions: {
          color: "transparent",
        }
      });
    }
  }, []);

  const generateDataMatrix = () => {
    if (inputText.trim() && qrCodeInstance.current && qrCodeRef.current) {
      qrCodeInstance.current.update({
        data: inputText
      });
      
      qrCodeRef.current.innerHTML = '';
      qrCodeInstance.current.append(qrCodeRef.current);
      setGeneratedCode(inputText);
    }
  };

  const downloadPNG = () => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download({ name: "datamatrix", extension: "png" });
    }
  };

  const downloadSVG = () => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download({ name: "datamatrix", extension: "svg" });
    }
  };

  // Генерация плавающих частиц
  useEffect(() => {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particles.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 20000);
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Считать код',
      description: 'Введите текст или данные для кодирования в DataMatrix формат',
      icon: 'Type',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      number: '02', 
      title: 'Распечатать код',
      description: 'Скачайте готовый DataMatrix код и распечатайте его',
      icon: 'Printer',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      number: '03',
      title: 'Наклеить на упаковку',
      description: 'Прикрепите код на товар или упаковку для идентификации',
      icon: 'Package',
      gradient: 'from-emerald-500 to-teal-400'
    }
  ];

  return (
    <div className="min-h-screen relative liquid-bg">
      {/* Floating particles */}
      <div className="particles"></div>
      
      {/* Pearl background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-teal-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-rose-200/15 to-orange-300/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-24">
          <div className="glass rounded-[2rem] p-12 mb-12 glow-hover pearl-shimmer">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl pearl-shimmer">
                <Icon name="Sparkles" size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-7xl font-black text-pearl mb-6">
              DataMatrix 
              <span className="text-gradient block mt-2"> Генератор</span>
            </h1>
            <p className="text-2xl text-slate-600/80 max-w-3xl mx-auto leading-relaxed">
              Создавайте DataMatrix коды в элегантном стиле жемчужного стекла. 
              Красота технологий будущего.
            </p>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-24 left-16 w-8 h-8 glass rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-36 right-20 w-6 h-6 glass rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-52 left-1/3 w-7 h-7 glass rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20 relative z-10">
        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* Input Section */}
          <div className="glass rounded-[2rem] p-10 glow-hover transform hover:scale-[1.02] transition-all duration-700 pearl-shimmer">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl mb-8 shadow-2xl animate-pulse pearl-shimmer">
                <Icon name="Wand2" size={36} className="text-white" />
              </div>
              <h3 className="text-4xl font-bold text-pearl mb-4">Создание кода</h3>
              <p className="text-slate-600/70 text-xl">Введите данные для генерации</p>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <Label className="text-slate-700/90 font-semibold mb-4 block text-xl">
                  Данные для кодирования
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="https://example.com, текст, номер товара..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="h-18 text-xl glass-medium border-white/40 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/20 rounded-2xl text-slate-700 placeholder:text-slate-500/60 pl-16 pr-6 transition-all duration-500"
                  />
                  <Icon name="Feather" size={28} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500/60 group-focus-within:text-indigo-500 transition-colors duration-300" />
                  {inputText && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                      <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-pulse shadow-lg"></div>
                      <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">{inputText.length}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: 'Globe', text: 'URL', value: 'https://example.com', color: 'from-blue-400 to-cyan-400' },
                  { icon: 'Package', text: 'Товар', value: 'SKU: 12345', color: 'from-purple-400 to-pink-400' },
                  { icon: 'Phone', text: 'Телефон', value: '+7 (999) 123-45-67', color: 'from-emerald-400 to-teal-400' }
                ].map((template, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setInputText(template.value)}
                    className="p-5 glass-medium hover:glass rounded-2xl transition-all duration-500 text-center group hover:scale-105 pearl-shimmer"
                  >
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon name={template.icon as any} size={20} className="text-white" />
                    </div>
                    <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors font-semibold">{template.text}</span>
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={generateDataMatrix}
                disabled={!inputText.trim()}
                className="w-full h-18 text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 border-0 rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-700 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed pearl-shimmer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Icon name="Sparkles" className="mr-4 animate-pulse" size={28} />
                Создать код
                <Icon name="ArrowRight" className="ml-4 group-hover:translate-x-3 transition-transform duration-500" size={28} />
              </Button>

              {inputText.trim() && (
                <div className="glass-medium rounded-2xl p-8 animate-fade-in pearl-shimmer">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon name="Eye" size={24} className="text-indigo-500" />
                    <span className="text-slate-700 font-bold text-lg">Предпросмотр данных</span>
                  </div>
                  <p className="text-slate-600 font-mono text-base break-all bg-slate-100/50 p-4 rounded-xl border border-slate-200/50">{inputText}</p>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="glass rounded-[2rem] p-10 glow-hover transform hover:scale-[1.02] transition-all duration-700 pearl-shimmer">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-pearl mb-10">Предварительный просмотр</h3>
              
              <div className="relative">
                <div className="w-80 h-80 mx-auto glass-medium rounded-[2rem] flex items-center justify-center border border-white/40 relative overflow-hidden pearl-shimmer">
                  {generatedCode ? (
                    <div className="text-center animate-scale-in">
                      <div ref={qrCodeRef} className="mx-auto mb-6 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl"></div>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-pulse shadow-lg"></div>
                        <p className="text-emerald-600 font-bold text-lg">Код готов</p>
                        <Icon name="CheckCircle" size={20} className="text-emerald-500" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-500/70">
                      <div className="w-24 h-24 bg-slate-200/50 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <Icon name="QrCode" size={48} className="text-slate-400/70" />
                      </div>
                      <p className="text-xl font-medium">Код появится здесь</p>
                    </div>
                  )}
                </div>
              </div>
              
              {generatedCode && (
                <div className="space-y-5 mt-10 animate-fade-in">
                  <Button 
                    onClick={downloadPNG}
                    className="w-full h-14 glass-medium hover:glass border-white/40 text-slate-700 hover:text-slate-900 rounded-2xl transition-all duration-500 hover:scale-105 font-semibold text-lg"
                  >
                    <Icon name="Download" className="mr-3" size={22} />
                    Скачать PNG
                  </Button>
                  <Button 
                    onClick={downloadSVG}
                    className="w-full h-14 glass-medium hover:glass border-white/40 text-slate-700 hover:text-slate-900 rounded-2xl transition-all duration-500 hover:scale-105 font-semibold text-lg"
                  >
                    <Icon name="FileImage" className="mr-3" size={22} />
                    Скачать SVG
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <section className="mb-20">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-pearl mb-8">
              Как это работает
            </h2>
            <p className="text-2xl text-slate-600/80 max-w-3xl mx-auto leading-relaxed">
              Элегантный процесс из трёх шагов для создания и использования DataMatrix кодов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="glass rounded-3xl p-8 glow-hover hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="relative mb-8">
                      <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${step.gradient} shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative`}>
                        <Icon name={step.icon as any} size={36} className="text-white" />
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center text-sm font-black shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-glow transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: 'Zap', title: 'Молниеносно', desc: 'Мгновенная генерация', color: 'from-yellow-400 to-orange-500' },
            { icon: 'Shield', title: 'Надёжно', desc: 'Стандарт DataMatrix', color: 'from-emerald-400 to-teal-500' },
            { icon: 'Download', title: 'Экспорт', desc: 'PNG и SVG форматы', color: 'from-blue-400 to-cyan-500' },
            { icon: 'Smartphone', title: 'Везде', desc: 'Любые устройства', color: 'from-purple-400 to-pink-500' }
          ].map((feature, idx) => (
            <div key={idx} className="glass rounded-2xl p-6 text-center glow-hover hover:scale-105 transition-all duration-500 group">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:animate-pulse`}>
                <Icon name={feature.icon as any} size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg group-hover:text-glow">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-dark py-12 mt-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Code" size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">DataMatrix Pro</span>
          </div>
          <p className="text-white/60 text-lg">
            © 2024 DataMatrix Генератор. Создано с 💙 для упрощения маркировки.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
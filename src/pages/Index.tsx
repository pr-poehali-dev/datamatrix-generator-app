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
      
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block p-8 glass rounded-3xl mb-8 glow-hover">
            <h1 className="text-6xl font-black text-white mb-4 text-glow">
              DataMatrix 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Генератор</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Создавайте DataMatrix коды в стиле будущего. Красиво, быстро, технологично.
            </p>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-6 h-6 bg-blue-400/40 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-16 w-4 h-4 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-48 left-1/3 w-5 h-5 bg-cyan-400/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20 relative z-10">
        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Input Section */}
          <div className="glass rounded-3xl p-8 glow-hover transform hover:scale-[1.02] transition-all duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg animate-pulse">
                <Icon name="Sparkles" size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 text-glow">Создание кода</h3>
              <p className="text-white/70 text-lg">Введите данные для генерации</p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <Label className="text-white/90 font-medium mb-3 block text-lg">
                  Данные для кодирования
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="https://example.com, текст, номер товара..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="h-16 text-lg glass border-white/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/30 rounded-2xl text-white placeholder:text-white/50 pl-14 pr-4 transition-all duration-300"
                  />
                  <Icon name="Edit3" size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                  {inputText && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      <span className="text-sm text-emerald-400 font-semibold">{inputText.length}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: 'Globe', text: 'URL', value: 'https://example.com' },
                  { icon: 'Package', text: 'Товар', value: 'SKU: 12345' },
                  { icon: 'Phone', text: 'Телефон', value: '+7 (999) 123-45-67' }
                ].map((template, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setInputText(template.value)}
                    className="p-4 glass-dark hover:bg-white/20 rounded-xl transition-all duration-300 text-center group hover:scale-105"
                  >
                    <Icon name={template.icon as any} size={18} className="mx-auto mb-2 text-white/70 group-hover:text-blue-400 transition-colors" />
                    <span className="text-xs text-white/70 group-hover:text-white transition-colors font-medium">{template.text}</span>
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={generateDataMatrix}
                disabled={!inputText.trim()}
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 border-0 rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500 relative overflow-hidden group disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Icon name="Zap" className="mr-3 animate-pulse" size={24} />
                Создать код
                <Icon name="ArrowRight" className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </Button>

              {inputText.trim() && (
                <div className="glass-dark rounded-2xl p-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Eye" size={20} className="text-blue-400" />
                    <span className="text-white font-semibold">Предпросмотр данных</span>
                  </div>
                  <p className="text-white/80 font-mono text-sm break-all bg-black/20 p-3 rounded-lg">{inputText}</p>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="glass rounded-3xl p-8 glow-hover transform hover:scale-[1.02] transition-all duration-500">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-8 text-glow">Предварительный просмотр</h3>
              
              <div className="relative">
                <div className="w-64 h-64 mx-auto glass-dark rounded-3xl flex items-center justify-center border border-white/20 relative overflow-hidden">
                  {generatedCode ? (
                    <div className="text-center animate-scale-in">
                      <div ref={qrCodeRef} className="mx-auto mb-4 p-4 bg-white rounded-2xl"></div>
                      <p className="text-emerald-400 font-semibold animate-pulse">✨ Код готов</p>
                    </div>
                  ) : (
                    <div className="text-center text-white/50">
                      <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Icon name="QrCode" size={40} />
                      </div>
                      <p className="text-lg">Код появится здесь</p>
                    </div>
                  )}
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse opacity-50"></div>
                </div>
              </div>
              
              {generatedCode && (
                <div className="space-y-4 mt-8 animate-fade-in">
                  <Button 
                    onClick={downloadPNG}
                    className="w-full h-12 glass-dark hover:bg-white/20 border-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Icon name="Download" className="mr-2" size={18} />
                    Скачать PNG
                  </Button>
                  <Button 
                    onClick={downloadSVG}
                    className="w-full h-12 glass-dark hover:bg-white/20 border-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Icon name="FileImage" className="mr-2" size={18} />
                    Скачать SVG
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6 text-glow">
              Как это работает
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Простой процесс из трёх шагов для создания и использования DataMatrix кодов
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
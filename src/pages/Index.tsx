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
          color: "#000000",
          type: "square"
        },
        cornersSquareOptions: {
          color: "#000000",
          type: "square"
        },
        cornersDotOptions: {
          color: "#000000",
          type: "square"
        },
        backgroundOptions: {
          color: "#ffffff",
        }
      });
    }
  }, []);

  const generateDataMatrix = () => {
    if (inputText.trim() && qrCodeInstance.current && qrCodeRef.current) {
      qrCodeInstance.current.update({
        data: inputText
      });
      
      // Очищаем предыдущий код
      qrCodeRef.current.innerHTML = '';
      
      // Добавляем новый код
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

  const steps = [
    {
      number: '01',
      title: 'Считать код',
      description: 'Введите текст или данные для кодирования в DataMatrix формат',
      icon: 'Type',
      color: 'text-blue-600'
    },
    {
      number: '02', 
      title: 'Распечатать код',
      description: 'Скачайте готовый DataMatrix код и распечатайте его',
      icon: 'Printer',
      color: 'text-purple-600'
    },
    {
      number: '03',
      title: 'Наклеить на упаковку',
      description: 'Прикрепите код на товар или упаковку для идентификации',
      icon: 'Package',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            DataMatrix 
            <span className="text-primary"> Генератор</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Создавайте DataMatrix коды быстро и легко. Введите текст, получите код, распечатайте и используйте.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        {/* Generator Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Input Section */}
          <Card className="p-0 shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 backdrop-blur-sm overflow-hidden group hover:shadow-3xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-8 space-y-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <Icon name="Type" size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Создание кода</h3>
                <p className="text-slate-600">Введите данные для генерации DataMatrix</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="dataInput" className="text-sm font-medium text-slate-700 mb-2 block">
                    Данные для кодирования
                  </Label>
                  <div className="relative group/input">
                    <Input
                      id="dataInput"
                      type="text"
                      placeholder="https://example.com, текст, номер товара..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="h-14 text-base border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl bg-white pl-12 pr-4 transition-all duration-300 placeholder:text-slate-400"
                    />
                    <Icon name="Edit3" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                    {inputText && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">{inputText.length} символов</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                  <button 
                    onClick={() => setInputText('https://example.com')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                  >
                    <Icon name="Globe" size={14} className="mx-auto mb-1" />
                    URL
                  </button>
                  <button 
                    onClick={() => setInputText('SKU: 12345')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                  >
                    <Icon name="Package" size={14} className="mx-auto mb-1" />
                    Товар
                  </button>
                  <button 
                    onClick={() => setInputText('+7 (999) 123-45-67')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                  >
                    <Icon name="Phone" size={14} className="mx-auto mb-1" />
                    Телефон
                  </button>
                </div>
              </div>
              
              <Button 
                onClick={generateDataMatrix}
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl relative overflow-hidden group/btn"
                disabled={!inputText.trim()}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                <Icon name="Sparkles" className="mr-3" size={20} />
                Создать DataMatrix код
                <Icon name="ArrowRight" className="ml-3 group-hover/btn:translate-x-1 transition-transform" size={20} />
              </Button>

              {inputText.trim() && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Icon name="Info" size={16} />
                    <span className="font-medium">Предпросмотр данных:</span>
                  </div>
                  <p className="mt-1 text-blue-800 font-mono text-sm break-all">{inputText}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="space-y-6 p-0">
              <div className="text-center">
                <Label className="text-lg font-semibold text-slate-900 block mb-4">
                  Предварительный просмотр
                </Label>
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                  {generatedCode ? (
                    <div className="text-center">
                      <div ref={qrCodeRef} className="mx-auto mb-3 rounded flex items-center justify-center"></div>
                      <p className="text-sm text-slate-600">DataMatrix код готов</p>
                    </div>
                  ) : (
                    <div className="text-center text-slate-500">
                      <Icon name="QrCode" size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Код появится здесь</p>
                    </div>
                  )}
                </div>
              </div>
              
              {generatedCode && (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={downloadPNG}>
                    <Icon name="Download" className="mr-2" size={16} />
                    Скачать PNG
                  </Button>
                  <Button variant="outline" className="w-full" onClick={downloadSVG}>
                    <Icon name="FileImage" className="mr-2" size={16} />
                    Скачать SVG
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Steps Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Как это работает
            </h2>
            <p className="text-lg text-slate-600">
              Простой процесс из трёх шагов для создания и использования DataMatrix кодов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name={step.icon as any} size={32} className={step.color} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors">
            <Icon name="Zap" size={32} className="text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Быстро</h3>
            <p className="text-sm text-slate-600">Мгновенная генерация кодов</p>
          </Card>
          
          <Card className="p-6 text-center border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors">
            <Icon name="Shield" size={32} className="text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Надёжно</h3>
            <p className="text-sm text-slate-600">Стандартная технология DataMatrix</p>
          </Card>
          
          <Card className="p-6 text-center border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors">
            <Icon name="Download" size={32} className="text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Экспорт</h3>
            <p className="text-sm text-slate-600">Форматы PNG и SVG</p>
          </Card>
          
          <Card className="p-6 text-center border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors">
            <Icon name="Smartphone" size={32} className="text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Мобильно</h3>
            <p className="text-sm text-slate-600">Работает на всех устройствах</p>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2024 DataMatrix Генератор. Создано с ❤️ для упрощения маркировки.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const englishRoutes = [
  {
    keywords: ['calculator', 'bmi', 'calories', 'fat', 'tools', 'analysis','TDEE','Water intake'],
    reply: `🧮 Want to check your BMI or daily needs? <a href="/calculators" class="text-blue-600 underline">Explore our smart health tools here</a>.`,
  },
  {
    keywords: ['articles', 'blog', 'tips', 'reading', 'nutrition info'],
    reply: `📚 Hungry for knowledge? <a href="/articles" class="text-blue-600 underline">Dive into our latest nutrition articles</a>.`,
  },
  {
    keywords: ['book', 'appointment', 'consultation', 'doctor'],
    reply: `👩‍⚕️ Need expert advice? <a href="/find-doctors" class="text-blue-600 underline">Book a session with a certified nutritionist here</a>.`,
  },
  {
    keywords: ['exercise', 'workout', 'fitness', 'training','coach'],
    reply: `💪 Ready to move? <a href="/workout-videos" class="text-blue-600 underline">Explore workout videos and fitness routines</a>.`,
  },
  {
    keywords: ['shop', 'store', 'products', 'ecommerce','Buy'],
    reply: `🛍️ Looking for healthy products? <a href="/store" class="text-blue-600 underline">Visit our curated wellness store</a>.`,
  },
  {
    keywords: ['scanner', 'ai', 'food scan', 'smart scan','Food Scanner','Snap Meal'],
    reply: `🤖 Want to analyze your food instantly? <a href="/food-scanner" class="text-blue-600 underline">Try our AI-powered Food Scanner here</a>.`,
  },
  {
    keywords: ['contact', 'join', 'team', 'write', 'partner','complain'],
    reply: `👋 Interested in joining HealthHub as a doctor, writer, or seller? <a href="/contact" class="text-blue-600 underline">Reach out to us here</a>. We’d love to collaborate!`,
  },
  {
    keywords: ['services', 'what you offer', 'features'],
    reply: `🌟 Curious about what we offer? <a href="/services" class="text-blue-600 underline">Check out all our services here</a>.`,
  },
  {
    keywords: ['testimonial', 'feedback', 'reviews'],
    reply: `💬 Want to hear what others think? <a href="/testimonials" class="text-blue-600 underline">Read our users’ feedback here</a>.`,
  },
];

const arabicRoutes = [
  {
    keywords: ['حاسبة', 'مؤشر', 'تحليل', 'اداة', 'السعرات', 'الدهون','تحليل الوزن'],
    reply: `🧮 تقدر تحلل جسمك وتستخدم الأدوات الذكية من <a href="/calculators" class="text-blue-600 underline">هنا</a>.`,
  },
  {
    keywords: ['مقالة','مقالات', 'معلومة', 'نصائح', 'بلوج', 'قراءة'],
    reply: `📚 مهتم بالتغذية؟ <a href="/articles" class="text-blue-600 underline">اقرأ أحدث مقالاتنا من هنا</a>.`,
  },
  {
    keywords: ['دكاترة','احجز', 'استشارة', 'دكتور', 'خبير','اتخن','اخس','اخسس'],
    reply: `👩‍⚕️ محتاج مساعدة؟ <a href="/find-doctors" class="text-blue-600 underline">احجز مع أخصائي تغذية من هنا</a>.`,
  },
 {
  keywords: ['رياضة', 'تمارين', 'لياقة', 'كارديو', 'جدول', 'فيديوهات', 'تدريب', 'تمرين'],
  reply: `💪 جاهز تتحرك؟ تقدر تلاقي فيديوهات رياضية وتمارين متنوعة <a href="/workout-videos" class="text-blue-600 underline">من هنا</a>.`,
},

  {
    keywords: ['شراء','متجر', 'منتجات', 'تسوق', 'صحي','اشتري'],
    reply: `🛍️ محتاج تشتري منتجات صحية؟ <a href="/store" class="text-blue-600 underline">زور متجرنا الصحي من هنا</a>.`,
  },
  {
    keywords: ['سكان', 'ذكاء', 'سكانر', 'تحليل أكل','نسبة الدهون','أكلي'],
    reply: `🤖 عايز تحلل أكلك؟ <a href="/food-scanner" class="text-blue-600 underline">جرب سكانر الأكل الذكي من هنا</a>.`,
  },
  {
    keywords: ['انضم', 'تواصل', 'فريق', 'كاتب', 'شراكة','شكوي','اعلان','اتعاون','نتعاون'],
    reply: `👋 حابب تنضم لفريق HealthHub كدكتور أو كاتب أو بائع؟ <a href="/contact" class="text-blue-600 underline">كلمنا من هنا</a>.`,
  },
  {
    keywords: ['خدمات', 'مميزات', 'العرض','عروض','اوفرز','خصومات'],
    reply: `🌟 عايز تعرف بنقدم إيه؟ <a href="/services" class="text-blue-600 underline">شوف كل خدماتنا من هنا</a>.`,
  },
  {
    keywords: ['تجارب','آراء', 'ريفيوهات'],
    reply: `💬 اسمع تجارب الناس معانا <a href="/testimonials" class="text-blue-600 underline">من هنا</a>.`,
  },
];

const greetings = {
  ar: ['السلام عليكم', 'ازيك', 'أزيك', 'اهلا', 'مرحبا', 'هاي', 'هلا','سلام'],
  en: ['hi', 'hello', 'hey', 'good morning', 'good evening','how are you'],
};

const friendlyReply = {
  ar: '👋 أهلاً بيك! ازاي أساعدك في موقعنا؟ اسألني عن أي خدمة أو صفحة وهوجّهك فورًا.',
  en: '👋 Hey there! How can I help you explore our site? Just ask me about anything you need.',
};

function detectLanguage(text: string): 'ar' | 'en' {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text) ? 'ar' : 'en';
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 <strong>Welcome to HealthHub!</strong><br />
I'm your assistant here to help you explore our platform.<br />
Feel free to ask about:<br />
• Nutrition consultations
• Healthy product store
• AI food scanner
• Workout videos
• Nutrition tools & articles
• Joining our team

Type your question, and I’ll guide you to the right place! 😊

`,

    },{
    role: 'assistant',
    content: `👋 أهلا بيك في <strong>HealthHub</strong>!<br />
انا هنا عشان اساعدك تتحرك بسهولة في الموقع.<br />
تقدر تسألني عن:<br />
• استشارات التغذية
• متجر المنتجات الصحية
• سكانر الأكل بالذكاء الصناعي
• فيديوهات التمارين
• أدوات ومقالات التغذية
• الانضمام لفريقنا
كل المطلوب هتقولي عايز خدمة اي بالظبط وانا هوصلك بيه😊ها تحب نبدأ بـ إيه؟`,
  },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWithAnimation();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const openWithAnimation = () => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userLang = detectLanguage(input);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const lowerInput = input.toLowerCase();
    const greeting = greetings[userLang].find((g) => lowerInput.includes(g));
    if (greeting) {
      setMessages([...newMessages, { role: 'assistant', content: friendlyReply[userLang] }]);
      setLoading(false);
      return;
    }

    const routes = userLang === 'ar' ? arabicRoutes : englishRoutes;
    const matched = routes.find((route) =>
      route.keywords.some((kw) => lowerInput.includes(kw))
    );

    if (matched) {
      setMessages([...newMessages, { role: 'assistant', content: matched.reply }]);
      setLoading(false);
      return;
    }

    setMessages([
      ...newMessages,
      {
        role: 'assistant',
        content:
          userLang === 'ar'
            ? '🤔 مش فاهم قصدك. ممكن تعيد صياغة السؤال؟'
            : "🤔 I'm not sure I got that. Could you rephrase your question?",
      },
    ]);
    setLoading(false);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={openWithAnimation}
          className="fixed bottom-5 left-5 z-50 text-blue-600 hover:text-blue-800 transition-all"
        >
          <FaRobot size={48} />
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed left-0 bottom-0 w-full sm:w-[400px] bg-white border-t border-blue-500 shadow-2xl flex flex-col z-50 transition-all duration-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          } ${isCollapsed ? 'h-[56px]' : 'h-[85vh]'}`}
        >
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <span className="text-lg font-semibold">HealthBot 🤖</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hover:text-gray-200"
                title="Collapse"
              >
                <ChevronDown
                  size={20}
                  className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                />
              </button>
              <button
                onClick={closeWithAnimation}
                className="text-white text-xl hover:text-gray-200"
                title="Close"
              >
                ✖
              </button>
            </div>
          </div>

          {!isCollapsed && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-blue-50 font-sans leading-relaxed">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 rounded-xl max-w-[85%] break-words whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'ml-auto bg-blue-100 text-right text-gray-800'
                        : 'mr-auto bg-white text-left text-gray-900 border border-blue-100'
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                ))}
                {loading && <div className="text-gray-400 italic">Typing...</div>}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex border-t p-3 bg-white">
                <input
                  type="text"
                  dir="auto"
                  className="flex-1 border border-blue-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

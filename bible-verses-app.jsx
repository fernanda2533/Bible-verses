import React, { useState, useEffect } from 'react';
import { Heart, Sun, Cloud, Smile, Frown, AlertCircle, Coffee, Moon, Star, BookOpen, LogOut, CheckCircle, Sparkles } from 'lucide-react';

const BibliaVersosApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(null);
  const [showVerse, setShowVerse] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [verseHistory, setVerseHistory] = useState([]);

  // Inicializar estado do armazenamento
  useEffect(() => {
    loadUserSession();
    loadVerseHistory();
  }, []);

  const loadUserSession = async () => {
    try {
      const session = await window.storage.get('current_user');
      if (session) {
        const userData = JSON.parse(session.value);
        setCurrentUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Nenhuma sessão ativa');
    }
  };

  const loadVerseHistory = async () => {
    try {
      const history = await window.storage.get('verse_history');
      if (history) {
        setVerseHistory(JSON.parse(history.value));
      }
    } catch (error) {
      console.log('Sem histórico');
    }
  };

  const saveVerseHistory = async (verse, emotion) => {
    const newHistory = [{
      verse,
      emotion,
      timestamp: new Date().toISOString()
    }, ...verseHistory].slice(0, 10); // Mantém apenas os últimos 10
    
    setVerseHistory(newHistory);
    await window.storage.set('verse_history', JSON.stringify(newHistory));
  };

  // Gerar palavra do dia baseada na data atual
  const getDailyVerse = () => {
    const allVerses = Object.values(versePairs).flat();
    const today = new Date().getDate();
    return allVerses[today % allVerses.length];
  };

  // Banco de dados de versículos com gradientes visuais
  const versePairs = {
    feliz: [
      { 
        text: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", 
        ref: "Salmos 118:24",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        pattern: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "Alegrem-se sempre no Senhor. Novamente direi: alegrem-se!", 
        ref: "Filipenses 4:4",
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        pattern: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)"
      },
      { 
        text: "O coração alegre aformoseia o rosto, mas com a tristeza do coração o espírito se abate.", 
        ref: "Provérbios 15:13",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #feada6 100%)",
        pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      }
    ],
    triste: [
      { 
        text: "O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.", 
        ref: "Salmos 34:18",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        pattern: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "Não temas, porque eu estou contigo; não te assombres, porque eu sou teu Deus.", 
        ref: "Isaías 41:10",
        gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        pattern: "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.12) 0%, transparent 50%)"
      },
      { 
        text: "Bem-aventurados os que choram, porque serão consolados.", 
        ref: "Mateus 5:4",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        pattern: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)"
      }
    ],
    ansioso: [
      { 
        text: "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições.", 
        ref: "Filipenses 4:6",
        gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        pattern: "radial-gradient(circle at 40% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "Lança sobre o Senhor a tua carga, e ele te susterá; jamais permitirá que o justo seja abalado.", 
        ref: "Salmos 55:22",
        gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
        pattern: "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.15) 0%, transparent 50%)"
      },
      { 
        text: "Portanto, não se preocupem com o amanhã, pois o amanhã trará as suas próprias preocupações.", 
        ref: "Mateus 6:34",
        gradient: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
        pattern: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.12) 0%, transparent 50%)"
      }
    ],
    cansado: [
      { 
        text: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.", 
        ref: "Mateus 11:28",
        gradient: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
        pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "Ele dá força ao cansado e multiplica as forças ao que não tem nenhum vigor.", 
        ref: "Isaías 40:29",
        gradient: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
        pattern: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)"
      },
      { 
        text: "Mas os que esperam no Senhor renovam as suas forças.", 
        ref: "Isaías 40:31",
        gradient: "linear-gradient(135deg, #feb692 0%, #ea5455 100%)",
        pattern: "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      }
    ],
    grato: [
      { 
        text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", 
        ref: "1 Tessalonicenses 5:18",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        pattern: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.12) 0%, transparent 50%)"
      },
      { 
        text: "Entrem por suas portas com ações de graças e em seus átrios, com louvor.", 
        ref: "Salmos 100:4",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        pattern: "radial-gradient(circle at 60% 60%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "Deem graças ao Senhor, porque ele é bom; o seu amor dura para sempre.", 
        ref: "Salmos 107:1",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
        pattern: "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)"
      }
    ],
    sozinho: [
      { 
        text: "Nunca o deixarei, nunca o abandonarei.", 
        ref: "Hebreus 13:5",
        gradient: "linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)",
        pattern: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 0%, transparent 50%)"
      },
      { 
        text: "Ainda que meu pai e minha mãe me abandonem, o Senhor me acolherá.", 
        ref: "Salmos 27:10",
        gradient: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
        pattern: "radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "Eis que estou convosco todos os dias até à consumação dos séculos.", 
        ref: "Mateus 28:20",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
        pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 50%)"
      }
    ],
    com_medo: [
      { 
        text: "Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação.", 
        ref: "2 Timóteo 1:7",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        pattern: "radial-gradient(circle at 30% 60%, rgba(255,255,255,0.15) 0%, transparent 50%)"
      },
      { 
        text: "O Senhor é a minha luz e a minha salvação; de quem terei medo?", 
        ref: "Salmos 27:1",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        pattern: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "Quando me sinto com medo, confio em ti.", 
        ref: "Salmos 56:3",
        gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        pattern: "radial-gradient(circle at 50% 70%, rgba(255,255,255,0.12) 0%, transparent 50%)"
      }
    ],
    esperancoso: [
      { 
        text: "Pois eu sei os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar.", 
        ref: "Jeremias 29:11",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        pattern: "radial-gradient(circle at 40% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
      },
      { 
        text: "A esperança que se adia faz o coração adoecer, mas o desejo realizado é árvore de vida.", 
        ref: "Provérbios 13:12",
        gradient: "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)",
        pattern: "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.15) 0%, transparent 50%)"
      },
      { 
        text: "E a esperança não confunde, porque o amor de Deus é derramado em nosso coração.", 
        ref: "Romanos 5:5",
        gradient: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
        pattern: "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.12) 0%, transparent 50%)"
      }
    ]
  };

  const emotions = [
    { id: 'feliz', label: 'Feliz', icon: Smile, color: 'from-yellow-400 to-orange-400' },
    { id: 'triste', label: 'Triste', icon: Frown, color: 'from-blue-400 to-indigo-400' },
    { id: 'ansioso', label: 'Ansioso', icon: AlertCircle, color: 'from-purple-400 to-pink-400' },
    { id: 'cansado', label: 'Cansado', icon: Coffee, color: 'from-amber-400 to-red-400' },
    { id: 'grato', label: 'Grato', icon: Heart, color: 'from-pink-400 to-rose-400' },
    { id: 'sozinho', label: 'Sozinho', icon: Moon, color: 'from-slate-400 to-gray-400' },
    { id: 'com_medo', label: 'Com Medo', icon: Cloud, color: 'from-cyan-400 to-blue-400' },
    { id: 'esperancoso', label: 'Esperançoso', icon: Star, color: 'from-green-400 to-emerald-400' }
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.log('Permissão de notificação negada');
      }
    }
  };

  const sendWelcomeEmail = async (userName, userEmail) => {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: `Crie um email de boas-vindas caloroso e inspirador para ${userName} que acabou de se cadastrar no aplicativo "Palavra Viva" - um app de versículos bíblicos personalizados. O email deve ser acolhedor, mencionar que receberão versículos baseados em suas emoções, e incluir um versículo de boas-vindas. Formate como um email profissional mas amigável.` 
            }
          ],
        })
      });

      const data = await response.json();
      const emailContent = data.content.find(c => c.type === 'text')?.text || '';
      
      console.log('=== EMAIL DE BOAS-VINDAS ===');
      console.log(`Para: ${userEmail}`);
      console.log(`Assunto: Bem-vindo(a) à Palavra Viva! 🙏`);
      console.log(emailContent);
      console.log('========================\n');
      
      return emailContent;
    } catch (error) {
      console.error('Erro ao gerar email:', error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userKey = `user:${loginForm.email}`;
      const userData = await window.storage.get(userKey);
      
      if (!userData) {
        showNotification('Email não cadastrado', 'error');
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData.value);
      
      if (user.password !== loginForm.password) {
        showNotification('Senha incorreta', 'error');
        setLoading(false);
        return;
      }

      const sessionData = { name: user.name, email: user.email };
      await window.storage.set('current_user', JSON.stringify(sessionData));
      
      setCurrentUser(sessionData);
      setIsAuthenticated(true);
      setLoginForm({ email: '', password: '' });
      showNotification(`Bem-vindo de volta, ${user.name}!`, 'success');
      
      // Solicitar permissão de notificação
      setTimeout(() => {
        requestNotificationPermission();
      }, 1000);
    } catch (error) {
      showNotification('Erro ao fazer login', 'error');
    }
    
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userKey = `user:${signupForm.email}`;
      try {
        const existingUser = await window.storage.get(userKey);
        if (existingUser) {
          showNotification('Este email já está cadastrado', 'error');
          setLoading(false);
          return;
        }
      } catch (error) {
        // Email não existe, pode prosseguir
      }

      const newUser = {
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
        createdAt: new Date().toISOString()
      };

      await window.storage.set(userKey, JSON.stringify(newUser));
      
      const sessionData = { name: newUser.name, email: newUser.email };
      await window.storage.set('current_user', JSON.stringify(sessionData));
      
      await sendWelcomeEmail(newUser.name, newUser.email);
      
      setCurrentUser(sessionData);
      setIsAuthenticated(true);
      setSignupForm({ name: '', email: '', password: '' });
      showNotification(`Conta criada! Bem-vindo(a), ${newUser.name}! 🎉`, 'success');
      
      // Solicitar permissão de notificação
      setTimeout(() => {
        requestNotificationPermission();
      }, 1500);
    } catch (error) {
      showNotification('Erro ao criar conta', 'error');
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await window.storage.delete('current_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSelectedEmotion(null);
    setCurrentVerse(null);
    setShowVerse(false);
    showNotification('Até logo! 👋', 'success');
  };

  const selectEmotion = (emotionId) => {
    setSelectedEmotion(emotionId);
    setShowVerse(false);
    setTimeout(() => {
      const verses = versePairs[emotionId];
      const randomVerse = verses[Math.floor(Math.random() * verses.length)];
      setCurrentVerse(randomVerse);
      saveVerseHistory(randomVerse, emotionId);
      setShowVerse(true);
    }, 300);
  };

  const resetSelection = () => {
    setShowVerse(false);
    setTimeout(() => {
      setSelectedEmotion(null);
      setCurrentVerse(null);
    }, 300);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            font-family: 'Inter', sans-serif;
          }
          
          h1, h2, h3, blockquote {
            font-family: 'Crimson Pro', serif;
          }
          
          .slide-up {
            animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .glow {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
          }
          
          .stars {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
          
          .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
        
        {/* Estrelas de fundo */}
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="star" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {notification && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 slide-up ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        )}
        
        <div className="w-full max-w-md slide-up relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 glow">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">
              Palavra Viva
            </h1>
            <p className="text-purple-200 text-lg">Encontre paz e conforto na Palavra de Deus</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setShowLogin(true)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  showLogin 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  !showLogin 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Cadastrar
              </button>
            </div>

            {showLogin ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">E-mail</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 focus:border-purple-400 focus:outline-none transition-colors bg-white/10 text-white placeholder-white/50"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Senha</label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 focus:border-purple-400 focus:outline-none transition-colors bg-white/10 text-white placeholder-white/50"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Entrando...' : 'Entrar na Palavra Viva'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Nome</label>
                  <input
                    type="text"
                    required
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 focus:border-purple-400 focus:outline-none transition-colors bg-white/10 text-white placeholder-white/50"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">E-mail</label>
                  <input
                    type="email"
                    required
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 focus:border-purple-400 focus:outline-none transition-colors bg-white/10 text-white placeholder-white/50"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Senha</label>
                  <input
                    type="password"
                    required
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 focus:border-purple-400 focus:outline-none transition-colors bg-white/10 text-white placeholder-white/50"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-purple-200 text-sm mt-6">
            "A tua palavra é lâmpada para os meus pés e luz para o meu caminho." - Salmos 119:105
          </p>
        </div>
      </div>
    );
  }

  const dailyVerse = getDailyVerse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, blockquote {
          font-family: 'Crimson Pro', serif;
        }
        
        .emotion-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .emotion-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        
        .emotion-card:hover::before {
          opacity: 1;
        }
        
        .emotion-card:hover {
          transform: translateY(-8px) scale(1.03);
        }
        
        .emotion-card:active {
          transform: scale(0.97);
        }
        
        .verse-appear {
          animation: verseAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes verseAppear {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
          }
          50% {
            box-shadow: 0 0 50px rgba(168, 85, 247, 0.6);
          }
        }
        
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .verse-bg {
          position: relative;
          background-size: cover;
          background-position: center;
        }
        
        .verse-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.25);
          border-radius: 1.5rem;
          z-index: 1;
        }
        
        .verse-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.3;
          border-radius: 1.5rem;
          z-index: 2;
        }
        
        .verse-content {
          position: relative;
          z-index: 3;
        }
        
        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 15s infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
      `}</style>

      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 slide-up ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 slide-in">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center pulse-glow">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Palavra Viva
              </h1>
              <p className="text-sm text-purple-200">Olá, {currentUser?.name}!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!selectedEmotion ? (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                Como você está se sentindo hoje?
              </h2>
              <p className="text-xl text-purple-200">
                Compartilhe suas emoções e receba uma palavra de conforto
              </p>
            </div>

            {/* Card Palavra do Dia */}
            <div 
              className="verse-bg rounded-3xl shadow-2xl overflow-hidden border-2 border-white/20"
              style={{ background: dailyVerse.gradient }}
            >
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{ 
                  background: dailyVerse.pattern,
                  zIndex: 2
                }}
              />
              
              <div className="verse-content p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-6 h-6 text-white" />
                  <h3 className="text-2xl font-bold text-white">Palavra do Dia</h3>
                </div>
                <blockquote className="text-xl sm:text-2xl font-serif text-white leading-relaxed mb-4 italic">
                  "{dailyVerse.text}"
                </blockquote>
                <cite className="text-lg font-semibold text-white/90">
                  — {dailyVerse.ref}
                </cite>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emotions.map((emotion, index) => {
                const Icon = emotion.icon;
                return (
                  <button
                    key={emotion.id}
                    onClick={() => selectEmotion(emotion.id)}
                    className="emotion-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${emotion.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-lg">{emotion.label}</h3>
                  </button>
                );
              })}
            </div>

            {verseHistory.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Histórico Recente
                </h3>
                <div className="space-y-3">
                  {verseHistory.slice(0, 3).map((item, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-purple-300 text-sm mb-1">
                        {emotions.find(e => e.id === item.emotion)?.label}
                      </p>
                      <p className="text-white text-sm italic">"{item.verse.text}"</p>
                      <p className="text-purple-400 text-xs mt-2">— {item.verse.ref}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={resetSelection}
              className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors font-semibold"
            >
              ← Voltar às emoções
            </button>

            {showVerse && currentVerse && (
              <div className="verse-appear">
                <div 
                  className="verse-bg rounded-3xl shadow-2xl overflow-hidden"
                  style={{ 
                    background: currentVerse.gradient
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-3xl"
                    style={{ 
                      background: currentVerse.pattern,
                      zIndex: 2
                    }}
                  />
                  
                  {/* Partículas flutuantes */}
                  <div className="floating-particles">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 5}s`,
                          animationDuration: `${10 + Math.random() * 10}s`
                        }}
                      />
                    ))}
                  </div>

                  <div className="verse-content p-8 sm:p-12 min-h-[500px] flex flex-col justify-center">
                    <div className="text-center space-y-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full pulse-glow border-2 border-white/30">
                        {(() => {
                          const emotion = emotions.find(e => e.id === selectedEmotion);
                          const Icon = emotion?.icon || BookOpen;
                          return <Icon className="w-10 h-10 text-white" />;
                        })()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">
                          Para quando você está {emotions.find(e => e.id === selectedEmotion)?.label.toLowerCase()}
                        </p>
                        <blockquote className="text-2xl sm:text-4xl font-serif text-white leading-relaxed mb-6 drop-shadow-2xl px-4">
                          "{currentVerse.text}"
                        </blockquote>
                        <cite className="text-xl font-semibold text-white/90 drop-shadow-lg">
                          — {currentVerse.ref}
                        </cite>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <button
                          onClick={() => selectEmotion(selectedEmotion)}
                          className="px-6 py-3 bg-white/30 backdrop-blur-md text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border border-white/40"
                        >
                          Ver outro versículo
                        </button>
                        <button
                          onClick={resetSelection}
                          className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all"
                        >
                          Escolher outra emoção
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6 text-purple-200 text-sm">
                  <p>"Porque a palavra de Deus é viva e eficaz" - Hebreus 4:12</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliaVersosApp;

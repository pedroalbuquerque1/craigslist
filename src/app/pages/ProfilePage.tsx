import { useNavigate } from "react-router";
import { Home, Search, Plus, MessageSquare, User, Star, ChevronRight, Settings, Shield, HelpCircle, LogOut, Package } from "lucide-react";
import { mockItems } from "../data/mockData";

const userListings = mockItems.slice(0, 3);

const menuItems = [
  { icon: Package, label: "Meus Anúncios", sublabel: "3 ativos", path: "/search" },
  { icon: Star, label: "Avaliações", sublabel: "4.8 · 124 reviews", path: null },
  { icon: Shield, label: "Verificação", sublabel: "Conta verificada", path: null },
  { icon: Settings, label: "Configurações", sublabel: null, path: null },
  { icon: HelpCircle, label: "Ajuda & Suporte", sublabel: null, path: null },
];

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto">
      {/* Header */}
      <header className="bg-[#f9f9fc] px-4 pt-4 pb-3 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-[32px] text-[#632ce5] leading-[40px] tracking-[-0.64px]">
            VibeClassifieds
          </h1>
          <button className="p-2">
            <Settings className="w-6 h-6 text-[#494455]" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Profile Card */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#632ce5] to-[#7c4dff] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">J</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#62ff96] rounded-full border-2 border-[#f9f9fc] flex items-center justify-center">
                <svg className="w-3 h-3" fill="#005226" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-xl text-[#1a1c1e]">João Silva</h2>
              <p className="text-sm text-[#494455]">Membro desde 2021</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-[#632ce5] text-[#632ce5]" : "fill-none text-[#cac3d8]"}`} />
                ))}
                <span className="text-xs text-[#494455] ml-1">4.8 (124)</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { value: "3", label: "Anúncios" },
              { value: "47", label: "Vendas" },
              { value: "124", label: "Avaliações" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="font-bold text-[22px] text-[#632ce5] leading-tight">{stat.value}</p>
                <p className="text-xs text-[#494455] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Edit Profile Button */}
          <button className="w-full py-3 border border-[#632ce5] text-[#632ce5] rounded-full font-semibold text-sm mb-6">
            Editar Perfil
          </button>

          {/* My Listings */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-[#1a1c1e]">Meus Anúncios</h3>
              <button className="text-[#632ce5] text-sm font-semibold" onClick={() => navigate("/search")}>
                Ver todos →
              </button>
            </div>
            <div className="space-y-3">
              {userListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-3 shadow-sm flex gap-3 cursor-pointer"
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#1a1c1e] truncate">{item.title}</p>
                    <p className="text-[#632ce5] font-bold text-base">
                      R$ {item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ backgroundColor: item.categoryColor, color: item.categoryTextColor }}
                      >
                        {item.category}
                      </div>
                      <span className="text-xs text-[#8e8b9a]">{item.publishedTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-4 py-4 text-left active:bg-[#f3f0fb] ${index < menuItems.length - 1 ? "border-b border-[#f0f0f3]" : ""}`}
                onClick={() => item.path && navigate(item.path)}
              >
                <div className="w-9 h-9 bg-[#ede8fb] rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#632ce5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#1a1c1e]">{item.label}</p>
                  {item.sublabel && <p className="text-xs text-[#8e8b9a]">{item.sublabel}</p>}
                </div>
                <ChevronRight className="w-5 h-5 text-[#cac3d8]" />
              </button>
            ))}
          </div>

          <button className="w-full flex items-center gap-4 px-4 py-4 bg-white rounded-2xl shadow-sm text-left">
            <div className="w-9 h-9 bg-[#fff0f0] rounded-xl flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5 text-[#e53e3e]" />
            </div>
            <span className="font-semibold text-sm text-[#e53e3e]">Sair da Conta</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[390px] mx-auto">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate("/")}>
            <Home className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Home</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate("/search")}>
            <Search className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Search</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate("/post")}>
            <div className="bg-[#632ce5] rounded-full p-3 -mt-6 shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-[#632ce5] font-medium mt-1">Post</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate("/messages")}>
            <MessageSquare className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Messages</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4">
            <div className="bg-[#632ce5] rounded-full p-2 mb-1">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#632ce5] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

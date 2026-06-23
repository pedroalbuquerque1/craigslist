import { useState } from "react";
import { useNavigate } from "react-router";
import { Home, MessageSquare, Plus, Search as SearchIcon, User, Wrench } from "lucide-react";
import { categories, mockItems } from "../data/mockData";

function normalizeSearchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getCategoryIcon(icon: string) {
  if (icon === "home") return <Home className="w-6 h-6 text-white" />;
  if (icon === "shopping-bag") {
    return (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    );
  }

  return <Wrench className="w-6 h-6 text-white" />;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = normalizeSearchText(searchTerm.trim());
  const filteredItems = normalizedSearch
    ? mockItems.filter((item) =>
        normalizeSearchText(
          [item.title, item.category, item.location, item.description].join(" "),
        ).includes(normalizedSearch),
      )
    : mockItems;
  const nearbyItems = filteredItems.slice(0, 2);
  const featuredItems = filteredItems.slice(2, 5);

  function openSection(sectionId: string) {
    navigate(`/search?section=${sectionId}`);
  }

  return (
    <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto">
      <header className="bg-[#f9f9fc] px-4 py-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10" aria-hidden="true" />
          <h1 className="font-bold text-[32px] text-[#632ce5] leading-[40px] tracking-[-0.64px]">
            VibeClassifieds
          </h1>
          <div className="w-10" aria-hidden="true" />
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="O que voce esta procurando?"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() =>
              navigate(
                normalizedSearch
                  ? `/search?query=${encodeURIComponent(searchTerm.trim())}`
                  : "/search",
              )
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-6">
          <button
            className="w-full bg-gradient-to-r rounded-2xl p-4 mb-4 flex items-center justify-between text-left"
            style={{ backgroundImage: `linear-gradient(to right, ${categories[0].bgColor}, ${categories[0].bgColor})` }}
            onClick={() => openSection(categories[0].id)}
          >
            <div>
              <h3 className="font-semibold text-lg" style={{ color: categories[0].color }}>
                {categories[0].name}
              </h3>
              <p className="text-sm" style={{ color: categories[0].color }}>
                {categories[0].subtitle}
              </p>
            </div>
            <div className="rounded-full p-4" style={{ backgroundColor: categories[0].color }}>
              {getCategoryIcon(categories[0].icon)}
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4">
            {categories.slice(1).map((category) => (
              <button
                key={category.id}
                className="bg-gradient-to-br rounded-2xl p-4 text-left"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${category.bgColor}, ${category.bgColor})` }}
                onClick={() => openSection(category.id)}
              >
                <div
                  className="rounded-full w-12 h-12 flex items-center justify-center mb-3"
                  style={{ backgroundColor: category.color }}
                >
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-semibold text-base mb-1" style={{ color: category.color }}>
                  {category.name}
                </h3>
                <p className="text-xs" style={{ color: category.color }}>
                  {category.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl text-[#1a1c1e]">Itens perto de voce</h2>
            <button className="text-[#632ce5] font-semibold text-sm" onClick={() => navigate("/search")}>
              Ver todos →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {nearbyItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-[#632ce5] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    R$ {item.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-[#1a1c1e] line-clamp-2 mb-1">{item.title}</h3>
                  <p className="text-xs text-[#494455] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mb-6">
          <h2 className="font-bold text-xl text-[#1a1c1e] mb-4">Destaques recentes</h2>

          <div className="space-y-4">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm flex gap-4 cursor-pointer"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  <span
                    className="absolute top-1 left-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
                    style={{ backgroundColor: item.categoryColor, color: item.categoryTextColor }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-[#1a1c1e] mb-1 truncate">{item.title}</h3>
                  <p className="text-[#632ce5] font-bold text-lg mb-1">R$ {item.price.toLocaleString()}</p>
                  <p className="text-xs text-[#494455]">Disponivel em: {item.locationDetail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[390px] mx-auto">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4">
            <div className="bg-[#632ce5] rounded-full p-2 mb-1">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#632ce5] font-medium">Home</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate("/search")}>
            <SearchIcon className="w-6 h-6 text-[#494455] mb-1" />
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

          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate("/profile")}>
            <User className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

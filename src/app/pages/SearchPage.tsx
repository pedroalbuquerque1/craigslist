import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Home as HomeIcon,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  User,
  Wrench,
} from "lucide-react";
import { categories, getSectionById, mapBackgroundImage, mockItems, type MarketplaceSectionId } from "../data/mockData";

function getSectionIcon(sectionId: MarketplaceSectionId) {
  if (sectionId === "properties") return <HomeIcon className="w-6 h-6 text-white" />;
  if (sectionId === "sales") {
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

function normalizeSearchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"list" | "map">("map");
  const [filters] = useState({
    priceMin: 0,
    priceMax: 5000,
    distance: 50,
  });

  const activeSection = searchParams.get("section") as MarketplaceSectionId | null;
  const query = searchParams.get("query")?.trim() ?? "";
  const normalizedQuery = normalizeSearchText(query);

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      const matchesSection = activeSection ? item.sectionId === activeSection : true;
      const matchesQuery = normalizedQuery
        ? normalizeSearchText([item.title, item.category, item.description, item.location].join(" ")).includes(normalizedQuery)
        : true;
      const matchesPrice = item.price >= filters.priceMin && item.price <= filters.priceMax;
      return matchesSection && matchesQuery && matchesPrice;
    });
  }, [activeSection, filters.priceMax, filters.priceMin, normalizedQuery]);

  const sectionMeta = activeSection ? getSectionById(activeSection) : null;
  const mapItems = filteredItems.slice(0, 2);

  function handleSectionFilter(sectionId: MarketplaceSectionId) {
    const nextParams = new URLSearchParams(searchParams);
    if (activeSection === sectionId) {
      nextParams.delete("section");
    } else {
      nextParams.set("section", sectionId);
    }
    setSearchParams(nextParams);
  }

  return (
    <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto">
      <header className="bg-[#f9f9fc] px-4 py-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8" aria-hidden="true" />
          <h1 className="font-bold text-[32px] text-[#632ce5] leading-[40px] tracking-[-0.64px]">
            VibeClassifieds
          </h1>
          <div className="w-8" aria-hidden="true" />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-colors ${
              viewMode === "list" ? "bg-[#632ce5] text-white" : "bg-[#e2e2e5] text-[#494455]"
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-colors ${
              viewMode === "map" ? "bg-[#632ce5] text-white" : "bg-[#e2e2e5] text-[#494455]"
            }`}
          >
            Mapa
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                className={`px-4 py-2 border rounded-full whitespace-nowrap ${
                  isActive ? "text-white border-transparent" : "border-[#cac3d8] bg-white text-[#494455]"
                }`}
                style={isActive ? { backgroundColor: section.color } : undefined}
                onClick={() => handleSectionFilter(section.id)}
              >
                <span className="font-medium text-sm">{section.name}</span>
              </button>
            );
          })}

          <button className="px-4 py-2 border border-[#cac3d8] rounded-full bg-white whitespace-nowrap">
            <span className="font-medium text-sm">Preco: R$ {filters.priceMin} - {filters.priceMax}</span>
          </button>

          <button className="px-4 py-2 border border-[#cac3d8] rounded-full bg-white whitespace-nowrap">
            <span className="font-medium text-sm">Distancia: {filters.distance}km</span>
          </button>
        </div>

        {(sectionMeta || query) && (
          <div className="mt-3 text-sm text-[#494455]">
            {sectionMeta ? <span className="font-semibold text-[#1a1c1e]">{sectionMeta.name}</span> : "Todos"}
            {query ? ` • busca: "${query}"` : ""}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-hidden relative">
        {viewMode === "map" ? (
          <div className="w-full h-full bg-gray-200 relative overflow-hidden">
            <img
              src={mapBackgroundImage}
              alt="Mapa de proximidade"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10" />

            {mapItems.map((item, index) => {
              const section = getSectionById(item.sectionId);
              const positions = [
                "top-1/3 left-1/4",
                "top-1/2 left-1/2",
              ];

              return (
                <div key={item.id} className={`absolute ${positions[index] ?? "top-1/4 left-1/3"}`}>
                  <div
                    className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ backgroundColor: section.color }}
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    {getSectionIcon(item.sectionId)}
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-24 left-4 right-4 space-y-4">
              {mapItems.length > 0 ? (
                mapItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 shadow-lg cursor-pointer"
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="px-2 py-1 rounded-full text-[10px] font-semibold inline-block mb-1 uppercase"
                          style={{ backgroundColor: item.categoryColor, color: item.categoryTextColor }}
                        >
                          {item.category}
                        </div>
                        <h3 className="font-semibold text-sm text-[#1a1c1e] truncate mb-1">{item.title}</h3>
                        <p className="text-xs text-[#494455] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          A {item.distance} de voce
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-[#632ce5] font-bold text-lg">
                        {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <p className="font-semibold text-[#1a1c1e] mb-1">Nenhum resultado encontrado</p>
                  <p className="text-sm text-[#494455]">Tente trocar a categoria ou limpar a busca.</p>
                </div>
              )}
            </div>

            <button className="absolute bottom-6 right-6 bg-[#632ce5] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="p-4 overflow-y-auto h-full pb-24">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <p className="font-semibold text-[#1a1c1e] mb-1">Nenhum anuncio encontrado</p>
                <p className="text-sm text-[#494455]">Ajuste a categoria ou tente outra busca.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    <div className="flex gap-4 p-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="px-2 py-1 rounded-full text-[10px] font-semibold inline-block mb-2 uppercase"
                          style={{ backgroundColor: item.categoryColor, color: item.categoryTextColor }}
                        >
                          {item.category}
                        </div>
                        <h3 className="font-semibold text-base text-[#1a1c1e] line-clamp-2 mb-1">{item.title}</h3>
                        <p className="text-[#632ce5] font-bold text-xl mb-2">
                          {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        <p className="text-xs text-[#494455] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.distance} • {item.publishedTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[390px] mx-auto">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate("/")}>
            <HomeIcon className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Home</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4">
            <div className="bg-[#632ce5] rounded-full p-2 mb-1">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#632ce5] font-medium">Search</span>
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

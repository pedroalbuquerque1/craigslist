import { useState } from "react";
import { useNavigate } from "react-router";
import { mapBackgroundImage, mockItems } from "../data/mockData";
import { Search, MapPin, Home as HomeIcon, Plus, MessageSquare, User } from "lucide-react";

export default function SearchPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "map">("map");
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000,
    distance: 50,
  });

  return (
    <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto">
      {/* Header */}
      <header className="bg-[#f9f9fc] px-4 py-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8" aria-hidden="true" />
          <h1 className="font-bold text-[32px] text-[#632ce5] leading-[40px] tracking-[-0.64px]">
            VibeClassifieds
          </h1>
          <div className="w-8" aria-hidden="true" />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-colors ${
              viewMode === "list"
                ? "bg-[#632ce5] text-white"
                : "bg-[#e2e2e5] text-[#494455]"
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-colors ${
              viewMode === "map"
                ? "bg-[#632ce5] text-white"
                : "bg-[#e2e2e5] text-[#494455]"
            }`}
          >
            Mapa
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#cac3d8] rounded-full bg-white whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="font-medium text-sm">Filtros</span>
          </button>
          
          <button className="px-4 py-2 border border-[#cac3d8] rounded-full bg-white whitespace-nowrap">
            <span className="font-medium text-sm">Preço: R$ {filters.priceMin} - {filters.priceMax}k</span>
          </button>
          
          <button className="px-4 py-2 border border-[#cac3d8] rounded-full bg-white whitespace-nowrap">
            <span className="font-medium text-sm">Distância: {filters.distance}km</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {viewMode === "map" ? (
          <div className="w-full h-full bg-gray-200 relative overflow-hidden">
            <img
              src={mapBackgroundImage}
              alt="Mapa de proximidade"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10" />
            {/* Map placeholder */}
            <div className="absolute inset-0 hidden items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Mapa de Proximidade</p>
              </div>
            </div>

            {/* Map Markers */}
            <div className="absolute top-1/3 left-1/4">
              <div className="relative">
                <div className="bg-[#632ce5] rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2">
              <div className="relative">
                <div className="bg-[#006832] rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute bottom-24 left-4 right-4 space-y-4">
              <div
                className="bg-white rounded-xl p-4 shadow-lg cursor-pointer"
                onClick={() => navigate('/item/1')}
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={mockItems[0].images[0]}
                      alt={mockItems[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-[#62ff96] text-[#005226] px-2 py-1 rounded-full text-[10px] font-semibold inline-block mb-1 uppercase">
                      Imóvel
                    </div>
                    <h3 className="font-semibold text-sm text-[#1a1c1e] truncate mb-1">
                      Loft Moderno Centro
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-[#494455] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        A 800m de você
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[#632ce5] font-bold text-lg">R$ 4.200</p>
                </div>
              </div>

              <div
                className="bg-white rounded-xl p-4 shadow-lg cursor-pointer"
                onClick={() => navigate('/item/2')}
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={mockItems[1].images[0]}
                      alt={mockItems[1].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-[#00affe] text-[#003f5f] px-2 py-1 rounded-full text-[10px] font-semibold inline-block mb-1 uppercase">
                      Tecnologia
                    </div>
                    <h3 className="font-semibold text-sm text-[#1a1c1e] truncate mb-1">
                      Kit Tech Pro
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-[#494455] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        A 2km de você
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[#632ce5] font-bold text-lg">R$ 1.200</p>
                </div>
              </div>
            </div>

            {/* Floating Action Button */}
            <button className="absolute bottom-6 right-6 bg-[#632ce5] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="p-4 overflow-y-auto h-full pb-24">
            <div className="space-y-4">
              {mockItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  <div className="flex gap-4 p-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="px-2 py-1 rounded-full text-[10px] font-semibold inline-block mb-2 uppercase"
                        style={{
                          backgroundColor: item.categoryColor,
                          color: item.categoryTextColor,
                        }}
                      >
                        {item.category}
                      </div>
                      <h3 className="font-semibold text-base text-[#1a1c1e] line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#632ce5] font-bold text-xl mb-2">
                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[390px] mx-auto">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate('/')}>
            <HomeIcon className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Home</span>
          </button>
          
          <button className="flex flex-col items-center py-2 px-4">
            <div className="bg-[#632ce5] rounded-full p-2 mb-1">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#632ce5] font-medium">Search</span>
          </button>
          
          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate('/post')}>
            <div className="bg-[#632ce5] rounded-full p-3 -mt-6 shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-[#632ce5] font-medium mt-1">Post</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate('/messages')}>
            <MessageSquare className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Messages</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4" onClick={() => navigate('/profile')}>
            <User className="w-6 h-6 text-[#494455] mb-1" />
            <span className="text-xs text-[#494455]">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { mapBackgroundImage, mockItems } from "../data/mockData";
import { ArrowLeft, Share2, Heart, MapPin, Star, Phone, MessageCircle, ChevronDown } from "lucide-react";

export default function ItemDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id) || mockItems[0];
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fullDescription = item.description;
  const shortDescription = fullDescription.length > 150 
    ? fullDescription.substring(0, 150) + "..."
    : fullDescription;

  return (
    <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#f9f9fc] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] z-10 max-w-[390px] mx-auto">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-1">
              <ArrowLeft className="w-6 h-6 text-[#494455]" />
            </button>
            <h1 className="font-bold text-[32px] text-[#632ce5] leading-[40px] tracking-[-0.64px]">
              VibeClassifieds
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <Share2 className="w-5 h-5 text-[#494455]" />
            </button>
            <button className="p-2">
              <Heart className="w-5 h-5 text-[#494455]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 pb-24">
        {/* Hero Image */}
        <div className="relative w-full h-[292.5px] bg-gray-200 overflow-hidden">
          <img
            src={item.images[currentImageIndex]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex gap-1">
            <div className="backdrop-blur-md bg-white/70 rounded-lg px-2 py-1">
              <span className="text-xs font-medium text-[#1a1c1e]">
                {currentImageIndex + 1}/{item.images.length}
              </span>
            </div>
            <div className="backdrop-blur-md bg-white/70 rounded-lg px-2 py-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-[#1a1c1e]">Fotos</span>
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div
                className="px-4 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: item.categoryColor,
                  color: item.categoryTextColor,
                }}
              >
                {item.category}
              </div>
              <span className="text-xs text-[#494455] font-medium">
                Publicado {item.publishedTime}
              </span>
            </div>

            <h2 className="font-bold text-[22px] leading-[28px] text-[#1a1c1e]">
              {item.title}
            </h2>

            <p className="font-bold text-[32px] leading-[40px] text-[#632ce5] tracking-[-0.64px]">
              € {item.price.toLocaleString()}
            </p>
          </div>

          <div className="h-px bg-[#cac3d8] opacity-30" />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-xl text-[#1a1c1e]">Descrição</h3>
            <p className="text-sm text-[#494455] leading-[22.75px]">
              {isDescriptionExpanded ? fullDescription : shortDescription}
            </p>
            {fullDescription.length > 150 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="flex items-center gap-1 text-[#632ce5] font-semibold text-sm"
              >
                {isDescriptionExpanded ? "Ler menos" : "Ler mais"}
                <ChevronDown className={`w-4 h-4 transition-transform ${isDescriptionExpanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>

          {/* Seller Information */}
          <div className="bg-[#f3f3f6] rounded-xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#cac3d8] rounded-full flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-[#1a1c1e]">
                    {item.seller.name}
                  </h4>
                  <p className="text-xs text-[#494455] font-medium">
                    Membro desde {item.seller.memberSince}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.seller.rating)
                          ? "fill-[#632ce5] text-[#632ce5]"
                          : "fill-none text-[#632ce5]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#494455] font-medium">
                  {item.seller.rating} ({item.seller.reviews} reviews)
                </p>
              </div>
            </div>
            
            <button className="w-full py-2 border border-[#cac3d8] rounded-lg font-semibold text-sm text-[#1a1c1e]">
              Ver Perfil Completo
            </button>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl text-[#1a1c1e]">Localização</h3>
              <span className="text-sm text-[#494455]">{item.location}</span>
            </div>
            
            <div className="relative h-48 bg-gray-200 rounded-xl overflow-hidden">
              <img
                src={mapBackgroundImage}
                alt={`Região de ${item.location}`}
                className="w-full h-full object-cover opacity-40 blur-[1px] scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#f9f9fc]/40">
                <div className="bg-[#632ce5]/20 rounded-full p-3">
                  <MapPin className="w-6 h-6 text-[#632ce5]" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Specific Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#eeeef0] rounded-lg p-4">
              <p className="text-xs text-[#494455] font-medium tracking-wider uppercase mb-1">
                TIPO
              </p>
              <p className="text-base text-[#1a1c1e]">{item.type}</p>
            </div>
            
            <div className="bg-[#eeeef0] rounded-lg p-4">
              <p className="text-xs text-[#494455] font-medium tracking-wider uppercase mb-1">
                CONDIÇÃO
              </p>
              <p className="text-base text-[#1a1c1e]">{item.condition}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#f9f9fc]/80 border-t border-[#cac3d8]/30 max-w-[390px] mx-auto">
        <div className="flex gap-4 px-4 py-4">
          <button className="bg-[#e2e2e5] rounded-full px-6 py-3.5 shadow-sm flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#1a1c1e]" />
            <span className="font-semibold text-sm text-[#1a1c1e]">Ligar</span>
          </button>
          
          <button
            onClick={() => navigate(`/chat/${item.id}`)}
            className="flex-1 bg-gradient-to-r from-[#632ce5] to-[#7c4dff] rounded-full px-6 py-3.5 shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="font-semibold text-sm text-white">Mandar Mensagem</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

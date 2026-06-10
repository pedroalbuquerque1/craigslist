import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Camera, X, ChevronDown, MapPin } from "lucide-react";

const categoryOptions = [
  { label: "Desporto e Lazer", color: "#62ff96", textColor: "#005226" },
  { label: "Tecnologia", color: "#00affe", textColor: "#003f5f" },
  { label: "Imóveis", color: "#bae6fd", textColor: "#0369a1" },
  { label: "Móveis", color: "#a3d5ff", textColor: "#003d5f" },
  { label: "Vestuário", color: "#ddd6fe", textColor: "#7c3aed" },
  { label: "Serviços", color: "#c3f4d9", textColor: "#006832" },
  { label: "Veículos", color: "#fde68a", textColor: "#78350f" },
  { label: "Outros", color: "#e2e2e5", textColor: "#494455" },
];

const conditionOptions = ["Novo", "Como Novo", "Seminovo", "Usado", "Para Peças"];

export default function PostPage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showConditionPicker, setShowConditionPicker] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  const isValid = title.trim() && price.trim() && category && condition && description.trim();

  function handlePublish() {
    if (!isValid) return;
    setStep("success");
  }

  if (step === "success") {
    return (
      <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto items-center justify-center px-8 text-center">
        <div className="w-24 h-24 bg-[#62ff96] rounded-full flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-12 h-12" fill="#005226" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="font-bold text-[28px] text-[#1a1c1e] mb-3">Anúncio publicado!</h2>
        <p className="text-[#494455] text-base mb-8">
          Seu anúncio <span className="font-semibold text-[#1a1c1e]">"{title}"</span> foi publicado com sucesso e já está visível para compradores.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gradient-to-r from-[#632ce5] to-[#7c4dff] text-white rounded-full py-4 font-semibold text-base shadow-lg mb-3"
        >
          Voltar para Home
        </button>
        <button
          onClick={() => { setStep("form"); setTitle(""); setPrice(""); setCategory(""); setCondition(""); setDescription(""); setLocation(""); }}
          className="w-full border border-[#cac3d8] text-[#494455] rounded-full py-4 font-semibold text-base"
        >
          Criar outro anúncio
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto">
      {/* Header */}
      <header className="bg-[#f9f9fc] px-4 py-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-1">
          <button className="p-1" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-[#494455]" />
          </button>
          <h1 className="font-bold text-[32px] text-[#632ce5] leading-[40px] tracking-[-0.64px]">
            VibeClassifieds
          </h1>
          <div className="w-8" />
        </div>
        <p className="font-bold text-xl text-[#1a1c1e] mt-2">Criar Anúncio</p>
      </header>

      {/* Form */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-28 space-y-5">
        {/* Photos */}
        <div>
          <p className="font-semibold text-sm text-[#1a1c1e] mb-2">Fotos</p>
          <div className="flex gap-3 flex-wrap">
            <button className="w-20 h-20 border-2 border-dashed border-[#cac3d8] rounded-xl flex flex-col items-center justify-center gap-1 bg-white">
              <Camera className="w-6 h-6 text-[#632ce5]" />
              <span className="text-[10px] text-[#632ce5] font-medium">Adicionar</span>
            </button>
            {photos.map((_, i) => (
              <div key={i} className="relative w-20 h-20 bg-gray-200 rounded-xl overflow-hidden">
                <button className="absolute top-1 right-1 bg-black/40 rounded-full p-0.5">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#8e8b9a] mt-1">Adicione até 10 fotos. A primeira será a capa.</p>
        </div>

        {/* Title */}
        <div>
          <p className="font-semibold text-sm text-[#1a1c1e] mb-2">Título *</p>
          <input
            type="text"
            placeholder="Ex: Bicicleta de estrada Specialized"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            className="w-full px-4 py-3 rounded-xl border border-[#cac3d8] bg-white text-sm text-[#1a1c1e] placeholder:text-[#8e8b9a] outline-none focus:border-[#632ce5]"
          />
          <p className="text-xs text-[#8e8b9a] mt-1 text-right">{title.length}/60</p>
        </div>

        {/* Price */}
        <div>
          <p className="font-semibold text-sm text-[#1a1c1e] mb-2">Preço *</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#494455]">R$</span>
            <input
              type="number"
              placeholder="0,00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#cac3d8] bg-white text-sm text-[#1a1c1e] placeholder:text-[#8e8b9a] outline-none focus:border-[#632ce5]"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="font-semibold text-sm text-[#1a1c1e] mb-2">Categoria *</p>
          <button
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#cac3d8] bg-white"
            onClick={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            {category ? (
              <span className="text-sm text-[#1a1c1e] font-medium">{category}</span>
            ) : (
              <span className="text-sm text-[#8e8b9a]">Selecionar categoria</span>
            )}
            <ChevronDown className={`w-5 h-5 text-[#494455] transition-transform ${showCategoryPicker ? "rotate-180" : ""}`} />
          </button>
          {showCategoryPicker && (
            <div className="mt-2 bg-white rounded-xl border border-[#cac3d8] overflow-hidden shadow-lg">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.label}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#f0f0f3] last:border-0 text-left"
                  onClick={() => { setCategory(cat.label); setShowCategoryPicker(false); }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-[#1a1c1e]">{cat.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Condition */}
        <div>
          <p className="font-semibold text-sm text-[#1a1c1e] mb-2">Condição *</p>
          <div className="flex flex-wrap gap-2">
            {conditionOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setCondition(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  condition === opt
                    ? "bg-[#632ce5] text-white border-[#632ce5]"
                    : "bg-white text-[#494455] border-[#cac3d8]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="font-semibold text-sm text-[#1a1c1e] mb-2">Descrição *</p>
          <textarea
            placeholder="Descreva o item: estado, características, motivo da venda..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 rounded-xl border border-[#cac3d8] bg-white text-sm text-[#1a1c1e] placeholder:text-[#8e8b9a] outline-none focus:border-[#632ce5] resize-none"
          />
          <p className="text-xs text-[#8e8b9a] mt-1 text-right">{description.length}/500</p>
        </div>

        {/* Location */}
        <div>
          <p className="font-semibold text-sm text-[#1a1c1e] mb-2">Localização</p>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#632ce5]" />
            <input
              type="text"
              placeholder="Ex: Lisboa, Arroios"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#cac3d8] bg-white text-sm text-[#1a1c1e] placeholder:text-[#8e8b9a] outline-none focus:border-[#632ce5]"
            />
          </div>
        </div>
      </main>

      {/* Publish Button */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#f9f9fc]/90 backdrop-blur border-t border-[#cac3d8]/30 px-4 py-4 max-w-[390px] mx-auto">
        <button
          onClick={handlePublish}
          disabled={!isValid}
          className={`w-full py-4 rounded-full font-semibold text-base transition-all ${
            isValid
              ? "bg-gradient-to-r from-[#632ce5] to-[#7c4dff] text-white shadow-lg"
              : "bg-[#e2e2e5] text-[#8e8b9a] cursor-not-allowed"
          }`}
        >
          Publicar Anúncio
        </button>
      </footer>
    </div>
  );
}

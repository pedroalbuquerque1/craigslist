import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { mockItems } from "../data/mockData";
import { ArrowLeft, MoreVertical, Plus, Image as ImageIcon, Smile, Send } from "lucide-react";

interface Message {
  id: string;
  type: "received" | "sent";
  content: string;
  time: string;
  hasImage?: boolean;
  imageUrl?: string;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id) || mockItems[4];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "received",
      content: "Olá! O fone ainda está disponível sim. Está praticamente novo, usei apenas por 3 meses.",
      time: "09:15",
    },
    {
      id: "2",
      type: "sent",
      content: "Que ótimo! Tenho interesse. Você aceita proposta ou o valor é final?",
      time: "09:18",
    },
    {
      id: "3",
      type: "received",
      content: "Posso fazer por R$ 800,00 se você retirar hoje mesmo no metrô. O que acha?",
      time: "09:20",
    },
    {
      id: "4",
      type: "received",
      content: "Aqui está uma foto dele de perto.",
      time: "09:21",
      hasImage: true,
    },
  ]);
  
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "sent",
      content: messageInput,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#f9f9fc] max-w-[390px] mx-auto">
      {/* Header */}
      <header className="bg-[#f9f9fc] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2">
              <ArrowLeft className="w-5 h-5 text-[#494455]" />
            </button>
            <div>
              <h2 className="font-normal text-base text-[#1a1c1e]">
                {item.seller.name}
              </h2>
              <p className="text-xs text-[#006832] font-medium">
                Vendedor Verificado
              </p>
            </div>
          </div>
          <button className="p-2">
            <MoreVertical className="w-5 h-5 text-[#494455]" />
          </button>
        </div>

        {/* Item Context Bar */}
        <div className="border-b border-[#cac3d8] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#e2e2e5] rounded-lg flex-shrink-0 overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-[180px]">
              <h3 className="font-semibold text-sm text-[#1a1c1e] truncate">
                {item.title}
              </h3>
              <p className="text-base text-[#632ce5] font-normal">
                R$ {item.price.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/item/${item.id}`)}
            className="bg-[#00affe] text-[#003f5f] px-4 py-2 rounded-full font-semibold text-sm"
          >
            Ver Anúncio
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Date Separator */}
        <div className="flex justify-center">
          <div className="bg-[#e2e2e5] rounded-full px-4 py-1">
            <span className="text-xs text-[#494455] font-medium">Hoje</span>
          </div>
        </div>

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end gap-2 max-w-[331.5px]">
              {message.type === "received" && (
                <div className="w-8 h-8 bg-[#62ff96] rounded-full flex-shrink-0" />
              )}
              
              <div
                className={`rounded-xl p-4 shadow-sm ${
                  message.type === "received"
                    ? "bg-[#e8e8ea]"
                    : "bg-gradient-to-br from-[#632ce5] to-[#7c4dff]"
                }`}
              >
                {message.hasImage && (
                  <div className="bg-gray-200 h-56 rounded-lg mb-2 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <p
                  className={`text-sm leading-5 mb-1 ${
                    message.type === "received" ? "text-[#1a1c1e]" : "text-white"
                  }`}
                >
                  {message.content}
                </p>
                
                <div className="flex items-center justify-end gap-1">
                  <span
                    className={`text-[10px] leading-[15px] ${
                      message.type === "received"
                        ? "text-[#494455]"
                        : "text-white opacity-80"
                    }`}
                  >
                    {message.time}
                  </span>
                  {message.type === "sent" && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Message Input */}
      <footer className="bg-[#f9f9fc] shadow-[0px_-8px_12px_rgba(0,0,0,0.08)] px-4 py-2 pb-8">
        <div className="flex items-center gap-2">
          <button className="p-2">
            <Plus className="w-5 h-5 text-[#632ce5]" />
          </button>
          
          <div className="flex-1 bg-[#f3f3f6] rounded-full flex items-center px-4 py-2">
            <input
              type="text"
              placeholder="Escreva sua mensagem..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-transparent outline-none text-sm text-[#1a1c1e] placeholder:text-[#6b7280]"
            />
            <button className="p-1">
              <ImageIcon className="w-5 h-5 text-[#494455]" />
            </button>
          </div>
          
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-br from-[#632ce5] to-[#7c4dff] rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </footer>
    </div>
  );
}

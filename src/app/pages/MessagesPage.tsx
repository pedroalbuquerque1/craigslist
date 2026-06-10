import { useNavigate } from "react-router";
import { Home, Search, Plus, MessageSquare, User } from "lucide-react";
import { mockItems } from "../data/mockData";

const conversations = [
  {
    id: "conv1",
    itemId: "1",
    sellerName: "Alex Community",
    lastMessage: "Posso fazer por R$ 2.200 se você retirar hoje.",
    time: "09:21",
    unread: 2,
    verified: true,
  },
  {
    id: "conv2",
    itemId: "2",
    sellerName: "Tech Store",
    lastMessage: "Sim, ainda está disponível!",
    time: "Ontem",
    unread: 0,
    verified: true,
  },
  {
    id: "conv3",
    itemId: "5",
    sellerName: "Marcos Silva",
    lastMessage: "Aqui está uma foto dele de perto.",
    time: "Seg",
    unread: 1,
    verified: false,
  },
  {
    id: "conv4",
    itemId: "3",
    sellerName: "Running Shop",
    lastMessage: "Obrigado pela compra! 😊",
    time: "12/06",
    unread: 0,
    verified: true,
  },
  {
    id: "conv5",
    itemId: "4",
    sellerName: "Móveis Casa",
    lastMessage: "Pode agendar a visita para sábado?",
    time: "10/06",
    unread: 0,
    verified: true,
  },
];

export default function MessagesPage() {
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
            <Search className="w-6 h-6 text-[#494455]" />
          </button>
        </div>
        <h2 className="font-bold text-xl text-[#1a1c1e]">Mensagens</h2>
      </header>

      {/* Conversation List */}
      <main className="flex-1 overflow-y-auto pb-20">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
            <div className="bg-[#ede8fb] rounded-full p-6">
              <MessageSquare className="w-10 h-10 text-[#632ce5]" />
            </div>
            <p className="font-semibold text-lg text-[#1a1c1e]">Nenhuma mensagem ainda</p>
            <p className="text-sm text-[#494455]">Entre em contato com vendedores para iniciar uma conversa.</p>
          </div>
        ) : (
          <div>
            {conversations.map((conv) => {
              const item = mockItems.find((i) => i.id === conv.itemId);
              return (
                <button
                  key={conv.id}
                  className="w-full flex items-center gap-4 px-4 py-4 border-b border-[#f0f0f3] active:bg-[#f3f0fb] text-left"
                  onClick={() => navigate(`/chat/${conv.itemId}`)}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 bg-[#cac3d8] rounded-full flex items-center justify-center">
                      <span className="font-bold text-[#632ce5] text-lg">
                        {conv.sellerName.charAt(0)}
                      </span>
                    </div>
                    {conv.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#62ff96] rounded-full border-2 border-[#f9f9fc] flex items-center justify-center">
                        <svg className="w-2.5 h-2.5" fill="#005226" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={`font-semibold text-sm truncate ${conv.unread > 0 ? "text-[#1a1c1e]" : "text-[#494455]"}`}>
                        {conv.sellerName}
                      </p>
                      <span className="text-xs text-[#8e8b9a] flex-shrink-0 ml-2">{conv.time}</span>
                    </div>
                    <p className="text-xs text-[#8e8b9a] truncate mb-1">{item?.title}</p>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${conv.unread > 0 ? "text-[#1a1c1e] font-medium" : "text-[#8e8b9a]"}`}>
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <div className="ml-2 bg-[#632ce5] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-bold">{conv.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
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
          <button className="flex flex-col items-center py-2 px-4">
            <div className="bg-[#632ce5] rounded-full p-2 mb-1">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#632ce5] font-medium">Messages</span>
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

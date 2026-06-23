import bikeImage from "../assets/listings/bike1.png";
import headphonesImage from "../assets/listings/headphones1.png";
import mapBackgroundImage from "../assets/listings/map-bg.png";
import shoesImage from "../assets/listings/shoes1.png";
import sofaImage from "../assets/listings/sofa1.png";
import watchImage from "../assets/listings/watch1.png";

export type MarketplaceSectionId = "services" | "properties" | "sales";

export interface ClassifiedItem {
  id: string;
  title: string;
  price: number;
  sectionId: MarketplaceSectionId;
  category: string;
  categoryColor: string;
  categoryTextColor: string;
  description: string;
  condition: string;
  type: string;
  location: string;
  locationDetail: string;
  distance: string;
  publishedTime: string;
  seller: {
    name: string;
    memberSince: string;
    rating: number;
    reviews: number;
    verified: boolean;
  };
  images: string[];
}

export interface MarketplaceSection {
  id: MarketplaceSectionId;
  name: string;
  subtitle: string;
  icon: "wrench" | "home" | "shopping-bag";
  color: string;
  bgColor: string;
}

export const mockItems: ClassifiedItem[] = [
  {
    id: "1",
    title: "Bicicleta de Estrada Specialized Tarmac SL7 - Tamanho 54",
    price: 2450,
    sectionId: "sales",
    category: "Desporto e Lazer",
    categoryColor: "#62ff96",
    categoryTextColor: "#005226",
    description:
      "Bicicleta em excelente estado, com pouco uso. Equipada com Shimano Ultegra Di2, rodas de carbono e pneus novos. Oportunidade para quem procura performance e conforto.",
    condition: "Como Novo",
    type: "Estrada / Carbono",
    location: "Lisboa, Arroios",
    locationDetail: "Lisboa, Arroios",
    distance: "2km",
    publishedTime: "ha 2 horas",
    seller: {
      name: "Alex Community",
      memberSince: "2021",
      rating: 4.8,
      reviews: 124,
      verified: true,
    },
    images: [bikeImage],
  },
  {
    id: "2",
    title: "Smartwatch Pro",
    price: 1200,
    sectionId: "sales",
    category: "Tecnologia",
    categoryColor: "#00affe",
    categoryTextColor: "#003f5f",
    description:
      "Smartwatch em excelente estado, com todos os acessorios originais. Monitor cardiaco, GPS integrado e resistencia a agua.",
    condition: "Usado",
    type: "Eletronico",
    location: "Lisboa, Centro",
    locationDetail: "Lisboa, Centro",
    distance: "2km",
    publishedTime: "ha 4 horas",
    seller: {
      name: "Tech Store",
      memberSince: "2020",
      rating: 4.5,
      reviews: 89,
      verified: true,
    },
    images: [watchImage],
  },
  {
    id: "3",
    title: "Tenis Corrida Nitro",
    price: 350,
    sectionId: "sales",
    category: "Desporto e Lazer",
    categoryColor: "#62ff96",
    categoryTextColor: "#005226",
    description:
      "Tenis de corrida profissional, tamanho 42, muito confortavel e em otimo estado.",
    condition: "Seminovo",
    type: "Calcado",
    location: "Lisboa, Benfica",
    locationDetail: "Lisboa, Benfica",
    distance: "5km",
    publishedTime: "ha 1 dia",
    seller: {
      name: "Running Shop",
      memberSince: "2019",
      rating: 4.9,
      reviews: 156,
      verified: true,
    },
    images: [shoesImage],
  },
  {
    id: "4",
    title: "Sofa Retratil Premium",
    price: 4500,
    sectionId: "sales",
    category: "Moveis",
    categoryColor: "#a3d5ff",
    categoryTextColor: "#003d5f",
    description:
      "Sofa retratil de 3 lugares, tecido premium e muito confortavel. Ideal para sala de estar.",
    condition: "Seminovo",
    type: "Sofa",
    location: "Sao Paulo, SP",
    locationDetail: "Sao Paulo, SP",
    distance: "8km",
    publishedTime: "ha 2 dias",
    seller: {
      name: "Moveis Casa",
      memberSince: "2018",
      rating: 4.7,
      reviews: 203,
      verified: true,
    },
    images: [sofaImage],
  },
  {
    id: "5",
    title: "Fone de Ouvido Premium Wireless",
    price: 850,
    sectionId: "sales",
    category: "Tecnologia",
    categoryColor: "#00affe",
    categoryTextColor: "#003f5f",
    description:
      "Fone de ouvido sem fio com cancelamento de ruido ativo, bateria de longa duracao e excelente qualidade de som.",
    condition: "Como Novo",
    type: "Audio",
    location: "Lisboa, Centro",
    locationDetail: "Lisboa, Centro",
    distance: "3km",
    publishedTime: "ha 5 horas",
    seller: {
      name: "Marcos Silva",
      memberSince: "2020",
      rating: 4.6,
      reviews: 78,
      verified: true,
    },
    images: [headphonesImage],
  },
  {
    id: "6",
    title: "Studio mobiliado para alugar no centro",
    price: 4200,
    sectionId: "properties",
    category: "Imoveis",
    categoryColor: "#bae6fd",
    categoryTextColor: "#0369a1",
    description:
      "Studio compacto, mobiliado e pronto para morar, com excelente localizacao e facil acesso ao metro.",
    condition: "Como Novo",
    type: "Studio / Aluguel",
    location: "Sao Paulo, Bela Vista",
    locationDetail: "Sao Paulo, Bela Vista",
    distance: "800m",
    publishedTime: "ha 1 hora",
    seller: {
      name: "Lar Urbano",
      memberSince: "2019",
      rating: 4.9,
      reviews: 67,
      verified: true,
    },
    images: [sofaImage],
  },
  {
    id: "7",
    title: "Montagem de moveis e pequenos reparos",
    price: 180,
    sectionId: "services",
    category: "Servicos",
    categoryColor: "#c3f4d9",
    categoryTextColor: "#006832",
    description:
      "Servico de montagem de moveis, instalacao de prateleiras, cortinas e pequenos ajustes residenciais.",
    condition: "Novo",
    type: "Servico residencial",
    location: "Sao Paulo, Pinheiros",
    locationDetail: "Sao Paulo, Pinheiros",
    distance: "4km",
    publishedTime: "ha 3 horas",
    seller: {
      name: "Carlos Reparos",
      memberSince: "2022",
      rating: 4.7,
      reviews: 51,
      verified: true,
    },
    images: [watchImage],
  },
];

export const categories: MarketplaceSection[] = [
  {
    id: "services",
    name: "Servicos",
    subtitle: "Profissionais para tudo",
    icon: "wrench",
    color: "#006832",
    bgColor: "#c3f4d9",
  },
  {
    id: "properties",
    name: "Imoveis",
    subtitle: "Aluguel e venda",
    icon: "home",
    color: "#0369a1",
    bgColor: "#bae6fd",
  },
  {
    id: "sales",
    name: "Vendas",
    subtitle: "Usados e novos",
    icon: "shopping-bag",
    color: "#7c3aed",
    bgColor: "#ddd6fe",
  },
];

export function getSectionById(sectionId: MarketplaceSectionId) {
  return categories.find((category) => category.id === sectionId) ?? categories[0];
}

export { mapBackgroundImage };

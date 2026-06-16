export const FUEL_TYPES = [
  { value: "flex", label: "Flex" },
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "diesel", label: "Diesel" },
  { value: "hibrido", label: "Híbrido" },
  { value: "eletrico", label: "Elétrico" },
  { value: "gnv", label: "GNV" },
] as const;

export const TRANSMISSION_TYPES = [
  { value: "manual", label: "Manual" },
  { value: "automatico", label: "Automático" },
  { value: "automatizado", label: "Automatizado" },
  { value: "cvt", label: "CVT" },
] as const;

export const VEHICLE_STATUSES = [
  { value: "rascunho", label: "Rascunho" },
  { value: "publicado", label: "Publicado" },
  { value: "reservado", label: "Reservado" },
  { value: "vendido", label: "Vendido" },
  { value: "inativo", label: "Inativo" },
  { value: "arquivado", label: "Arquivado" },
] as const;

export const CONSERVATION_STATES = [
  { value: "excelente", label: "Excelente" },
  { value: "otimo", label: "Ótimo" },
  { value: "bom", label: "Bom" },
  { value: "regular", label: "Regular" },
] as const;

export const VEHICLE_FEATURES = [
  { id: "ar_condicionado", label: "Ar-condicionado", category: "conforto" },
  { id: "direcao_eletrica", label: "Direção elétrica", category: "conforto" },
  { id: "banco_couro", label: "Banco de couro", category: "conforto" },
  { id: "teto_solar", label: "Teto solar", category: "conforto" },
  { id: "bancos_eletricos", label: "Bancos elétricos", category: "conforto" },
  { id: "bancos_aquecidos", label: "Bancos aquecidos", category: "conforto" },
  { id: "central_multimidia", label: "Central multimídia", category: "tecnologia" },
  { id: "camera_re", label: "Câmera de ré", category: "tecnologia" },
  { id: "sensor_estacionamento", label: "Sensor de estacionamento", category: "tecnologia" },
  { id: "piloto_automatico", label: "Piloto automático", category: "tecnologia" },
  { id: "partida_botao", label: "Partida por botão", category: "tecnologia" },
  { id: "chave_presencial", label: "Chave presencial", category: "tecnologia" },
  { id: "carregador_inducao", label: "Carregador por indução", category: "tecnologia" },
  { id: "som_premium", label: "Som premium", category: "tecnologia" },
  { id: "assistente_faixa", label: "Assistente de faixa", category: "tecnologia" },
  { id: "frenagem_automatica", label: "Frenagem automática", category: "tecnologia" },
  { id: "controle_estabilidade", label: "Controle de estabilidade", category: "seguranca" },
  { id: "airbags", label: "Airbags", category: "seguranca" },
  { id: "rodas_liga_leve", label: "Rodas de liga leve", category: "exterior" },
  { id: "farol_led", label: "Farol em LED", category: "exterior" },
] as const;

export const PLATE_ENDINGS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

export const DOOR_OPTIONS = [
  { value: "2", label: "2 portas" },
  { value: "4", label: "4 portas" },
] as const;

export const VEHICLE_BADGES = {
  novo: { label: "Novidade", class: "badge-novo" },
  destaque: { label: "Destaque", class: "badge-destaque" },
  vendido: { label: "Vendido", class: "badge-vendido" },
  reservado: { label: "Reservado", class: "badge-reservado" },
  baixakm: { label: "Baixa km", class: "badge-baixakm" },
} as const;

export const SORT_OPTIONS = [
  { value: "menor_preco", label: "Menor preço" },
  { value: "maior_preco", label: "Maior preço" },
  { value: "mais_novo", label: "Mais novo" },
  { value: "mais_recente", label: "Mais recente" },
] as const;

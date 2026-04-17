// ============================================================
// TIPAGENS — PAINEL VELLO LEADS (Área do Expositor)
// Baseado no banco de dados real do vello-v2
// ============================================================

// --- Expositor (quem faz login via token) ---

export type ExhibitorStatus = 'ativo' | 'inativo';

export interface Exhibitor {
    id: string;
    tenantId: string;
    eventId: string;
    name: string;
    cnpj: string | null;
    email: string | null;
    phone: string | null;
    logoUrl: string | null;
    contactName: string | null;
    credentialCapacity: number;
    formId: string | null;
    publicToken: string;              // Token de acesso (login do expositor)
    sponsorId: string | null;
    leadsDeviceLimit: number;         // Total de dispositivos liberados
    status: ExhibitorStatus;
    createdAt: Date;
}

// --- Operadores (quem coleta leads nos dispositivos) ---

export interface ExhibitorOperator {
    id: string;
    exhibitorId: string;
    name: string;
    pinHash: string;                  // PIN de 4 dígitos (hash)
    isActive: boolean;
    createdAt: Date;
}

// --- Dispositivos (celulares/tablets conectados) ---

export interface ExhibitorDevice {
    id: string;
    exhibitorId: string;
    deviceId: string;                 // ID único do dispositivo
    deviceName: string | null;        // Ex: "iPhone 15 Pro", "Galaxy S24"
    currentOperatorId: string | null;
    currentOperatorName: string | null;
    loggedAt: Date;                   // Último login
    createdAt: Date;
}

// --- Leads coletados ---

export type LeadRating = 'hot' | 'warm' | 'cold';

export interface ExhibitorLead {
    id: string;
    tenantId: string;
    eventId: string;
    exhibitorId: string;
    credentialId: string | null;      // Credencial escaneada (se veio de QR)
    operatorId: string | null;        // Quem coleta
    operatorName: string | null;      // Snapshot do nome do operador
    accessCode: string | null;        // Código de acesso escaneado
    name: string;                     // Nome do lead (obrigatório)
    email: string | null;
    document: string | null;          // CPF
    phone: string | null;
    company: string | null;           // Empresa do lead
    role: string | null;              // Cargo do lead
    note: string | null;              // Anotação do operador
    rating: LeadRating;               // Classificação: hot, warm, cold
    syncedAt: Date | null;            // Quando sincronizou com servidor
    capturedAt: Date;                 // Quando foi coletado no dispositivo
    createdAt: Date;
}

// --- Planos de leads (o que o expositor compra) ---

export type LeadsPlanType = 'diaria' | 'evento_completo';

export interface LeadsPlan {
    id: string;
    name: string;                     // Ex: "Diária", "Evento Completo"
    description: string | null;
    priceCents: number;               // Preço em centavos (ex: 9900 = R$ 99,00)
    type: LeadsPlanType;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// --- Pedidos de compra de dispositivos ---

export type LeadsOrderStatus = 'pending' | 'paid' | 'expired' | 'cancelled';

export interface LeadsOrder {
    id: string;
    exhibitorId: string;
    planId: string;
    quantity: number;                 // Quantidade de dispositivos comprados
    totalCents: number;               // Valor total em centavos
    status: LeadsOrderStatus;
    wooviChargeId: string | null;
    wooviCorrelationId: string;
    pixBrCode: string | null;
    pixQrCodeImage: string | null;
    paidAt: Date | null;
    expiresAt: Date;
    createdAt: Date;
}

// ============================================================
// TIPOS DERIVADOS — Úteis para as telas do painel
// ============================================================

// Dashboard do expositor
export interface LeadsDashboardData {
    exhibitor: Exhibitor;
    eventTitle: string;
    totalLeads: number;
    leadsToday: number;
    activeDevices: number;            // Dispositivos conectados agora
    deviceLimit: number;              // Limite comprado
    operators: number;                // Total de operadores
    leadsByRating: {
        hot: number;
        warm: number;
        cold: number;
    };
    recentLeads: ExhibitorLead[];     // Últimos 10 leads
    trendData: { time: string; leads: number }[];
    operatorPerformance: { name: string; leads: number; color: string }[];
}

// Lista de leads com filtros
export interface LeadsListFilters {
    search: string | null;            // Busca por nome, email, empresa
    rating: LeadRating | null;        // Filtro por classificação
    operatorId: string | null;        // Filtro por operador
    dateFrom: Date | null;
    dateTo: Date | null;
}

// Lead para exportação CSV
export interface LeadExportRow {
    name: string;
    email: string | null;
    phone: string | null;
    document: string | null;
    company: string | null;
    role: string | null;
    rating: LeadRating;
    operatorName: string | null;
    note: string | null;
    capturedAt: string;               // ISO string
}

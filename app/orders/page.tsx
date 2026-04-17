'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  CreditCard, 
  Check, 
  Zap, 
  ShieldCheck, 
  History, 
  ArrowRight,
  Smartphone,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const PlanCard = ({ name, price, description, features, isPopular }: any) => (
  <div className={cn(
    "relative bg-card-light dark:bg-card-dark rounded-3xl border p-8 flex flex-col h-full transition-all duration-300",
    isPopular 
      ? "border-brand-500 shadow-xl shadow-brand-500/10 scale-105 z-10" 
      : "border-border-light dark:border-border-dark hover:border-brand-500/50"
  )}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
        Mais Vendido
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{name}</h3>
      <p className="text-sm text-subtle-light dark:text-subtle-dark">{description}</p>
    </div>

    <div className="mb-8 flex items-baseline gap-1">
      <span className="text-4xl font-black text-text-light dark:text-text-dark">R$ {price}</span>
      <span className="text-subtle-light dark:text-subtle-dark text-sm">/ dispositivo</span>
    </div>

    <div className="space-y-4 mb-10 flex-1">
      {features.map((feature: string, i: number) => (
        <div key={i} className="flex items-start gap-3">
          <div className="mt-1 p-0.5 bg-success-main/10 rounded-full text-success-main">
            <Check size={14} />
          </div>
          <span className="text-sm text-text-light dark:text-text-dark">{feature}</span>
        </div>
      ))}
    </div>

    <button className={cn(
      "w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2",
      isPopular 
        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600" 
        : "bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark hover:bg-brand-500 hover:text-white"
    )}>
      Comprar Agora
      <ArrowRight size={18} />
    </button>
  </div>
);

export default function OrdersPage() {
  const plans = [
    {
      name: "Diária",
      price: "49,90",
      description: "Ideal para eventos de um único dia ou testes pontuais.",
      features: [
        "1 Dispositivo liberado",
        "Leads ilimitados",
        "Exportação CSV",
        "Suporte via WhatsApp",
        "Painel em tempo real"
      ]
    },
    {
      name: "Evento Completo",
      price: "129,90",
      description: "A melhor opção para expositores que querem o máximo de leads.",
      isPopular: true,
      features: [
        "1 Dispositivo liberado",
        "Leads ilimitados",
        "Exportação CSV / Excel",
        "Suporte Prioritário",
        "Painel em tempo real",
        "Histórico pós-evento (1 ano)",
        "API de Integração"
      ]
    },
    {
      name: "Enterprise",
      price: "Sob Consulta",
      description: "Para grandes empresas com múltiplos estandes e necessidades customizadas.",
      features: [
        "Dispositivos ilimitados",
        "Leads ilimitados",
        "Customização de formulário",
        "Gerente de conta dedicado",
        "Integração direta com CRM",
        "Treinamento de equipe"
      ]
    }
  ];

  const orders = [
    { id: 'ORD-8291', date: '12/04/2024', plan: 'Evento Completo', qty: 2, total: 'R$ 259,80', status: 'paid' },
    { id: 'ORD-7721', date: '10/04/2024', plan: 'Diária', qty: 1, total: 'R$ 49,90', status: 'paid' },
    { id: 'ORD-6540', date: '05/04/2024', plan: 'Evento Completo', qty: 1, total: 'R$ 129,90', status: 'cancelled' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark tracking-tight">Licenças & Planos</h1>
          <p className="text-subtle-light dark:text-subtle-dark">
            Escolha o plano ideal para o seu estande e comece a coletar leads qualificados agora mesmo.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} />
          ))}
        </div>

        {/* Orders History */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted-light dark:bg-muted-dark rounded-lg text-text-light dark:text-text-dark">
              <History size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Histórico de Pedidos</h2>
          </div>

          <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted-light dark:bg-muted-dark/50 text-subtle-light dark:text-subtle-dark text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">ID do Pedido</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Plano</th>
                    <th className="px-6 py-4">Qtd.</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted-light/30 dark:hover:bg-muted-dark/30 transition-colors">
                      <td className="px-6 py-5 font-mono text-sm text-text-light dark:text-text-dark">{order.id}</td>
                      <td className="px-6 py-5 text-sm text-text-light dark:text-text-dark">{order.date}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-brand-500" />
                          <span className="text-sm font-medium text-text-light dark:text-text-dark">{order.plan}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-text-light dark:text-text-dark">{order.qty}</td>
                      <td className="px-6 py-5 text-sm font-bold text-text-light dark:text-text-dark">{order.total}</td>
                      <td className="px-6 py-5">
                        {order.status === 'paid' ? (
                          <span className="px-2 py-1 rounded-md bg-success-light/20 text-success-main text-[10px] font-bold uppercase tracking-wider border border-success-main/20">
                            Pago
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-md bg-danger-light/20 text-danger-main text-[10px] font-bold uppercase tracking-wider border border-danger-main/20">
                            Cancelado
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 text-subtle-light dark:text-subtle-dark hover:bg-muted-light dark:hover:bg-muted-dark rounded-lg transition-colors">
                          <ExternalLink size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ / Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          <div className="bg-brand-500 p-8 rounded-3xl text-white flex flex-col justify-between">
            <div>
              <ShieldCheck size={40} className="mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Segurança Garantida</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Todos os seus pagamentos são processados via Woovi com criptografia de ponta a ponta. Seus dados e os dados dos seus leads estão protegidos pela LGPD.
              </p>
            </div>
            <button className="mt-8 bg-white text-brand-500 px-6 py-3 rounded-xl font-bold text-sm w-fit hover:bg-opacity-90 transition-all">
              Ver Termos de Uso
            </button>
          </div>
          <div className="bg-dark-900 p-8 rounded-3xl text-white flex flex-col justify-between">
            <div>
              <Smartphone size={40} className="mb-6 opacity-80 text-brand-500" />
              <h3 className="text-2xl font-bold mb-2">Precisa de Ajuda?</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Nossa equipe de suporte está disponível durante todo o horário do evento para te auxiliar com qualquer dúvida técnica ou comercial.
              </p>
            </div>
            <button className="mt-8 bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-sm w-fit hover:bg-brand-600 transition-all">
              Falar com Suporte
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockOperators, mockLeads } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  UserCircle, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  Target, 
  Clock,
  Calendar,
  Filter,
  Download,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import FormattedDateTime from '@/components/ui/FormattedDateTime';
import RatingBadge from '@/components/ui/RatingBadge';

export default function OperatorActivityPage() {
  const params = useParams();
  const router = useRouter();
  const operatorId = params.id as string;

  const operator = useMemo(() => 
    mockOperators.find(op => op.id === operatorId) || mockOperators[0], 
  [operatorId]);

  const operatorLeads = useMemo(() => 
    mockLeads.filter(lead => lead.operatorId === operatorId || lead.operatorId === 'op_1'), // Fallback for mock
  [operatorId]);

  const stats = useMemo(() => {
    const hot = operatorLeads.filter(l => l.rating === 'hot').length;
    const warm = operatorLeads.filter(l => l.rating === 'warm').length;
    const cold = operatorLeads.filter(l => l.rating === 'cold').length;
    return { hot, warm, cold, total: operatorLeads.length };
  }, [operatorLeads]);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl text-subtle-light dark:text-subtle-dark hover:text-brand-500 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark tracking-tight">Atividade do Operador</h1>
                {operator.isActive ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-success-light/10 text-success-main text-[10px] font-bold uppercase tracking-wider rounded-lg">
                    <ShieldCheck size={12} />
                    Ativo
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-muted-light dark:bg-muted-dark text-subtle-light dark:text-subtle-dark text-[10px] font-bold uppercase tracking-wider rounded-lg">
                    <ShieldAlert size={12} />
                    Inativo
                  </span>
                )}
              </div>
              <p className="text-subtle-light dark:text-subtle-dark text-sm font-medium mt-0.5">
                Monitorando o desempenho de <span className="text-text-light dark:text-text-dark font-bold">{operator.name}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-semibold text-text-light dark:text-text-dark hover:bg-muted-light dark:hover:bg-muted-dark transition-all shadow-sm">
              <Download size={18} />
              Exportar Leads
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total de Leads', value: stats.total, icon: Users, color: 'bg-brand-500', trend: '+12%' },
            { label: 'Leads Quentes', value: stats.hot, icon: TrendingUp, color: 'bg-danger-main', trend: '+5%' },
            { label: 'Leads Mornos', value: stats.warm, icon: Target, color: 'bg-warning-main', trend: '+8%' },
            { label: 'Tempo Médio', value: '2m 45s', icon: Clock, color: 'bg-brand-400', trend: '-15%' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-2xl", stat.color)}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <span className="text-[10px] font-bold text-success-main bg-success-light/10 px-2 py-1 rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-subtle-light dark:text-subtle-dark text-[10px] font-bold uppercase tracking-widest">{stat.label}</h3>
                <span className="text-2xl font-bold text-text-light dark:text-text-dark tracking-tight">{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity Table */}
        <div className="bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
          <div className="p-8 border-b border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-bold text-xl text-text-light dark:text-text-dark tracking-tight">Histórico de Capturas</h2>
            <div className="flex items-center gap-2">
              <button className="p-2.5 bg-muted-light dark:bg-muted-dark text-subtle-light dark:text-subtle-dark rounded-xl hover:text-brand-500 transition-colors">
                <Filter size={18} />
              </button>
              <div className="h-8 w-px bg-border-light dark:bg-border-dark mx-1" />
              <button className="px-4 py-2 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-xl text-xs font-bold hover:bg-muted-light/80 transition-all">
                Hoje
              </button>
              <button className="px-4 py-2 text-subtle-light dark:text-subtle-dark rounded-xl text-xs font-bold hover:bg-muted-light dark:hover:bg-muted-dark transition-all">
                Últimos 7 dias
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted-light/50 dark:bg-muted-dark/50 text-subtle-light dark:text-subtle-dark text-[10px] uppercase tracking-widest font-bold border-b border-border-light dark:border-border-dark">
                  <th className="px-8 py-4">Lead</th>
                  <th className="px-8 py-4">Empresa</th>
                  <th className="px-8 py-4">Classificação</th>
                  <th className="px-8 py-4">Capturado em</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {operatorLeads.map((lead, i) => (
                  <motion.tr 
                    key={lead.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-muted-light/30 dark:hover:bg-muted-dark/30 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text-light dark:text-text-dark">{lead.name}</span>
                          <span className="text-[11px] text-subtle-light dark:text-subtle-dark font-medium">{lead.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-semibold text-text-light dark:text-text-dark">{lead.company}</span>
                    </td>
                    <td className="px-8 py-5">
                      <RatingBadge rating={lead.rating} />
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                          <FormattedDateTime date={lead.capturedAt} type="time" />
                        </span>
                        <span className="text-[10px] text-subtle-light dark:text-subtle-dark font-bold uppercase tracking-wider">
                          <FormattedDateTime date={lead.capturedAt} type="date" />
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-subtle-light dark:text-subtle-dark hover:text-brand-500 transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {operatorLeads.length === 0 && (
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-muted-light dark:bg-muted-dark rounded-3xl flex items-center justify-center text-subtle-light dark:text-subtle-dark mb-6">
                <Users size={40} />
              </div>
              <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Nenhum lead capturado</h3>
              <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1 max-w-xs">
                Este operador ainda não realizou nenhuma captura de lead neste evento.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

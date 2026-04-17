'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockDashboardData } from '@/lib/mock-data';
import { 
  Users, 
  Smartphone, 
  UserCircle, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Download,
  Filter,
  ChevronRight,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import FormattedDateTime from '@/components/ui/FormattedDateTime';
import RatingBadge from '@/components/ui/RatingBadge';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const StatCard = ({ icon: Icon, label, value, subValue, trend, color, description }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm group transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", color)}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <span className="flex items-center text-success-main text-[10px] font-bold bg-success-light/10 px-2 py-1 rounded-lg uppercase tracking-wider">
          <TrendingUp size={12} className="mr-1" />
          {trend}
        </span>
      )}
    </div>
      <div className="space-y-1">
        <h3 className="text-subtle-light dark:text-subtle-dark text-[10px] font-semibold uppercase tracking-widest">{label}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-text-light dark:text-text-dark tracking-tight">{value}</span>
          {subValue && <span className="text-xs font-medium text-subtle-light dark:text-subtle-dark">/ {subValue}</span>}
        </div>
        {description && <p className="text-[10px] text-subtle-light dark:text-subtle-dark font-normal">{description}</p>}
      </div>
  </motion.div>
);

export default function DashboardPage() {
  const { totalLeads, leadsToday, activeDevices, deviceLimit, operators, leadsByRating, recentLeads, eventTitle, trendData, operatorPerformance } = mockDashboardData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-light dark:text-text-dark tracking-tight">
              Olá, {mockDashboardData.exhibitor.contactName}!
            </h1>
            <p className="text-subtle-light dark:text-subtle-dark font-medium">
              Seu estande no <span className="text-brand-500 font-bold">{eventTitle}</span> está performando bem.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-semibold text-text-light dark:text-text-dark hover:bg-muted-light dark:hover:bg-muted-dark transition-all shadow-sm">
              <Download size={18} />
              Exportar Tudo
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all">
              <Zap size={18} />
              Impulsionar Leads
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={Users} 
            label="Total de Leads" 
            value={totalLeads} 
            trend="+12.5%" 
            color="bg-brand-500" 
            description="Acumulado do evento"
          />
          <StatCard 
            icon={Clock} 
            label="Capturas Hoje" 
            value={leadsToday} 
            color="bg-success-main" 
            description="Últimas 24 horas"
          />
          <StatCard 
            icon={Smartphone} 
            label="Dispositivos" 
            value={activeDevices} 
            subValue={deviceLimit} 
            color="bg-warning-main" 
            description="Licenças ativas"
          />
          <StatCard 
            icon={UserCircle} 
            label="Equipe Ativa" 
            value={operators} 
            color="bg-dark-700" 
            description="Operadores em campo"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lead Trend Chart */}
          <div className="lg:col-span-2 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black text-xl text-text-light dark:text-text-dark tracking-tight">Fluxo de Captura</h2>
                <p className="text-xs text-subtle-light dark:text-subtle-dark font-medium">Volume de leads por hora hoje</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted-light dark:bg-muted-dark rounded-xl text-[10px] font-semibold text-subtle-light dark:text-subtle-dark uppercase tracking-widest">
                <Clock size={12} />
                Tempo Real
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EA580C" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EA580C" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#737373' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#737373' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#18181B', 
                        border: 'none', 
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                      itemStyle={{ color: '#EA580C' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="#EA580C" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorLeads)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Operator Performance */}
          <div className="bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-xl text-text-light dark:text-text-dark tracking-tight">Top Operadores</h2>
              <Award size={24} className="text-warning-main" />
            </div>
            
            <div className="space-y-6">
              {operatorPerformance.map((op, i) => (
                <div key={op.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-muted-light dark:bg-muted-dark flex items-center justify-center text-xs font-bold text-text-light dark:text-text-dark">
                        {i + 1}
                      </div>
                      <span className="text-sm font-semibold text-text-light dark:text-text-dark">{op.name}</span>
                    </div>
                    <span className="text-sm font-bold text-brand-500">{op.leads} <span className="text-[10px] text-subtle-light dark:text-subtle-dark uppercase font-medium">Leads</span></span>
                  </div>
                  <div className="h-2 w-full bg-muted-light dark:bg-muted-dark rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(op.leads / 60) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: op.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 mt-4 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all">
              Ver Ranking Completo
            </button>
          </div>

          {/* Recent Leads Table */}
          <div className="lg:col-span-2 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border-light dark:border-border-dark flex items-center justify-between">
              <h2 className="font-bold text-xl text-text-light dark:text-text-dark tracking-tight">Últimas Capturas</h2>
              <button className="text-brand-500 text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                Ver todos
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted-light/50 dark:bg-muted-dark/50 text-subtle-light dark:text-subtle-dark text-[10px] uppercase tracking-widest font-semibold">
                    <th className="px-8 py-4">Lead</th>
                    <th className="px-8 py-4">Empresa</th>
                    <th className="px-8 py-4">Rating</th>
                    <th className="px-8 py-4">Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {recentLeads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted-light/30 dark:hover:bg-muted-dark/30 transition-colors cursor-pointer group">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-text-light dark:text-text-dark group-hover:text-brand-500 transition-colors">{lead.name}</span>
                          <span className="text-[11px] text-subtle-light dark:text-subtle-dark font-medium">{lead.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-medium text-text-light dark:text-text-dark">{lead.company}</span>
                      </td>
                      <td className="px-8 py-5">
                        <RatingBadge rating={lead.rating} />
                      </td>
                      <td className="px-8 py-5 text-[11px] font-semibold text-subtle-light dark:text-subtle-dark">
                        <FormattedDateTime 
                          date={lead.capturedAt} 
                          type="time" 
                          options={{ hour: '2-digit', minute: '2-digit' }} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rating Distribution & Insights */}
          <div className="space-y-8">
            <div className="bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark shadow-sm p-8">
              <h2 className="font-bold text-xl text-text-light dark:text-text-dark tracking-tight mb-8">Qualidade dos Leads</h2>
              <div className="space-y-8">
                {[
                  { label: 'Leads Quentes', count: leadsByRating.hot, total: totalLeads, color: 'bg-danger-main' },
                  { label: 'Leads Mornos', count: leadsByRating.warm, total: totalLeads, color: 'bg-warning-main' },
                  { label: 'Leads Frios', count: leadsByRating.cold, total: totalLeads, color: 'bg-brand-400' },
                ].map((item) => (
                  <div key={item.label} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-text-light dark:text-text-dark">{item.label}</span>
                      <span className="text-xs font-bold text-text-light dark:text-text-dark">{item.count}</span>
                    </div>
                    <div className="h-3 w-full bg-muted-light dark:bg-muted-dark rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / item.total) * 100}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={cn("h-full rounded-full", item.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-500 p-8 rounded-3xl text-white relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Target size={20} />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">Insight de IA</span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-white/90">
                  Sua taxa de leads <span className="font-bold">Quentes</span> está 15% acima da média do evento. Foque no follow-up imediato para garantir conversões.
                </p>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-brand-500 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                  Ver Estratégia
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

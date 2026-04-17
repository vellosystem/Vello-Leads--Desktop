'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockLeads, mockOperators } from '@/lib/mock-data';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  X,
  ExternalLink,
  MessageSquare,
  MapPin,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import FormattedDateTime from '@/components/ui/FormattedDateTime';
import RatingBadge from '@/components/ui/RatingBadge';
import { ExhibitorLead } from '@/types/vello';

const LeadDetailsModal = ({ lead, isOpen, onClose }: { lead: ExhibitorLead | null, isOpen: boolean, onClose: () => void }) => {
  if (!lead) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card-light dark:bg-card-dark z-[101] shadow-2xl border-l border-border-light dark:border-border-dark overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-muted-light dark:hover:bg-muted-dark rounded-xl transition-colors text-subtle-light dark:text-subtle-dark"
                >
                  <X size={20} />
                </button>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted-light dark:hover:bg-muted-dark rounded-xl transition-colors text-brand-500">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              {/* Profile Header */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-brand-500/10 flex items-center justify-center text-brand-500 text-3xl font-black border-2 border-brand-500/20">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-text-light dark:text-text-dark tracking-tight">{lead.name}</h2>
                  <p className="text-subtle-light dark:text-subtle-dark font-medium">{lead.role || 'Sem cargo definido'}</p>
                </div>
                <RatingBadge rating={lead.rating} className="px-4 py-1.5 text-xs" />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={`mailto:${lead.email}`}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark hover:border-brand-500 transition-all group"
                >
                  <Mail size={20} className="text-brand-500 mb-2" />
                  <span className="text-xs font-bold text-text-light dark:text-text-dark">Email</span>
                </a>
                <a 
                  href={`tel:${lead.phone}`}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark hover:border-brand-500 transition-all group"
                >
                  <Phone size={20} className="text-success-main mb-2" />
                  <span className="text-xs font-bold text-text-light dark:text-text-dark">WhatsApp</span>
                </a>
              </div>

              {/* Info Sections */}
              <div className="space-y-6 pt-4">
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-subtle-light dark:text-subtle-dark">Informações de Contato</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted-light/50 dark:bg-muted-dark/50 border border-border-light dark:border-border-dark">
                      <Mail size={16} className="text-subtle-light dark:text-subtle-dark" />
                      <span className="text-sm text-text-light dark:text-text-dark font-medium">{lead.email || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted-light/50 dark:bg-muted-dark/50 border border-border-light dark:border-border-dark">
                      <Phone size={16} className="text-subtle-light dark:text-subtle-dark" />
                      <span className="text-sm text-text-light dark:text-text-dark font-medium">{lead.phone || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted-light/50 dark:bg-muted-dark/50 border border-border-light dark:border-border-dark">
                      <Building2 size={16} className="text-subtle-light dark:text-subtle-dark" />
                      <span className="text-sm text-text-light dark:text-text-dark font-medium">{lead.company || 'Não informado'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-subtle-light dark:text-subtle-dark">Captura & Origem</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-muted-light/50 dark:bg-muted-dark/50 border border-border-light dark:border-border-dark">
                      <span className="text-[10px] text-subtle-light dark:text-subtle-dark block mb-1">Operador</span>
                      <span className="text-sm font-bold text-text-light dark:text-text-dark flex items-center gap-1.5">
                        <User size={12} />
                        {lead.operatorName}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-muted-light/50 dark:bg-muted-dark/50 border border-border-light dark:border-border-dark">
                      <span className="text-[10px] text-subtle-light dark:text-subtle-dark block mb-1">Data</span>
                      <span className="text-sm font-bold text-text-light dark:text-text-dark flex items-center gap-1.5">
                        <Calendar size={12} />
                        <FormattedDateTime date={lead.capturedAt} type="date" />
                      </span>
                    </div>
                  </div>
                </div>

                {lead.note && (
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark">Anotações do Operador</h3>
                    <div className="p-4 rounded-xl bg-warning-light/10 border border-warning-main/20 text-sm text-text-light dark:text-text-dark italic leading-relaxed">
                      &quot;{lead.note}&quot;
                    </div>
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="pt-8">
                <button className="w-full py-4 bg-brand-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all flex items-center justify-center gap-2">
                  Enviar Mensagem de Follow-up
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [operatorFilter, setOperatorFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<ExhibitorLead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'all' || lead.rating === ratingFilter;
    const matchesOperator = operatorFilter === 'all' || lead.operatorId === operatorFilter;
    
    let matchesDate = true;
    if (dateFilter) {
      const leadDate = new Date(lead.capturedAt).toISOString().split('T')[0];
      matchesDate = leadDate === dateFilter;
    }

    return matchesSearch && matchesRating && matchesOperator && matchesDate;
  });

  const handleLeadClick = (lead: ExhibitorLead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRatingFilter('all');
    setOperatorFilter('all');
    setDateFilter('');
  };

  const activeFiltersCount = [
    ratingFilter !== 'all',
    operatorFilter !== 'all',
    dateFilter !== ''
  ].filter(Boolean).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Gerenciamento de Leads</h1>
            <p className="text-subtle-light dark:text-subtle-dark text-sm">Visualize e exporte todos os leads coletados durante o evento.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all">
            <Download size={18} />
            Exportar CSV
          </button>
        </div>

        {/* Filters Bar */}
        <div className="space-y-4">
          <div className="bg-card-light dark:bg-card-dark p-4 rounded-3xl border border-border-light dark:border-border-dark shadow-xl shadow-black/5 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nome, email ou empresa..."
                className="w-full pl-12 pr-4 py-3 bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all border",
                  isFiltersVisible || activeFiltersCount > 0
                    ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20"
                    : "bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark hover:bg-card-light dark:hover:bg-card-dark"
                )}
              >
                <Filter size={18} />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white text-brand-500 rounded-md text-[10px] font-black">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              {activeFiltersCount > 0 && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-danger-main hover:bg-danger-light/10 transition-all"
                >
                  <X size={18} />
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {isFiltersVisible && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-xl shadow-black/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark ml-1">Classificação</label>
                    <div className="relative group">
                      <select 
                        className="appearance-none w-full pl-4 pr-10 py-3 bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-semibold text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer hover:bg-card-light dark:hover:bg-card-dark"
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                      >
                        <option value="all">Todos os Ratings</option>
                        <option value="hot">Quente</option>
                        <option value="warm">Morno</option>
                        <option value="cold">Frio</option>
                      </select>
                      <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-subtle-light dark:text-subtle-dark pointer-events-none group-hover:text-brand-500 transition-colors" />
                    </div>
                  </div>

                  {/* Operator Filter */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark ml-1">Operador</label>
                    <div className="relative group">
                      <select 
                        className="appearance-none w-full pl-4 pr-10 py-3 bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-semibold text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer hover:bg-card-light dark:hover:bg-card-dark"
                        value={operatorFilter}
                        onChange={(e) => setOperatorFilter(e.target.value)}
                      >
                        <option value="all">Todos os Operadores</option>
                        {mockOperators.map(op => (
                          <option key={op.id} value={op.id}>{op.name}</option>
                        ))}
                      </select>
                      <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-subtle-light dark:text-subtle-dark pointer-events-none group-hover:text-brand-500 transition-colors" />
                    </div>
                  </div>

                  {/* Date Filter */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark ml-1">Data da Captura</label>
                    <div className="relative group">
                      <input 
                        type="date"
                        className="w-full pl-4 pr-4 py-3 bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-semibold text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer hover:bg-card-light dark:hover:bg-card-dark"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Leads List */}
        <div className="bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark shadow-xl shadow-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted-light/50 dark:bg-muted-dark/50 text-subtle-light dark:text-subtle-dark text-[10px] uppercase tracking-widest font-semibold border-b border-border-light dark:border-border-dark">
                  <th className="px-6 py-5">Lead / Contato</th>
                  <th className="px-6 py-5">Empresa / Cargo</th>
                  <th className="px-6 py-5">Rating</th>
                  <th className="px-6 py-5">Operador</th>
                  <th className="px-6 py-5">Capturado em</th>
                  <th className="px-6 py-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => handleLeadClick(lead)}
                    className="hover:bg-brand-500/[0.02] dark:hover:bg-brand-500/[0.02] transition-all group cursor-pointer"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 font-bold text-base border border-brand-500/10 group-hover:scale-110 transition-transform">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-text-light dark:text-text-dark group-hover:text-brand-500 transition-colors">{lead.name}</span>
                          <div className="flex items-center gap-3 mt-1.5">
                            {lead.email && (
                              <span className="flex items-center gap-1.5 text-[11px] text-subtle-light dark:text-subtle-dark">
                                <Mail size={12} className="opacity-60" />
                                {lead.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-sm font-bold text-text-light dark:text-text-dark">
                          <Building2 size={14} className="text-brand-500" />
                          {lead.company || 'N/A'}
                        </span>
                        <span className="text-xs text-subtle-light dark:text-subtle-dark ml-5 font-medium">{lead.role || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <RatingBadge rating={lead.rating} />
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2.5 text-sm font-medium text-text-light dark:text-text-dark">
                        <div className="w-6 h-6 rounded-lg bg-muted-light dark:bg-muted-dark flex items-center justify-center">
                          <User size={12} className="text-subtle-light dark:text-subtle-dark" />
                        </div>
                        {lead.operatorName}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-text-light dark:text-text-dark flex items-center gap-2">
                          <Calendar size={14} className="text-subtle-light dark:text-subtle-dark" />
                          <FormattedDateTime 
                            date={lead.capturedAt} 
                            type="date" 
                          />
                        </span>
                        <span className="text-[11px] text-subtle-light dark:text-subtle-dark flex items-center gap-1.5 font-medium">
                          <Clock size={12} className="opacity-60" />
                          <FormattedDateTime 
                            date={lead.capturedAt} 
                            type="time" 
                            options={{ hour: '2-digit', minute: '2-digit' }} 
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadClick(lead);
                        }}
                        className="p-2.5 text-subtle-light dark:text-subtle-dark hover:bg-brand-500 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-brand-500/20"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 bg-muted-light/30 dark:bg-muted-dark/30 border-t border-border-light dark:border-border-dark flex items-center justify-between">
            <span className="text-sm text-subtle-light dark:text-subtle-dark font-medium">
              Mostrando <b className="text-text-light dark:text-text-dark">1-{filteredLeads.length}</b> de <b className="text-text-light dark:text-text-dark">{mockLeads.length}</b> leads
            </span>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-border-light dark:border-border-dark rounded-xl text-sm font-bold text-subtle-light dark:text-subtle-dark hover:bg-card-light dark:hover:bg-card-dark disabled:opacity-50 transition-all" disabled>
                <ChevronLeft size={18} />
                Anterior
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border-light dark:border-border-dark rounded-xl text-sm font-bold text-text-light dark:text-text-dark hover:bg-card-light dark:hover:bg-card-dark transition-all">
                Próximo
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeadDetailsModal 
        lead={selectedLead} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </DashboardLayout>
  );
}

'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockDevices, mockDashboardData } from '@/lib/mock-data';
import { 
  Smartphone, 
  User, 
  Clock, 
  Wifi, 
  Battery, 
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Zap,
  Plus,
  Settings2,
  Power,
  RefreshCcw,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import FormattedDateTime from '@/components/ui/FormattedDateTime';

const DeviceCard = ({ device }: { device: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark shadow-xl shadow-black/5 overflow-hidden group"
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 border border-brand-500/10 group-hover:scale-110 transition-transform duration-500">
              <Smartphone size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-text-light dark:text-text-dark tracking-tight">{device.deviceName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-widest bg-muted-light dark:bg-muted-dark px-2 py-0.5 rounded-md">
                  ID: {device.deviceId}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-success-main uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-success-main rounded-full animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 text-subtle-light dark:text-subtle-dark hover:bg-muted-light dark:hover:bg-muted-dark rounded-xl transition-all"
            >
              <Settings2 size={20} />
            </button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl shadow-2xl z-20 overflow-hidden"
                  >
                    <button className="w-full px-4 py-3 text-left text-xs font-bold text-text-light dark:text-text-dark hover:bg-muted-light dark:hover:bg-muted-dark flex items-center gap-2 transition-colors">
                      <RefreshCcw size={14} />
                      Reiniciar Sessão
                    </button>
                    <button className="w-full px-4 py-3 text-left text-xs font-bold text-danger-main hover:bg-danger-light/10 flex items-center gap-2 transition-colors">
                      <Power size={14} />
                      Desconectar
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark mb-2">Operador em Campo</span>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted-light/50 dark:bg-muted-dark/50 border border-border-light dark:border-border-dark">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                  <User size={16} />
                </div>
                <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                  {device.currentOperatorName || 'Nenhum'}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark mb-2">Última Atividade</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-text-light dark:text-text-dark ml-1">
                <Clock size={16} className="text-brand-500" />
                <FormattedDateTime 
                  date={device.loggedAt} 
                  type="time" 
                  options={{ hour: '2-digit', minute: '2-digit' }} 
                />
                <span className="text-[10px] text-subtle-light dark:text-subtle-dark font-normal ml-1">Hoje</span>
              </div>
            </div>
          </div>

          <div className="bg-muted-light dark:bg-muted-dark rounded-3xl p-6 flex flex-col justify-center gap-5 border border-border-light dark:border-border-dark">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-success-main" />
                <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-widest">Sinal</span>
              </div>
              <span className="text-xs font-bold text-text-light dark:text-text-dark">Excelente</span>
            </div>
            <div className="h-1.5 w-full bg-card-light dark:bg-card-dark rounded-full overflow-hidden">
              <div className="h-full w-[90%] bg-success-main rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Battery size={16} className="text-warning-main" />
                <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-widest">Bateria</span>
              </div>
              <span className="text-xs font-bold text-text-light dark:text-text-dark">85%</span>
            </div>
            <div className="h-1.5 w-full bg-card-light dark:bg-card-dark rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-warning-main rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 bg-muted-light/30 dark:bg-muted-dark/30 border-t border-border-light dark:border-border-dark flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-brand-500" />
          <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-widest">Sincronização Segura Ativa</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-success-main rounded-full" />
          <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark">Sincronizado agora</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function DevicesPage() {
  const activeCount = mockDevices.length;
  const limit = mockDashboardData.deviceLimit;
  const available = limit - activeCount;

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-text-light dark:text-text-dark tracking-tight">Dispositivos Conectados</h1>
            <p className="text-subtle-light dark:text-subtle-dark font-medium">Gerencie os aparelhos que estão em campo coletando leads.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all">
            <Plus size={18} />
            Novo Dispositivo
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
            <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-widest block mb-1">Total de Licenças</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-text-light dark:text-text-dark">{limit}</span>
              <span className="text-xs font-semibold text-subtle-light dark:text-subtle-dark">Dispositivos</span>
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
            <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-widest block mb-1">Ativos Agora</span>
            <div className="flex items-baseline gap-2 text-success-main">
              <span className="text-3xl font-black">{activeCount}</span>
              <span className="text-xs font-semibold opacity-80">Conectados</span>
            </div>
          </div>
          <div className="bg-card-light dark:bg-card-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
            <span className="text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-widest block mb-1">Disponíveis</span>
            <div className="flex items-baseline gap-2 text-brand-500">
              <span className="text-3xl font-black">{available}</span>
              <span className="text-xs font-semibold opacity-80">Vagas</span>
            </div>
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
          
          {available > 0 && (
            <button className="h-full min-h-[300px] border-2 border-dashed border-border-light dark:border-border-dark rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-brand-500 hover:bg-brand-500/[0.02] transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-muted-light dark:bg-muted-dark flex items-center justify-center text-subtle-light dark:text-subtle-dark group-hover:bg-brand-500 group-hover:text-white transition-all">
                <Plus size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold text-text-light dark:text-text-dark tracking-tight">Adicionar Dispositivo</p>
                <p className="text-xs text-subtle-light dark:text-subtle-dark font-normal">Você ainda tem {available} licenças livres</p>
              </div>
            </button>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-brand-500 p-8 rounded-3xl text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-2xl shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-black text-xl tracking-tight mb-1">Precisa de mais alcance?</h4>
                <p className="text-sm font-medium text-white/90 leading-relaxed max-w-xl">
                  Aumente o número de dispositivos simultâneos para cobrir todas as entradas do seu estande. 
                  Novas licenças são ativadas instantaneamente após a compra.
                </p>
              </div>
            </div>
            <button className="whitespace-nowrap px-8 py-4 bg-white text-brand-500 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-opacity-90 transition-all">
              Comprar Licenças
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

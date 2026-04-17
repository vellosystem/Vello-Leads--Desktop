'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockOperators } from '@/lib/mock-data';
import { ExhibitorOperator } from '@/types/vello';
import Link from 'next/link';
import { 
  Plus, 
  UserCircle, 
  ShieldCheck, 
  ShieldAlert, 
  MoreVertical, 
  Key,
  Calendar,
  ToggleLeft,
  ToggleRight,
  X,
  User,
  Lock,
  Check,
  Trash2,
  Edit2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import FormattedDateTime from '@/components/ui/FormattedDateTime';

const OperatorModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  operator = null 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSave: (name: string, pin: string) => void,
  operator?: ExhibitorOperator | null
}) => {
  const [name, setName] = React.useState('');
  const [pin, setPin] = React.useState('');

  React.useEffect(() => {
    if (operator) {
      setName(operator.name);
      setPin(''); // Don't show pin for security, but allow changing it
    } else {
      setName('');
      setPin('');
    }
  }, [operator, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && (operator || pin.length === 4)) {
      onSave(name, pin);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card-light dark:bg-card-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-text-light dark:text-text-dark tracking-tight">
                    {operator ? 'Editar Operador' : 'Novo Operador'}
                  </h2>
                  <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">
                    {operator ? 'Atualize as informações do operador.' : 'Configure o acesso para sua equipe.'}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-subtle-light dark:text-subtle-dark hover:bg-muted-light dark:hover:bg-muted-dark rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark ml-1">Nome do Operador</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark group-focus-within:text-brand-500 transition-colors" />
                    <input 
                      type="text"
                      required
                      placeholder="Ex: João Silva"
                      className="w-full pl-12 pr-4 py-4 bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-semibold text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark ml-1">
                    {operator ? 'Novo PIN (Opcional)' : 'PIN de Acesso (4 dígitos)'}
                  </label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark group-focus-within:text-brand-500 transition-colors" />
                    <input 
                      type="text"
                      required={!operator}
                      maxLength={4}
                      pattern="\d{4}"
                      placeholder={operator ? '••••' : '0000'}
                      className="w-full pl-12 pr-4 py-4 bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-mono font-bold text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all tracking-[0.5em]"
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                  <p className="text-[10px] text-subtle-light dark:text-subtle-dark ml-1">
                    {operator ? 'Deixe em branco para manter o PIN atual.' : 'Este código será usado para entrar no app coletor.'}
                  </p>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-2xl text-sm font-bold hover:bg-muted-light/80 dark:hover:bg-muted-dark/80 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-brand-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={18} />
                    {operator ? 'Salvar Alterações' : 'Criar Perfil'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  operatorName 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: () => void, 
  operatorName: string 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card-light dark:bg-card-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-danger-main/10 text-danger-main rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark tracking-tight mb-2">Excluir Operador?</h2>
              <p className="text-sm text-subtle-light dark:text-subtle-dark mb-8">
                Você está prestes a excluir <b>{operatorName}</b>. Esta ação não pode ser desfeita e o operador perderá o acesso imediatamente.
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-2xl text-sm font-bold hover:bg-muted-light/80 dark:hover:bg-muted-dark/80 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={onConfirm}
                  className="flex-1 py-4 bg-danger-main text-white rounded-2xl text-sm font-bold shadow-lg shadow-danger-main/20 hover:bg-danger-600 transition-all"
                >
                  Excluir Agora
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function OperatorsPage() {
  const [operators, setOperators] = useState(mockOperators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState<ExhibitorOperator | null>(null);
  const [deletingOperator, setDeletingOperator] = useState<ExhibitorOperator | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleOperatorStatus = (id: string) => {
    setOperators(prev => prev.map(op => 
      op.id === id ? { ...op, isActive: !op.isActive } : op
    ));
  };

  const handleSaveOperator = (name: string, pin: string) => {
    if (editingOperator) {
      setOperators(prev => prev.map(op => 
        op.id === editingOperator.id 
          ? { ...op, name, pinHash: pin || op.pinHash } 
          : op
      ));
      setEditingOperator(null);
    } else {
      const newOp: ExhibitorOperator = {
        id: `op-${Date.now()}`,
        name,
        pinHash: pin,
        isActive: true,
        createdAt: new Date(),
        exhibitorId: 'exh_1'
      };
      setOperators(prev => [newOp, ...prev]);
    }
  };

  const handleDeleteOperator = () => {
    if (deletingOperator) {
      setOperators(prev => prev.filter(op => op.id !== deletingOperator.id));
      setDeletingOperator(null);
    }
  };

  const openEditModal = (operator: ExhibitorOperator) => {
    setEditingOperator(operator);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const openDeleteModal = (operator: ExhibitorOperator) => {
    setDeletingOperator(operator);
    setActiveMenuId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Operadores</h1>
            <p className="text-subtle-light dark:text-subtle-dark text-sm font-medium">Gerencie quem pode coletar leads em nome da sua empresa.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition-all"
          >
            <Plus size={18} />
            Novo Operador
          </button>
        </div>

        {/* Operators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operators.map((operator) => (
            <motion.div 
              key={operator.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-muted-light dark:bg-muted-dark flex items-center justify-center text-subtle-light dark:text-subtle-dark group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                    <UserCircle size={32} />
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <button 
                      onClick={() => toggleOperatorStatus(operator.id)}
                      className={cn(
                        "transition-colors",
                        operator.isActive ? "text-success-main" : "text-subtle-light dark:text-subtle-dark"
                      )}
                    >
                      {operator.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === operator.id ? null : operator.id)}
                        className="p-2 text-subtle-light dark:text-subtle-dark hover:bg-muted-light dark:hover:bg-muted-dark rounded-lg transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      <AnimatePresence>
                        {activeMenuId === operator.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveMenuId(null)} 
                            />
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 10 }}
                              className="absolute right-0 top-full mt-2 w-48 bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark shadow-xl z-20 overflow-hidden"
                            >
                              <button 
                                onClick={() => openEditModal(operator)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-text-light dark:text-text-dark hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
                              >
                                <Edit2 size={16} className="text-brand-500" />
                                Editar Perfil
                              </button>
                              <button 
                                onClick={() => openDeleteModal(operator)}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-danger-main hover:bg-danger-main/5 transition-colors border-t border-border-light dark:border-border-dark"
                              >
                                <Trash2 size={16} />
                                Excluir Operador
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">{operator.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {operator.isActive ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-success-main uppercase tracking-wider">
                          <ShieldCheck size={12} />
                          Ativo
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-subtle-light dark:text-subtle-dark uppercase tracking-wider">
                          <ShieldAlert size={12} />
                          Inativo
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark mb-1">PIN de Acesso</span>
                      <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-text-light dark:text-text-dark">
                        <Key size={14} className="text-brand-500" />
                        ••••
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-subtle-light dark:text-subtle-dark mb-1">Criado em</span>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-text-light dark:text-text-dark">
                        <Calendar size={14} className="text-subtle-light dark:text-subtle-dark" />
                        <FormattedDateTime 
                          date={operator.createdAt} 
                          type="date" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-muted-light/50 dark:bg-muted-dark/50 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                <span className="text-xs text-subtle-light dark:text-subtle-dark">Leads coletados: <b className="font-bold">42</b></span>
                <Link 
                  href={`/operators/${operator.id}`}
                  className="text-xs font-bold text-brand-500 hover:underline"
                >
                  Ver Atividade
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Add New Card */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-dashed border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-subtle-light dark:text-subtle-dark hover:border-brand-500 hover:text-brand-500 transition-all group min-h-[280px]"
          >
            <div className="p-4 rounded-full bg-muted-light dark:bg-muted-dark group-hover:bg-brand-500/10 transition-colors">
              <Plus size={32} />
            </div>
            <span className="font-bold">Adicionar Operador</span>
            <p className="text-xs text-center px-4 font-medium">Crie um novo perfil para que sua equipe possa coletar leads.</p>
          </button>
        </div>

        <OperatorModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setEditingOperator(null);
          }} 
          onSave={handleSaveOperator}
          operator={editingOperator}
        />

        <DeleteConfirmationModal 
          isOpen={!!deletingOperator}
          onClose={() => setDeletingOperator(null)}
          onConfirm={handleDeleteOperator}
          operatorName={deletingOperator?.name || ''}
        />
      </div>
    </DashboardLayout>
  );
}

import React from 'react';
import {
  ShieldCheck, ArrowRight, AlertTriangle, Lock, DollarSign,
  Zap, Layers, Sparkles, CheckCircle2, Compass, Clock,
  FileCheck, ShieldAlert, Users
} from 'lucide-react';
import Card, { CardTitle } from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

interface PresentationPageProps {
  topic: 'intro' | 'problem' | 'solution' | 'benefits' | 'security' | 'conclusion';
  onNavigate?: (page: any) => void;
}

export default function PresentationPage({ topic, onNavigate }: PresentationPageProps) {
  switch (topic) {
    case 'intro':
      return (
        <div className="space-y-6 max-w-5xl mx-auto">
          <PageHeader
            badge="Visão Geral"
            secondaryBadge="GovTech Angola"
            title="Correio Digital Angola (CDA)"
            description="O Bilhete de Identidade (BI) transforma-se na morada digital oficial do cidadão para recepção de notificações públicas e privadas com plena validade jurídica."
            icon={Compass}
          />

          {/* 3 Main Visual Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl hover:border-blue-300 transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg border border-blue-100">
                BI
              </div>
              <CardTitle>Morada Digital Única</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Caixa postal oficial associada ao Bilhete de Identidade de cada cidadão.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl hover:border-blue-300 transition-all">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                <Zap size={24} />
              </div>
              <CardTitle>Entrega Instantânea</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Envio e recepção de notificações oficiais em segundos, sem deslocações.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl hover:border-blue-300 transition-all">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100">
                <ShieldCheck size={24} />
              </div>
              <CardTitle>Validade Jurídica</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Documentos certificados com assinatura digital e carimbo do tempo.
              </p>
            </Card>
          </div>

          {/* Pilot Highlight */}
          <div className="p-5 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Projecto Piloto Âncora</p>
                <p className="text-xs text-blue-800 font-semibold">Fase de arranque iniciada com o INAPEM para validação empresarial.</p>
              </div>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('strategic_goals')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all flex-shrink-0 active:scale-95 whitespace-nowrap"
              >
                <span>Metas Estratégicas</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      );

    case 'problem':
      return (
        <div className="space-y-6 max-w-5xl mx-auto">
          <PageHeader
            badge="Diagnóstico"
            secondaryBadge="Análise de Contexto"
            title="O Problema do Correio Físico"
            description="A dependência do papel e das entregas presenciais gera custos astronómicos, atrasos operacionais e perda constante de notificações oficiais."
            icon={AlertTriangle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl border-l-4 border-l-red-500">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-bold">
                <DollarSign size={22} />
              </div>
              <CardTitle>Custos Elevados</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Milhões gastos anualmente em impressão, envelopes, selos e transporte físico.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl border-l-4 border-l-amber-500">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                <Clock size={22} />
              </div>
              <CardTitle>Lentidão e Atrasos</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Semanas de espera na entrega de cartas oficiais com perda frequente de prazos legais.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl border-l-4 border-l-purple-500">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                <ShieldAlert size={22} />
              </div>
              <CardTitle>Extravios & Falhas</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Falta de localização de destinatários e ausência de prova auditável de recepção.
              </p>
            </Card>
          </div>
        </div>
      );

    case 'solution':
      return (
        <div className="space-y-6 max-w-5xl mx-auto">
          <PageHeader
            badge="A Solução"
            secondaryBadge="Plataforma Soberana"
            title="Correio Digital Certificado"
            description="Infraestrutura centralizada para envio, recepção e gestão de correspondência oficial com segurança máxima e alertas no telemóvel."
            icon={Zap}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                1
              </div>
              <CardTitle>Emissão Centralizada</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Envio directo a partir dos sistemas do Estado, INAPEM, AGT ou Banca via API.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                2
              </div>
              <CardTitle>Assinatura & Selo</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Documentos assinados digitalmente com carimbo de tempo e encriptação.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                3
              </div>
              <CardTitle>Alerta no Telemóvel</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Cidadão é notificado via SMS/WhatsApp e acede instantaneamente à sua caixa digital.
              </p>
            </Card>
          </div>
        </div>
      );

    case 'benefits':
      return (
        <div className="space-y-6 max-w-5xl mx-auto">
          <PageHeader
            badge="Benefícios"
            secondaryBadge="Impacto Imediato"
            title="Poupança e Eficiência"
            description="Redução drástica de custos operacionais para o Estado e comodidade total no acesso a documentos oficiais."
            icon={CheckCircle2}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl text-center">
              <p className="text-3xl font-black text-blue-600">-90%</p>
              <CardTitle>Redução de Custos</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Eliminação de despesas com impressão, papel, envelopes e transporte físico.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl text-center">
              <p className="text-3xl font-black text-emerald-600">0 seg</p>
              <CardTitle>Tempo de Entrega</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Comunicação imediata com confirmação e prova legal de recepção.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl text-center">
              <p className="text-3xl font-black text-purple-600">100%</p>
              <CardTitle>Sem Papel</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Governação digital, amiga do ambiente e acessível em qualquer lugar.
              </p>
            </Card>
          </div>
        </div>
      );

    case 'security':
      return (
        <div className="space-y-6 max-w-5xl mx-auto">
          <PageHeader
            badge="Segurança"
            secondaryBadge="Confiança & Privacidade"
            title="Proteção de Dados"
            description="Privacidade garantida com controlo rigoroso de acessos, encriptação de dados e registo auditável de todas as operações."
            icon={ShieldCheck}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <Lock size={20} />
              </div>
              <CardTitle>Acesso Exclusivo</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Cada cidadão acede apenas às suas notificações através de autenticação forte.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                <FileCheck size={20} />
              </div>
              <CardTitle>Encriptação Total</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Dados protegidos por encriptação em trânsito e em repouso na nuvem soberana.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                <Users size={20} />
              </div>
              <CardTitle>Rastreabilidade Total</CardTitle>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Histórico auditável e inalterável com prova jurídica irrefutável de leitura.
              </p>
            </Card>
          </div>
        </div>
      );

    case 'conclusion':
      return (
        <div className="space-y-6 max-w-5xl mx-auto">
          <PageHeader
            badge="Conclusão"
            secondaryBadge="Visão de Futuro"
            title="O Futuro da Comunicação Oficial"
            description="O Correio Digital Angola moderniza a Administração Pública e estabelece um canal direto, seguro e eficiente entre o Estado e os Cidadãos."
            icon={Sparkles}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-sm">
                <CheckCircle2 size={18} />
                <span>Modernização</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Estado mais ágil, transparente e sem burocracia desnecessária.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm">
                <ShieldCheck size={18} />
                <span>Confiança</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Notificações oficiais garantidas com certificação e validade legal.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-slate-200/90 rounded-2xl">
              <div className="flex items-center gap-2 text-purple-600 font-extrabold text-sm">
                <Sparkles size={18} />
                <span>Sustentabilidade</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Transição definitiva para uma governação digital e ecológica.
              </p>
            </Card>
          </div>
        </div>
      );

    default:
      return null;
  }
}

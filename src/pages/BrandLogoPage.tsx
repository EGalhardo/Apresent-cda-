import React from 'react';
import { motion } from 'motion/react';
import PageHeader from '../components/ui/PageHeader';

export default function BrandLogoPage() {
  const logoUrl = 'https://i.postimg.cc/sXR3Pz36/Logomarca-PNG-(1).png';

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <PageHeader
        title="Logomarca Oficial"
        description="Identidade visual e símbolo institucional do Correio Digital Angola"
      />

      {/* Main Container displaying the Logo in Large Prominent View on White Background */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center min-h-[450px] sm:min-h-[540px] relative overflow-hidden">
          {/* Large Prominent Logo Image on pure white canvas without shadows */}
          <div className="w-full flex items-center justify-center p-4 sm:p-8">
            <img
              src={logoUrl}
              alt="Logomarca Oficial Correio Digital Angola"
              className="max-w-full max-h-[460px] sm:max-h-[540px] w-auto h-auto object-contain transition-transform duration-300"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

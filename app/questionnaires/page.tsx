'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function QuestionnairesPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="max-w-[70rem] w-full">
        <div className="flex flex-col items-center mb-12">
          <Image
            src="/sd-logo.svg"
            alt="StudioDirection"
            width={216}
            height={24}
            className="mb-8"
          />
          <h1 className="text-4xl font-bold text-[#f5f5f7]">
            Questionnaires
          </h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/questionnaires/product-design"
            className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 hover:border-[#6295ff] transition-colors text-center group"
          >
            <h2 className="text-2xl font-semibold text-[#f5f5f7] mb-4 group-hover:text-[#6295ff] transition-colors">
              Product Design
            </h2>
            <p className="text-[#86868b]">
              Create a product design questionnaire
            </p>
          </Link>

          <Link
            href="/questionnaires/web-design"
            className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 hover:border-[#6295ff] transition-colors text-center group"
          >
            <h2 className="text-2xl font-semibold text-[#f5f5f7] mb-4 group-hover:text-[#6295ff] transition-colors">
              Web Design
            </h2>
            <p className="text-[#86868b]">
              Create a web design questionnaire
            </p>
          </Link>

          <Link
            href="/questionnaires/brand-design"
            className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 hover:border-[#6295ff] transition-colors text-center group"
          >
            <h2 className="text-2xl font-semibold text-[#f5f5f7] mb-4 group-hover:text-[#6295ff] transition-colors">
              Brand Design
            </h2>
            <p className="text-[#86868b]">
              Create a brand design questionnaire
            </p>
          </Link>

          <Link
            href="/questionnaires/motion"
            className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8 hover:border-[#6295ff] transition-colors text-center group"
          >
            <h2 className="text-2xl font-semibold text-[#f5f5f7] mb-4 group-hover:text-[#6295ff] transition-colors">
              Motion
            </h2>
            <p className="text-[#86868b]">
              Create a motion design questionnaire
            </p>
          </Link>
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/questionnaires/archive">
            <Button variant="outline">
              See Archive
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


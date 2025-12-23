
import React from 'react';
import { Shield, Car, Heart, Home, Briefcase, Plane } from 'lucide-react';
import { InsuranceService, Testimonial } from './types';

export const SERVICES: InsuranceService[] = [
  {
    id: 'auto',
    title: 'Seguro Auto',
    description: 'Proteção completa para seu veículo contra roubo, colisão e danos a terceiros.',
    icon: 'Car',
    color: 'blue'
  },
  {
    id: 'vida',
    title: 'Seguro de Vida',
    description: 'Tranquilidade para você e segurança financeira para quem você mais ama.',
    icon: 'Heart',
    color: 'rose'
  },
  {
    id: 'residencial',
    title: 'Residencial',
    description: 'Sua casa protegida contra incêndios, roubos e danos elétricos 24 horas.',
    icon: 'Home',
    color: 'emerald'
  },
  {
    id: 'empresarial',
    title: 'Empresarial',
    description: 'Soluções customizadas para garantir a continuidade do seu negócio.',
    icon: 'Briefcase',
    color: 'amber'
  },
  {
    id: 'saude',
    title: 'Plano de Saúde',
    description: 'Acesso às melhores redes médicas e hospitais para cuidar do seu bem-estar.',
    icon: 'Shield',
    color: 'cyan'
  },
  {
    id: 'viagem',
    title: 'Seguro Viagem',
    description: 'Viaje com segurança pelo mundo com assistência médica e suporte total.',
    icon: 'Plane',
    color: 'indigo'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ricardo Almeida',
    role: 'Empresário',
    content: 'O atendimento da SeguraMais é impecável. Tive um sinistro com meu carro e em menos de 2h tudo estava resolvido.',
    avatar: 'https://picsum.photos/seed/person1/100/100'
  },
  {
    id: '2',
    name: 'Mariana Costa',
    role: 'Arquiteta',
    content: 'Consegui unificar todos os meus seguros em um só lugar com uma economia de 20% no valor anual.',
    avatar: 'https://picsum.photos/seed/person2/100/100'
  },
  {
    id: '3',
    name: 'João Pedro Silva',
    role: 'Engenheiro',
    content: 'O assistente inteligente me ajudou a entender exatamente o que eu precisava. Sem burocracia!',
    avatar: 'https://picsum.photos/seed/person3/100/100'
  }
];

export const getIcon = (name: string, className?: string) => {
  switch (name) {
    case 'Car': return <Car className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Plane': return <Plane className={className} />;
    default: return <Shield className={className} />;
  }
};

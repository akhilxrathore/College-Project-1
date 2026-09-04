import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { PromoBanner } from '../components/home/PromoBanner';
import { WhyUsSection } from '../components/home/WhyUsSection';

export const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <PromoBanner />
      <WhyUsSection />
    </MainLayout>
  );
};

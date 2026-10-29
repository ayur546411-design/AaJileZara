import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface CardProps {
  /** Optional tag displayed on top, e.g., "15 minutes" or "Featured" */
  tag?: string;
  /** Title of the card – typically a package name or audience label */
  title: string;
  /** Short description or subtitle */
  description: string;
  /** Price string displayed prominently (e.g., "₹2,499", "FREE") */
  price?: string;
  /** Optional secondary price for student/homemaker subsidies */
  secondaryPrice?: string;
  /** Dedicated subsidy or category badge for non-package cards */
  badge?: string;
  /** URL for the primary CTA button */
  link: string;
  /** Text for the CTA button */
  buttonText?: string;
  /** Whether to highlight the card (e.g., featured package) */
  featured?: boolean;
  /** Floating circular icon (React component) */
  icon?: React.ReactNode;
}

/**
 * Reusable Card component inspired by the Skytercel layout patterns:
 * - Floating circular badge overlapping the top border
 * - Clean editorial typography and warm brand palette
 * - Subsidized rate pill or prominent pricing
 * - Sleek CTA with hover arrow
 * - Bottom brand-accent strip (Skytercel signature)
 */
export const Card: React.FC<CardProps> = ({
  tag,
  title,
  description,
  price,
  secondaryPrice,
  badge,
  link,
  buttonText = 'Enquire / Book',
  featured = false,
  icon,
}) => {
  return (
    <article
      className={`relative rounded-[22px] p-6 sm:p-7 flex flex-col justify-between text-center transition-all duration-300 group hover:-translate-y-2 ${
        icon ? 'pt-11 mt-6' : 'pt-7'
      } ${
        featured
          ? 'border-2 border-brand-gold bg-gradient-to-b from-[#FFFDF9] to-[#FFF7EB] shadow-gold hover:shadow-elevated'
          : 'border border-[#ecdcd0] bg-white hover:border-brand-gold/60 shadow-soft hover:shadow-elevated'
      }`}
    >
      {/* Floating Circular Icon Badge (Skytercel Inspired) */}
      {icon && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              featured
                ? 'bg-gradient-to-tr from-brand-wine to-[#9B1B4A] text-brand-gold-light border-2 border-brand-gold shadow-gold group-hover:scale-110'
                : 'bg-white text-brand-wine border-2 border-brand-gold/30 group-hover:border-brand-wine group-hover:bg-brand-blush/40 group-hover:scale-110'
            }`}
          >
            {icon}
          </div>
        </div>
      )}

      {/* Top Tag / Pill */}
      {tag && (
        <div className="mb-2.5">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
              featured
                ? 'bg-brand-wine text-white shadow-xs'
                : 'bg-brand-blush text-brand-wine border border-brand-wine/15'
            }`}
          >
            {featured && <Sparkles className="w-3 h-3 text-brand-gold-light" />}
            <span>{tag}</span>
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-2.5 flex-1 flex flex-col items-center">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal group-hover:text-brand-wine transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-[13px] text-[#675b59] leading-relaxed max-w-sm">
          {description}
        </p>

        {/* Subsidy Badge (e.g. for Audience cards) */}
        {badge && (
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-blush/70 text-brand-wine border border-brand-wine/20">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Pricing Section (if price exists) */}
      {(price || secondaryPrice) && (
        <div className="pt-4 my-3 border-t border-[#ecdcd0]/70 space-y-1">
          {price && (
            <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-wine">
              {price}
            </div>
          )}
          {secondaryPrice && (
            <div className="text-[11px] font-medium text-brand-charcoal/70">
              {secondaryPrice}
            </div>
          )}
        </div>
      )}

      {/* Bottom Action CTA & Skytercel Accent Bar */}
      <div className="pt-4 mt-2 border-t border-[#ecdcd0]/40 flex flex-col items-center gap-3">
        <Link
          to={link}
          className={`w-full py-2.5 px-4 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 ${
            featured
              ? 'bg-brand-wine text-white hover:bg-brand-wine-dark shadow-sm hover:shadow-soft'
              : 'border border-brand-wine/30 text-brand-wine hover:bg-brand-wine hover:text-white hover:border-transparent'
          }`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Signature Bottom Accent Strip (Skytercel Pattern) */}
        <div
          className={`h-1 rounded-full transition-all duration-300 ${
            featured
              ? 'w-16 bg-brand-gold group-hover:w-24'
              : 'w-12 bg-brand-wine/70 group-hover:w-20 group-hover:bg-brand-gold'
          }`}
        />
      </div>
    </article>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface CardProps {
  tag?: string;
  title: string;
  description: string;
  price?: string;
  secondaryPrice?: string;
  badge?: string;
  link: string;
  buttonText?: string;
  featured?: boolean;
  icon?: React.ReactNode;
}

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
      className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-center transition-all duration-300 group hover:-translate-y-1.5 ${
        icon ? 'pt-11 mt-6' : 'pt-7'
      } ${
        featured
          ? 'border-2 border-[#B5D56A] bg-white shadow-dhani hover:border-[#6E8F1F]'
          : 'border border-[#E3E8F2] bg-white hover:border-[#B5D56A] shadow-soft hover:shadow-elevated'
      }`}
    >
      {/* Floating Circular Icon Badge */}
      {icon && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              featured
                ? 'bg-[#14213D] text-[#B5D56A] border-2 border-[#B5D56A] group-hover:scale-110'
                : 'bg-white text-[#14213D] border-2 border-[#E3E8F2] group-hover:border-[#B5D56A] group-hover:bg-[#EEF5D8] group-hover:scale-110'
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
                ? 'bg-[#14213D] text-[#B5D56A] shadow-xs'
                : 'bg-[#EEF5D8] text-[#14213D] border border-[#B5D56A]/40'
            }`}
          >
            {featured && <Sparkles className="w-3 h-3 text-[#B5D56A]" />}
            <span>{tag}</span>
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-2.5 flex-1 flex flex-col items-center">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#14213D] group-hover:text-[#2C4A8A] transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-[13px] text-[#5B6784] leading-relaxed max-w-sm">
          {description}
        </p>

        {/* Subsidy Badge */}
        {badge && (
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF5D8] text-[#14213D] border border-[#B5D56A]/50">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Pricing Section */}
      {(price || secondaryPrice) && (
        <div className="pt-4 my-3 border-t border-[#E3E8F2] space-y-1">
          {price && (
            <div className="font-heading text-2xl sm:text-3xl font-bold text-[#14213D]">
              {price}
            </div>
          )}
          {secondaryPrice && (
            <div className="text-[11px] font-medium text-[#5B6784]">
              {secondaryPrice}
            </div>
          )}
        </div>
      )}

      {/* Bottom Action CTA & Accent Bar */}
      <div className="pt-4 mt-2 border-t border-[#E3E8F2] flex flex-col items-center gap-3">
        <Link
          to={link}
          className={`w-full py-2.5 px-4 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 ${
            featured
              ? 'bg-[#B5D56A] text-[#14213D] hover:bg-[#a5c758] hover:-translate-y-0.5 hover:shadow-dhani shadow-sm'
              : 'border-1.5 border-[#14213D] text-[#14213D] hover:bg-[#14213D] hover:text-white'
          }`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Bottom Accent Strip */}
        <div
          className={`h-1 rounded-full transition-all duration-300 ${
            featured
              ? 'w-16 bg-[#B5D56A] group-hover:w-24'
              : 'w-12 bg-[#14213D]/40 group-hover:w-20 group-hover:bg-[#B5D56A]'
          }`}
        />
      </div>
    </article>
  );
};

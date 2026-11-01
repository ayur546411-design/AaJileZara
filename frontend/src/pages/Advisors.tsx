import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Award, Calendar, Globe, ShieldCheck } from 'lucide-react';

export const Advisors: React.FC = () => {
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getAdvisors()
      .then((data) => {
        if (data.success && data.advisors) {
          setAdvisors(data.advisors);
        }
      })
      .catch((err) => console.warn('Could not load advisors:', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#EEF5D8]/40 py-16 border-b border-[#E3E8F2] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#B5D56A] text-xs uppercase tracking-wider font-semibold text-[#14213D] shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#6E8F1F]" />
            <span>Experienced Practitioners</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#14213D] font-bold leading-tight">
            Our Advisory Team & Mentors
          </h1>
          <p className="text-base sm:text-lg text-[#5B6784] max-w-2xl mx-auto leading-relaxed">
            Every advisor at Ji Le Zara is chosen for emotional maturity, grounded empathy, and specialized experience in social and domestic transitions.
          </p>
        </div>
      </section>

      {/* Advisors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {advisors.map((advisor) => (
            <div
              key={advisor.id}
              className="rounded-3xl p-6 sm:p-8 bg-white border border-[#E3E8F2] hover:border-[#B5D56A] shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between text-left group"
            >
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#EEF5D8] shrink-0 border border-[#E3E8F2] group-hover:scale-105 transition-transform">
                    <img
                      src={advisor.name?.toLowerCase().includes('nilambari') ? '/dr_nilambari_portrait.jpg' : (advisor.avatarUrl || '/dr_nilambari_portrait.jpg')}
                      alt={advisor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6E8F1F] font-bold block">
                      Verified Guidance Mentor
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-[#14213D]">
                      {advisor.name}
                    </h2>
                    <p className="text-xs text-[#2C4A8A] font-semibold mt-0.5">
                      {advisor.title}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5B6784] leading-relaxed">
                  {advisor.bio}
                </p>

                {/* Languages and Specializations */}
                <div className="space-y-3 pt-2 border-t border-[#E3E8F2]">
                  <div className="flex items-center gap-2 text-xs text-[#5B6784]">
                    <Globe className="w-4 h-4 text-[#6E8F1F] shrink-0" />
                    <span>Languages Spoken: <strong className="text-[#14213D]">{advisor.languages?.join(', ') || 'Hindi, English'}</strong></span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#5B6784] uppercase tracking-wider block mb-1.5">
                      Guidance Specializations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {advisor.specializations?.map((spec: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-[#EEF5D8] text-[11px] font-medium text-[#14213D] border border-[#B5D56A]/40"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E3E8F2] flex items-center justify-between">
                <Link
                  to={`/book?advisorId=${advisor.id}&plan=direct`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#B5D56A] text-[#14213D] hover:bg-[#a5c758] hover:-translate-y-0.5 transition-all shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#14213D]" />
                  <span>Book with {advisor.name.split(' ')[0]}</span>
                </Link>

                <span className="text-xs text-[#5B6784]">
                  Phone & Live Video
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safe Sanctuary Notice */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-6 rounded-2xl bg-[#EEF5D8]/50 border border-[#B5D56A]/40 text-xs text-[#5B6784] space-y-1">
          <p className="font-bold text-[#14213D] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#6E8F1F]" />
            Advisory Confidentiality Pledge
          </p>
          <p>
            All consultations are conducted under strict non-disclosure ethics. Our mentors never share private details outside the professional counseling scope.
          </p>
        </div>
      </section>
    </div>
  );
};

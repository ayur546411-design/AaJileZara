import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Award, Calendar, CheckCircle, Globe, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

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
      <section className="bg-brand-blush/30 py-16 border-b border-brand-wine/10 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge text-xs uppercase tracking-wider font-semibold">
            <Award className="w-3.5 h-3.5 text-brand-gold" />
            <span>Experienced Practitioners</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-wine font-bold leading-tight">
            Our Advisory Team & Mentors
          </h1>
          <p className="text-base sm:text-lg text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed">
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
              className="editorial-card rounded-3xl p-6 sm:p-8 bg-white flex flex-col justify-between text-left"
            >
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-blush/40 shrink-0 border border-brand-wine/15">
                    <img
                      src={advisor.name?.toLowerCase().includes('nilambari') ? '/dr_nilambari_portrait.jpg' : (advisor.avatarUrl || '/dr_nilambari_portrait.jpg')}
                      alt={advisor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-brand-gold font-bold block">
                      Verified Guidance Mentor
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
                      {advisor.name}
                    </h2>
                    <p className="text-xs text-brand-wine font-medium mt-0.5">
                      {advisor.title}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed">
                  {advisor.bio}
                </p>

                {/* Languages and Specializations */}
                <div className="space-y-3 pt-2 border-t border-brand-wine/10">
                  <div className="flex items-center gap-2 text-xs text-brand-charcoal/80">
                    <Globe className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Languages Spoken: <strong>{advisor.languages?.join(', ') || 'Hindi, English'}</strong></span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                      Guidance Specializations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {advisor.specializations?.map((spec: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-brand-blush text-[11px] font-medium text-brand-wine border border-brand-wine/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-wine/10 flex items-center justify-between">
                <Link
                  to={`/book?advisorId=${advisor.id}&plan=direct`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-brand-wine text-white hover:bg-brand-wine-dark transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-gold-light" />
                  Book with {advisor.name.split(' ')[0]}
                </Link>

                <span className="text-xs text-brand-charcoal/60">
                  Phone & Live Video
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safe Sanctuary Notice */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-6 rounded-2xl bg-brand-cream/80 border border-brand-wine/15 text-xs text-brand-charcoal/75 space-y-1">
          <p className="font-semibold text-brand-wine flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
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

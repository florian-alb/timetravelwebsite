"use client";

import Link from "next/link";
import { Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#c9a84c]/15 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="text-[#c9a84c]" size={20} />
              <span
                className="font-cinzel text-[#c9a84c] font-bold tracking-widest text-sm"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                TimeTravelAgency
              </span>
            </div>
            <p className="text-[#ededed]/40 text-sm leading-relaxed max-w-xs">
              L&apos;agence de voyage temporel de luxe. Explorez l&apos;histoire, vivez l&apos;extraordinaire.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#ededed]/60 text-xs tracking-widest uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#destinations", label: "Destinations" },
                { href: "#experience", label: "Expérience" },
                { href: "#reserver", label: "Réserver" },
                { href: "/chat", label: "Chat avec un agent" },
              ].map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-[#ededed]/50 hover:text-[#c9a84c] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[#ededed]/50 hover:text-[#c9a84c] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#ededed]/60 text-xs tracking-widest uppercase mb-4">
              Informations
            </h4>
            <ul className="space-y-3">
              {[
                "Conditions d'utilisation temporelle",
                "Politique de confidentialité",
                "Mentions légales",
                "Protocoles de sécurité",
              ].map((item) => (
                <li key={item}>
                  <span className="text-[#ededed]/30 text-sm cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#c9a84c]/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#ededed]/30 text-xs text-center">
            © 2024 TimeTravelAgency — Tous droits réservés à travers le temps.
          </p>
          <p className="text-[#ededed]/20 text-xs">
            Agréé par le Bureau International du Voyage Temporel (BIVT)
          </p>
        </div>
      </div>
    </footer>
  );
}

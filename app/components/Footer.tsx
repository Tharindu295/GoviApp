"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto" style={{ backgroundColor: '#C9E9D2' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <h3 className="text-xl font-bold text-primary">GoviApp</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Revolutionizing agriculture through technology. Track crops, manage resources,
              and optimize yields with our comprehensive agricultural management system.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                📧
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                📱
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                🐦
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Crop Management</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Resource Tracking</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Analytics</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Tutorials</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Best Practices</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Community</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <span className="text-primary mt-1">📍</span>
                <div>
                  <p className="text-muted-foreground">Agricultural Innovation Hub</p>
                  <p className="text-muted-foreground">Tech Park, Innovation District</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary">📞</span>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary">✉️</span>
                <p className="text-muted-foreground">support@goviapp.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GoviApp. Cultivating Innovation in Agriculture.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
              <a href="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

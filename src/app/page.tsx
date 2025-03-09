'use client'
import React from 'react';
import { Video, Users, Globe2, Shield, ArrowRight, MessageCircle, Heart, Sparkles, Coffee } from 'lucide-react';
import { auth } from './util/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signInWithGoogle } from './auth/google'
export default function Home() {
  onAuthStateChanged(auth, (user) => {
    console.log(auth, "AUTH1");
    console.log(user, "USER");
    if (user) {
      console.log("User ID:", user.uid);
    } else {
      console.log("User signed out");
    }
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <Video className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              FriendlyFace
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Why Join?</a>
            <a href="#stories" className="text-gray-600 hover:text-purple-600 transition-colors">Success Stories</a>
            <button onClick={() => signInWithGoogle()} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all transform hover:scale-105">
              Start Meeting Friends!
            </button>
          </div>
        </nav>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-6 flex items-center justify-center md:justify-start gap-2">
              <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                👋 Say hello to new friends!
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Turn Strangers Into
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Lifelong Friends! ✨
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              No more scrolling through profiles! Jump into fun video chats with awesome people who share your interests. Whether you&apos;re into gaming, art, or just want someone to chat with – your next best friend is a click away! ✨
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => signInWithGoogle()} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                Join the Fun! <Sparkles className="w-5 h-5" />
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all border-2 border-purple-100 flex items-center justify-center gap-2">
                Watch How It Works <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Friends having fun on video chat"
              className="rounded-2xl shadow-2xl transform -rotate-2"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg transform rotate-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium">Early access coming soon!</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Why You&apos;ll Love It Here! 💝
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Join thousands of amazing people who are making genuine connections every day through fun, safe, and meaningful video chats!
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Coffee className="w-8 h-8 text-purple-600" />}
              title="Casual & Fun"
              description="No awkward small talk! Jump into themed rooms about your favorite topics and instantly connect over shared interests."
              gradient="from-purple-500 to-purple-600"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-pink-600" />}
              title="Safe & Comfy"
              description="Our friendly community guidelines and awesome moderators keep the vibes positive and welcoming for everyone!"
              gradient="from-pink-500 to-pink-600"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-purple-600" />}
              title="Magic Matching"
              description="Our smart system connects you with people who share your passions. Gaming? Art? Music? Find your tribe!"
              gradient="from-purple-500 to-pink-600"
            />
          </div>
        </div>
      </section>

      {/* What to Expect Section (replacing metrics) */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            What&apos;s Coming Soon! 🚀
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interest Rooms</h3>
              <p className="text-gray-600">Video chat rooms organized by interests - gaming, art, music, and more!</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Hangouts</h3>
              <p className="text-gray-600">Join fun group activities and games with new friends!</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Globe2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Community</h3>
              <p className="text-gray-600">Connect with awesome people from all around the world!</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Friend Events</h3>
              <p className="text-gray-600">Weekly social events and fun challenges to meet new people!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-8 md:mb-0">
              <Video className="w-6 h-6" />
              <span className="text-xl font-bold">FriendlyFace</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <a href="#" className="hover:text-purple-300 transition-colors">Privacy (we take it seriously!)</a>
              <a href="#" className="hover:text-purple-300 transition-colors">Terms (the boring stuff)</a>
              <a href="#" className="hover:text-purple-300 transition-colors">Say Hi! 👋</a>
              <a href="#" className="hover:text-purple-300 transition-colors">About Us</a>
            </div>
          </div>
          <div className="mt-8 text-center text-purple-200 text-sm">
            Made with ❤️ for friendship | © 2024 FriendlyFace
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode; title: string; description: string; gradient: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-purple-100 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
      <div className={`mb-4 p-4 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

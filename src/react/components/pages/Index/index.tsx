import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/react/components/Navbar';
import { Rocket, Zap, Box, Trophy } from 'lucide-react';

type IconType = React.ComponentType<{ className?: string }>;

const FeatureCard: React.FC<{ 
  icon: IconType; 
  title: string; 
  description: string 
}> = ({ 
  icon: Icon, 
  title, 
  description 
}) => (
  <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized stack."
    },
    {
      icon: Zap,
      title: "Easy to Use",
      description: "Intuitive interface that gets you up and running in minutes."
    },
    {
      icon: Box,
      title: "Powerful Features",
      description: "All the tools you need to manage your content effectively."
    },
    {
      icon: Trophy,
      title: "Award Winning",
      description: "Recognized by industry leaders for excellence in design."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to OpenFav
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            The modern way to manage and share your favorite links and resources.
          </p>
          <button 
            onClick={() => navigate('/auth')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Amazing Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p>© {new Date().getFullYear()} OpenFav. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
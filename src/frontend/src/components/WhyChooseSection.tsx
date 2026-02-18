import Section from './Section';
import GlassCard from './GlassCard';
import { Clock, BookOpen, Users, TrendingUp, MessageCircle } from 'lucide-react';

const FEATURES = [
  {
    icon: Clock,
    title: 'Lifetime Access',
    description: 'Learn at your own pace with unlimited access to all course materials',
  },
  {
    icon: BookOpen,
    title: 'Practical Learning',
    description: 'Hands-on projects and real-world applications for every concept',
  },
  {
    icon: Users,
    title: 'Beginner Friendly',
    description: 'No prior experience needed - start from scratch and master new skills',
  },
  {
    icon: TrendingUp,
    title: 'Earn Online Skills',
    description: 'Learn proven strategies to monetize your skills and earn online',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    description: '24/7 support and guidance from our expert team via WhatsApp',
  },
];

export default function WhyChooseSection() {
  return (
    <Section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Why Choose AI Academy
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of students transforming their careers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <GlassCard
              key={index}
              className="p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
                <Icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}

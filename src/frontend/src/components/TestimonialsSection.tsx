import Section from './Section';
import GlassCard from './GlassCard';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Freelancer',
    image: '/assets/generated/result-1.dim_900x600.png',
    quote: 'AI Academy transformed my career! I went from zero to earning ₹50,000/month in just 3 months.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Digital Marketer',
    image: '/assets/generated/result-2.dim_900x600.png',
    quote: 'The ChatGPT course is incredible. Now I automate my work and have doubled my productivity.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Content Creator',
    image: '/assets/generated/result-3.dim_900x600.png',
    quote: 'Instagram Growth course helped me reach 100K followers. Best investment I ever made!',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    role: 'Entrepreneur',
    image: '/assets/generated/result-4.dim_900x600.png',
    quote: 'The ebooks are pure gold! Practical strategies that actually work. Highly recommended.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <Section className="py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Student Success Stories
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real results from real students
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <GlassCard key={index} className="p-6 hover:scale-105 transition-all duration-300">
            <div className="flex gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-lg object-cover border-2 border-blue-500/30"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

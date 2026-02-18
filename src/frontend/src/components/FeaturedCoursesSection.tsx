import { useGetProductsByType } from '../hooks/useQueries';
import Section from './Section';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

const FEATURED_COURSE_IDS = ['ai-mastery', 'chatgpt-earning', 'freelancing-course', 'instagram-growth'];

export default function FeaturedCoursesSection() {
  const { data: courses, isLoading } = useGetProductsByType('course');

  const featuredCourses = courses?.filter((course) => FEATURED_COURSE_IDS.includes(course.id)) || [];

  return (
    <Section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Featured Courses
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master in-demand skills with our comprehensive courses
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <ProductCard key={course.id} product={course} />
          ))}
        </div>
      )}
    </Section>
  );
}

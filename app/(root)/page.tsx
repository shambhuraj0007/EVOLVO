import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import InterviewCard from '@/components/InterviewCard'


const page = () => {
    // Dummy data for testing
const hasPastInterviews = [
  {
    id: "1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "Next.js", "TailwindCSS"],
    createdAt: "2025-08-01T12:00:00Z",
  },
  {
    id: "2",
    role: "Backend Engineer",
    type: "Behavioural",
    techstack: ["Node.js", "Express", "MongoDB"],
    createdAt: "2025-08-15T09:30:00Z",
  },
  {
    id: "3",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["React", "Node.js", "PostgreSQL"],
    createdAt: "2025-08-20T15:45:00Z",
  },
];
// Dummy upcoming interviews
const allInterview = [
  {
    id: "101",
    role: "Machine Learning Engineer",
    type: "Technical",
    techstack: ["Python", "TensorFlow", "Scikit-learn"],
    createdAt: "2025-09-01T10:00:00Z",
  },
  {
    id: "102",
    role: "UI/UX Designer",
    type: "Behavioural",
    techstack: ["Figma", "Adobe XD", "Prototyping"],
    createdAt: "2025-09-03T14:00:00Z",
  },
  {
    id: "103",
    role: "DevOps Engineer",
    type: "Mixed",
    techstack: ["AWS", "Docker", "Kubernetes"],
    createdAt: "2025-09-05T09:30:00Z",
  },
];


  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews.length ? (
            hasPastInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={interview?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
         {allInterview ? (
  allInterview.map((interview) => (
    <InterviewCard
      key={interview.id}
      userId="dummyUser123"
      interviewId={interview.id}
      role={interview.role}
      type={interview.type}
      techstack={interview.techstack}
      createdAt={interview.createdAt}
    />
  ))
) : (
  <p>No upcoming interviews.</p>
)}
        </div>
      </section>
    </>
  );
}

export default page
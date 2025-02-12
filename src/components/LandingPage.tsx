import React from "react";
import {
  Layout,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  Target,
  Clock,
} from "lucide-react";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pb-20 pt-28">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-black dark:text-white">
              Master Your Day with Intelligent Task Management
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Task Manager helps you organize, prioritize, and accomplish more.
              Transform your productivity with our intuitive task management
              system designed for modern professionals.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href={"/sign-in"}
                // onClick={() => (window.location.href = "/signup")}
                className="flex items-center rounded-lg bg-blue-700 px-8 py-3 text-white transition hover:bg-green-900"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="rounded-lg border border-gray-300 px-8 py-3 text-gray-700 transition hover:border-gray-400">
                Watch Demo
              </button>
            </div>
            <div className="mt-12">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070"
                alt="Task Manager Dashboard"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-blue-600">
              Everything you need to stay productive
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Powerful features that help you take control of your tasks and
              boost your productivity.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Smart Task Organization
              </h3>
              <p className="text-gray-600">
                Organize tasks with custom categories, priorities, and due
                dates. Let AI help you prioritize.
              </p>
            </div>
            <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Time Tracking</h3>
              <p className="text-gray-600">
                Track time spent on tasks and get insights into your
                productivity patterns.
              </p>
            </div>
            <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Team Collaboration</h3>
              <p className="text-gray-600">
                Work together seamlessly with your team. Share tasks, delegate,
                and track progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-blue-600">
                Why Choose Task Manager?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Intuitive Design</h3>
                    <p className="text-gray-600">
                      Get started quickly with our user-friendly interface.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      AI-Powered Insights
                    </h3>
                    <p className="text-gray-600">
                      Let our AI help you make better decisions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Enterprise Security
                    </h3>
                    <p className="text-gray-600">
                      Your data is protected with bank-level security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070"
                alt="Team collaboration"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8 mt-8 rounded-[100px] bg-black py-20 md:ml-[200px] md:mr-[200px]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-blue-600">
              Ready to transform your productivity?
            </h2>
            <p className="mb-8 text-xl text-indigo-100">
              Join thousands of professionals who use Task Manager to manage
              their daily tasks and achieve their goals.
            </p>
            <Link
              //   onClick={() => (window.location.href = "/signup")}
              href={"/sign-in"}
              className="rounded-lg bg-blue-600 px-8 py-3 text-white transition hover:bg-green-900"
            >
              Get Started Now - It's Free
            </Link>
            <p className="mt-4 text-indigo-200">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="m-0 rounded-[100px] bg-black p-8 py-12 text-white dark:bg-blue-800 dark:text-gray-400">
        <div className="container mx-auto px-6">
          <div className="flex flex-col justify-between md:flex-row">
            {/* Left Section - 50% */}
            <div className="md:w-1/2">
              <div className="mb-4 flex items-center space-x-2 text-white">
                <Layout className="h-6 w-6" />
                <span className="text-xl font-bold">Task Manager</span>
              </div>
              <p className="text-sm">
                Transform your productivity with our intuitive task management
                system designed for modern professionals. Stay on top of
                deadlines, collaborate seamlessly with your team, and track
                progress effortlessly.
              </p>
            </div>

            {/* Right Section - 50% (Links) */}
            <div className="mt-6 flex justify-around md:mt-0 md:w-1/2">
              <div>
                <h3 className="mb-4 font-semibold text-white">Product</h3>
                <ul className="space-y-2 text-white">
                  <li>
                    <a href="#features" className="text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-white">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-white">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Task Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

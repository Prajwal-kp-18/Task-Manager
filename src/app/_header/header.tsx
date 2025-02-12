import Link from "next/link";
import { Suspense, cache } from "react";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Layout,
  LayoutDashboard,
  Loader2Icon,
  LogOut,
  Calendar,
  Menu,
} from "lucide-react";
import { getUserProfileUseCase } from "@/use-cases/users";
import { ModeToggle } from "./mode-toggle";
import { MenuButton } from "./menu-button";
import { UserId } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";

const profilerLoader = cache(getUserProfileUseCase);

export async function Header() {
  const user = await getCurrentUser();

  return (
    <>
      {/* Permanent Sidebar for Desktop */}
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="sticky top-0 z-30 flex h-screen flex-col p-4">
          <Link href="/" className="mb-8 flex items-center gap-2 text-xl">
            <Layout className="h-6 w-6" />
            <div>Task Manager</div>
          </Link>

          {user ? (
            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/tasks"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Calendar className="h-5 w-5" />
                <span>My Tasks</span>
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Calendar className="h-5 w-5" />
                <span>Projects</span>
              </Link>
              <Link
                href="/calendar"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Calendar className="h-5 w-5" />
                <span>Calendar</span>
              </Link>
            </nav>
          ) : (
            <Image
              src="/images/tenor.gif"
              alt="Loading"
              width={200}
              height={200}
              className="mt-10"
            />
          )}
        </div>
      </aside>

      {/* Top Header Bar */}
      <div className="fixed left-0 right-0 top-0 z-40 border-b bg-background md:left-64">
        <div className="flex h-16 items-center px-4">
          {/* Mobile Toggle and Logo */}
          <div className="flex items-center gap-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex h-full w-64 max-w-xs flex-col overflow-y-auto p-0"
              >
                <div className="border-b p-4">
                  <Link href="/" className="flex items-center gap-2 text-xl">
                    <Layout className="h-6 w-6" />
                    <div>Task Manager</div>
                  </Link>
                </div>

                {user ? (
                  <nav className="flex-grow space-y-1 p-4">
                    <SheetClose asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <LayoutDashboard className="mr-2 h-5 w-5" />
                        Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/tasks"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        My Tasks
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/projects"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        Projects
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/calendar"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        Calendar
                      </Link>
                    </SheetClose>
                  </nav>
                ) : (
                  <div className="mt-10 flex justify-center">
                    <Image
                      src="/images/tenor.gif"
                      alt="Loading"
                      width={150}
                      height={150}
                      className="mx-auto"
                    />
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="flex items-center gap-2 text-lg md:hidden"
            >
              <Layout className="h-5 w-5" />
              <span>Task Manager</span>
            </Link>
          </div>

          {/* Right side items */}
          <div className="ml-auto flex items-center gap-4">
            <Suspense
              fallback={
                <div className="flex w-8 items-center justify-center">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                </div>
              }
            >
              <HeaderActions />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

async function ProfileAvatar({ userId }: { userId: number }) {
  const profile = await profilerLoader(userId);

  return (
    <Avatar>
      <AvatarImage src={"/next.svg"} />
      <AvatarFallback>
        {profile.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
      </AvatarFallback>
    </Avatar>
  );
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <>
          <ModeToggle />
          <ProfileDropdown userId={user.id} />
        </>
      ) : (
        <>
          <ModeToggle />
          <Button asChild variant="secondary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </>
  );
}

async function ProfileDropdown({ userId }: { userId: UserId }) {
  const profile = await profilerLoader(userId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Suspense
          fallback={
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800">
              ..
            </div>
          }
        >
          <ProfileAvatar userId={userId} />
        </Suspense>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{profile.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link className="flex items-center" href={"/api/sign-out"}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

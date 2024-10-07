import { Bookmark, Briefcase, LogIn, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const NAV_LINKS = [
  {
    href: "/",
    icon: <Briefcase size={28} />,
    label: "Home",
  },
  {
    href: "/search",
    icon: <Search size={28} />,
    label: "Search",
  },
  {
    href: "/bookmarks",
    icon: <Bookmark size={28} />,
    label: "Bookmarks",
  },
  {
    href: "/signin",
    icon: <LogIn size={28} />,
    label: "Sign in",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="bg-raisin-black flex flex-col justify-between pt-[1.5rem] px-[0.5625rem] w-full max-w-[3.5625rem] h-dvh sticky top-0 left-0">
      <Logo />
      <div className="mb-6 space-y-10">
        {NAV_LINKS.map(({ href, icon, label }) => {
          const isActiveLink = href === pathname;
          return (
            <div key={href}>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      to={href}
                      className={cn(
                        "before:absolute size-9 flex items-center justify-center relative before:-left-2 before:rounded-e before:bg-white before:h-full",
                        {
                          "before:w-1 [&_>_svg]:stroke-white": isActiveLink,
                          "[&_>_svg]:hover:stroke-white hover:bg-accent":
                            !isActiveLink,
                        }
                      )}
                    >
                      {icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        })}
        <div className="aspect-square  rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/svgs/demo-logo.svg"
            alt="demo logo"
            width={150}
            height={150}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

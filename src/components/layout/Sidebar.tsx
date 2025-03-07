
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LineChart,
  PieChart,
  Home,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: LineChart,
  },
  {
    title: "Products",
    href: "/products",
    icon: PieChart,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center px-4 border-b">
        {!collapsed && (
          <span className="text-xl font-semibold tracking-tight animate-fade-in">
            Analytics
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "ml-auto flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                item.href === "/" && "bg-accent/50 font-medium text-foreground"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t">
        <div className="grid gap-1 p-2">
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Settings className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
            {!collapsed && <span>Settings</span>}
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <HelpCircle className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
            {!collapsed && <span>Help</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}

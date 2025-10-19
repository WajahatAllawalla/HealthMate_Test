import { Activity, Heart, FileText, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const HealthDashboard = () => {
  const stats = [
    {
      title: "Health Records",
      value: "12",
      icon: FileText,
      description: "Recent reports",
      color: "text-primary",
    },
    {
      title: "Vital Signs",
      value: "Normal",
      icon: Heart,
      description: "All within range",
      color: "text-secondary",
    },
    {
      title: "AI Insights",
      value: "3",
      icon: Brain,
      description: "New recommendations",
      color: "text-accent",
    },
    {
      title: "Activity",
      value: "Active",
      icon: Activity,
      description: "Last updated today",
      color: "text-primary",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
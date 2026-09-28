export type HomeProjectMetric = {
    label: string;
    value: string;
  };
  
  export type HomeProject = {
    slug: string;
    title: string;
    description: string;
    metrics: HomeProjectMetric[];
  };
  
  export const homeProjects: HomeProject[] = [
    {
      slug: "agent-studio",
  
      title: "Agent Studio",
  
      description:
        "An intelligent knowledge management platform that helps you effortlessly organize and access vast information resources.",
  
      metrics: [
        {
          label:
            "Research Efficiency Improvement",
  
          value: "90%",
        },
  
        {
          label:
            "Companies Onboard",
  
          value: "200+",
        },
  
        {
          label:
            "User Onboarded with 2 months",
  
          value: "2,000+",
        },
      ],
    },
  
    {
      slug: "automind-ai",
  
      title: "Automind.ai",
  
      description:
        "An intelligent knowledge management platform that helps you effortlessly organize and access vast information resources.",
  
      metrics: [
        {
          label:
            "Users Joined Waiting list in 5 Days",
  
          value: "2,000+",
        },
  
        {
          label:
            "Users Joined Official Discord Channel",
  
          value: "5,000+",
        },
  
        {
          label:
            "First Day Landing Page Views",
  
          value: "1,600+",
        },
      ],
    },
  
    {
      slug: "pathy-travel",
  
      title: "Pathy Travel",
  
      description:
        "Plan your trip the smart way — fast, simple, and perfectly organized from start to finish.",
  
      metrics: [
        {
          label:
            "User Satisfaction",
  
          value: "90%",
        },
  
        {
          label:
            "Task Success Rate",
  
          value: "100%",
        },
      ],
    },
  ];
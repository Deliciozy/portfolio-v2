export type ProjectMetric = {
    label: string;
    value: string;
  };
  
  export type ProjectRoleItem = {
    label: string;
    value: string;
  };
  
  export type ProjectMedia = {
    label: string;
    caption?: string;
  };
  
  export type StorySection = {
    sectionLabel: string;
  
    tags?: string[];
  
    title: string;
  
    body: string[];
  
    layout:
      | "text-left"
      | "text-right"
      | "text-only"
      | "media-only"
      | "comparison";
  
    media?: ProjectMedia[];
  
    highlight?: string;
  };
  
  export type ProjectChapter = {
    title: string;
  
    sections: StorySection[];
  };
  
  export type ProjectCaseStudy = {
    intro: string;
  
    heroMedia: ProjectMedia;
  
    mainFeature: {
      label: string;
      title: string;
      description: string;
      media: ProjectMedia;
    };
  
    memorableMoment: {
      title: string;
      highlight?: string;
      body: string[];
    };
  
    roleItems: ProjectRoleItem[];
  
    chapters: ProjectChapter[];
  
    impact: {
      title: string;
      body: string[];
      metrics: ProjectMetric[];
    };
  };
  
  export type Project = {
    slug: string;
  
    title: string;
  
    category: string;
  
    year: string;
  
    role: string;
  
    description: string;
  
    imageLabel: string;
  
    metrics: ProjectMetric[];
  
    caseStudy: ProjectCaseStudy;
  };
  
  export const projects: Project[] = [
    {
      slug: "agent-studio",
  
      title: "Agent Studio",
  
      category: "Multi-AI BIO R&D Solution",
  
      year: "2024",
  
      role: "Product Designer",
  
      description:
        "An AI-powered platform for accelerating scientific research and supporting human-AI collaboration.",
  
      imageLabel: "Agent Studio Cover",
  
      metrics: [
        {
          label: "Efficiency Improvement",
          value: "90%",
        },
        {
          label: "Companies Onboarded",
          value: "200+",
        },
        {
          label: "Users",
          value: "2K+",
        },
      ],
  
      caseStudy: {
        intro:
          "I led the design of an AI-powered platform for accelerating drug discovery, turning a vague idea of faster research with agents into a tool scientists could trust.",
  
        heroMedia: {
          label: "Agent Studio Hero Artwork",
          caption: "Hero illustration placeholder",
        },
  
        mainFeature: {
          label: "Solution",
          title: "Main Features",
          description:
            "Users can send commands through simple conversations and monitor the AI agent's background operations at any time.",
  
          media: {
            label: "Agent Studio Main Feature Screen",
            caption: "Main product interface placeholder",
          },
        },
  
        memorableMoment: {
          title: "Most Memorable Moment",
  
          highlight:
            "When Design Stopped Being Decoration and Became Direction",
  
          body: [
            "This section captures the moment when design moved beyond arranging screens and began shaping how the product and team should move forward.",
  
            "The key lesson was that design can act as a lens through which teams understand direction, not simply as a layer of visual execution.",
          ],
        },
  
        roleItems: [
          {
            label: "My Role",
            value: "Product Designer; Mentor of Interns",
          },
          {
            label: "Duration",
            value: "Apr–Aug 2024",
          },
          {
            label: "Tools",
            value: "Figma; Midjourney; LottieFiles",
          },
          {
            label: "Collaborators",
            value: "Product Director; Mentor; Intern",
          },
        ],
  
        chapters: [
          {
            title:
              "Chapter 1 - I Refused to Let It Become Just Another Chatbot",
  
            sections: [
              {
                sectionLabel: "Section 1",
  
                tags: [
                  "Kickoff",
                  "Stakeholder Interviews",
                  "Requirements Gathering",
                ],
  
                title:
                  "I Entered With Questions Others Hadn't Asked Yet",
  
                body: [
                  "The project began by questioning whether a chat-based interface alone could support how scientists actually work.",
  
                  "The design challenge was not simply to decorate an AI idea, but to reshape vague product thinking into something customers could use.",
                ],
  
                layout: "text-left",
  
                media: [
                  {
                    label:
                      "AI Chat vs Scientist Workflow Illustration",
                  },
                ],
              },
  
              {
                sectionLabel: "Section 2",
  
                tags: [
                  "Client Workshop",
                  "User Needs Discovery",
                  "Workflow Visualization",
                ],
  
                title:
                  "When Clients Asked for Control, I Realized Data Alone Wasn't Enough",
  
                body: [
                  "Client conversations revealed that users needed visibility and reassurance, not only access to information.",
  
                  "The workflow therefore needed to make invisible AI actions understandable and controllable.",
                ],
  
                layout: "text-left",
  
                media: [
                  {
                    label:
                      "Black-box Chatbot vs Visual Workflow Comparison",
                  },
                ],
              },
  
              {
                sectionLabel: "Section 3",
  
                tags: [
                  "Competitive Analysis",
                  "Wireframes",
                  "Interaction Flows",
                ],
  
                title:
                  "I Challenged the Three-Window Idea With My Own Vision",
  
                body: [
                  "The original concept separated workflow, collaboration, and chat into multiple windows.",
  
                  "A simpler two-window structure was proposed to reduce fragmentation and make the system easier to understand.",
                ],
  
                layout: "comparison",
  
                media: [
                  {
                    label:
                      "Three-window Concept",
                    caption: "Too fragmented",
                  },
                  {
                    label:
                      "Two-window Concept",
                    caption: "Simpler and clearer",
                  },
                ],
  
                highlight:
                  "Scientists don't need more screens—they need clarity.",
              },
  
              {
                sectionLabel: "Section 4",
  
                tags: [
                  "Design Critique",
                  "Information Architecture",
                  "Trade-offs",
                ],
  
                title:
                  "When My Idea Broke, I Learned to Redefine Compromise",
  
                body: [
                  "The project required balancing a preferred design direction with engineering constraints and product priorities.",
  
                  "Instead of treating compromise as failure, the work focused on preserving the most important user needs while adapting the structure.",
                ],
  
                layout: "text-right",
  
                media: [
                  {
                    label:
                      "Agent Status Visualization",
                  },
                  {
                    label:
                      "Three-window vs Two-window Comparison",
                  },
                ],
              },
            ],
          },
  
          {
            title:
              "Chapter 2 - When Delivery Pressure Hit, I Chose Ownership Over Shortcuts",
  
            sections: [
              {
                sectionLabel: "Section 1",
  
                tags: [
                  "Moodboard",
                  "Hi-fi Mockups",
                  "Design Review",
                ],
  
                title:
                  "The First Time the CEO Remembered My Name",
  
                body: [
                  "Two visual directions were explored and presented for review.",
  
                  "The selected direction became a signal that the design was contributing to product direction rather than merely production.",
                ],
  
                layout: "comparison",
  
                media: [
                  {
                    label:
                      "Minimalist Scientific Direction",
                  },
                  {
                    label:
                      "Tech-Aesthetic Direction",
                  },
                ],
              },
  
              {
                sectionLabel: "Section 2",
  
                tags: [
                  "User Flows",
                  "Design System Consistency",
                  "Team Collaboration",
                ],
  
                title:
                  "I Became a Designer and a Mentor at the Same Time",
  
                body: [
                  "As production work expanded, part of the design process shifted toward delegation, annotation, and mentoring.",
  
                  "The goal became not only delivering screens, but helping another designer contribute effectively.",
                ],
  
                layout: "text-left",
  
                media: [
                  {
                    label:
                      "Mentorship and Collaboration Flow",
                  },
                  {
                    label:
                      "Collaboration Screenshots",
                  },
                ],
              },
  
              {
                sectionLabel: "Section 3",
  
                tags: [
                  "Design Specs",
                  "QA Walkthrough",
                  "Developer Handoff",
                ],
  
                title:
                  "I Took Responsibility All the Way to Development",
  
                body: [
                  "Design ownership continued through handoff, QA, motion guidance, bug tracking, and implementation review.",
  
                  "The goal was to protect the experience through the final development stage.",
                ],
  
                layout: "text-right",
  
                media: [
                  {
                    label:
                      "Motion Demo",
                  },
                  {
                    label:
                      "QA Tracking System",
                  },
                ],
              },
  
              {
                sectionLabel: "Section 4",
  
                tags: [
                  "Product Metrics",
                  "Stakeholder Feedback",
                  "OKR Alignment",
                ],
  
                title:
                  "It Wasn't Just a Dashboard—It Was a 90% Efficiency Leap",
  
                body: [
                  "The final impact was measured not only through delivery, but through how much the new workflow improved research efficiency.",
  
                  "The outcome reinforced the importance of connecting design decisions to measurable product impact.",
                ],
  
                layout: "text-left",
  
                media: [
                  {
                    label:
                      "Efficiency Metrics Visualization",
                  },
                ],
              },
            ],
          },
        ],
  
        impact: {
          title: "Impact",
  
          body: [
            "The project became a story about reframing workflows, bridging cross-functional conflicts, and owning the product experience through delivery.",
  
            "The final results reflected both product adoption and measurable improvements to research efficiency.",
          ],
  
          metrics: [
            {
              label: "Efficiency Improvement",
              value: "90%",
            },
            {
              label: "Companies",
              value: "200+",
            },
            {
              label: "Users",
              value: "2K+",
            },
          ],
        },
      },
    },
  
    {
      slug: "automind-ai",
  
      title: "Automind.ai",
  
      category: "AI Product",
  
      year: "2026",
  
      role: "Product Designer",
  
      description:
        "An intelligent knowledge management system that helps users organize and access information resources.",
  
      imageLabel: "Automind.ai Cover",
  
      metrics: [
        {
          label: "Waitlist Signups",
          value: "8,000+",
        },
        {
          label: "Community Members",
          value: "8,000+",
        },
        {
          label: "Landing Page Views",
          value: "1,600+",
        },
      ],
  
      caseStudy: {
        intro:
          "Automind.ai case study content will be added using the same reusable project system.",
  
        heroMedia: {
          label: "Automind.ai Hero Image",
        },
  
        mainFeature: {
          label: "Solution",
          title: "Main Features",
          description:
            "Main feature description placeholder.",
  
          media: {
            label: "Automind.ai Product Screen",
          },
        },
  
        memorableMoment: {
          title: "Most Memorable Moment",
  
          body: [
            "Story content placeholder.",
          ],
        },
  
        roleItems: [
          {
            label: "My Role",
            value: "Product Designer",
          },
          {
            label: "Duration",
            value: "TBD",
          },
          {
            label: "Tools",
            value: "Figma",
          },
          {
            label: "Collaborators",
            value: "TBD",
          },
        ],
  
        chapters: [],
  
        impact: {
          title: "Impact",
  
          body: [
            "Impact narrative placeholder.",
          ],
  
          metrics: [
            {
              label: "Waitlist Signups",
              value: "8,000+",
            },
            {
              label: "Community Members",
              value: "8,000+",
            },
            {
              label: "Landing Page Views",
              value: "1,600+",
            },
          ],
        },
      },
    },
  
    {
      slug: "pathy-travel",
  
      title: "Pathy Travel",
  
      category: "Travel Product",
  
      year: "2025",
  
      role: "Product Designer",
  
      description:
        "Plan your trip the smart way — fast, simple, and organized from start to finish.",
  
      imageLabel: "Pathy Travel Cover",
  
      metrics: [
        {
          label: "User Satisfaction",
          value: "80%",
        },
        {
          label: "Task Success Rate",
          value: "100%",
        },
      ],
  
      caseStudy: {
        intro:
          "Pathy Travel case study content will be added using the same reusable project system.",
  
        heroMedia: {
          label: "Pathy Travel Hero Image",
        },
  
        mainFeature: {
          label: "Solution",
          title: "Main Features",
          description:
            "Main feature description placeholder.",
  
          media: {
            label: "Pathy Travel Product Screen",
          },
        },
  
        memorableMoment: {
          title: "Most Memorable Moment",
  
          body: [
            "Story content placeholder.",
          ],
        },
  
        roleItems: [
          {
            label: "My Role",
            value: "Product Designer",
          },
          {
            label: "Duration",
            value: "TBD",
          },
          {
            label: "Tools",
            value: "Figma",
          },
          {
            label: "Collaborators",
            value: "TBD",
          },
        ],
  
        chapters: [],
  
        impact: {
          title: "Impact",
  
          body: [
            "Impact narrative placeholder.",
          ],
  
          metrics: [
            {
              label: "User Satisfaction",
              value: "80%",
            },
            {
              label: "Task Success Rate",
              value: "100%",
            },
          ],
        },
      },
    },
  ];
  
  export function getProjectBySlug(
    slug: string
  ) {
    return projects.find(
      (project) => project.slug === slug
    );
  }
  
  export function getNextProject(
    slug: string
  ) {
    const currentIndex =
      projects.findIndex(
        (project) => project.slug === slug
      );
  
    if (currentIndex === -1) {
      return projects[0];
    }
  
    return projects[
      (currentIndex + 1) %
        projects.length
    ];
  }
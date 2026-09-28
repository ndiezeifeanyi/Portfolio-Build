export type EditableLink = {
  label: string;
  url: string;
};

export type EditableProfile = {
  name: string;
  shortName: string;
  headline: string;
  intro: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  otherLinks: EditableLink[];
  cvPath: string;
  updatedAt: string | null;
};

export const defaultProfile: EditableProfile = {
  name: "Ndibueze Ifeanyichukwu Chibuzor",
  shortName: "Ndibueze Chibuzor",
  headline: "Microbiology-trained builder working across data, AI, and health.",
  intro:
    "I am a Microbiology graduate from the University of Nigeria, Nsukka, developing computational approaches to biological and healthcare problems through data science, machine learning, and practical AI applications.",
  location: "Nigeria",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  otherLinks: [],
  cvPath: "/cv/ndibueze-cv.pdf",
  updatedAt: null,
};

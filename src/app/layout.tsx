import "./globals.css";

const description =
  "Portfolio of Ndibueze Ifeanyichukwu Chibuzor, a Microbiology graduate building toward data science, machine learning, AI-enabled digital health, and computational biology.";

export const metadata = {
  title: "Ndibueze Ifeanyichukwu Chibuzor | Science, Data, AI & Health",
  description,
  keywords: [
    "Ndibueze Ifeanyichukwu Chibuzor",
    "microbiology",
    "data science",
    "machine learning",
    "AI-enabled digital health",
    "public health research",
    "computational biology",
  ],
  openGraph: {
    title: "Ndibueze Ifeanyichukwu Chibuzor",
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ndibueze Ifeanyichukwu Chibuzor",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ndibueze Ifeanyichukwu Chibuzor",
    description,
    knowsAbout: [
      "Microbiology",
      "Public health research",
      "Data science",
      "Machine learning",
      "Artificial intelligence",
      "Digital health",
      "Computational biology",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Nigeria, Nsukka",
    },
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Cuestionario de Procesos — Truly Nolen",
  description: "Evaluación de conocimiento del Manual de Procesos",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 300,
          background: "#f4f4f4",
          color: "#111",
        }}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Cuestionario de Procesos — Truly Nolen",
  description: "Evaluación de conocimiento del Manual de Procesos",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#f4f6f5",
          color: "#1a2e1f",
        }}
      >
        {children}
      </body>
    </html>
  );
}

import MockProvider from '@/providers/mockProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MockProvider>{children}</MockProvider>
      </body>
    </html>
  );
}

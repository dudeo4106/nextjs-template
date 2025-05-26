import styles from './layout.module.scss';

import MockProvider from '@/providers/mockProvider';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={cx('container')}>
          <MockProvider>{children}</MockProvider>
        </div>
      </body>
    </html>
  );
}

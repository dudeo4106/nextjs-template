import classNames from 'classnames/bind';
import type { ReactNode } from 'react';

import MockProvider from '@/providers/mockProvider';

import styles from './layout.module.scss';

const cx = classNames.bind(styles);

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <MockProvider>
          <div className={cx('container')}>{children}</div>
        </MockProvider>
      </body>
    </html>
  );
};

export default RootLayout;

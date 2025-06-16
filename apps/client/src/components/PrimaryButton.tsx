import classNames from 'classnames/bind';
import { ButtonHTMLAttributes } from 'react';

import styles from './PrimaryButton.module.scss';

const cx = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: 's' | 'm';
}

export const PrimaryButton = ({ text, size = 'm' }: Props) => {
  return (
    <button className={cx('primary-button', `size-${size}`)}>{text}</button>
  );
};

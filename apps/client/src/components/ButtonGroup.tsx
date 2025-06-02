import { PrimaryButton } from '@/components/PrimaryButton';

export const ButtonGroup = () => {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <PrimaryButton text="yes" size="m" />
      <PrimaryButton text="cancel" size="s" />
    </div>
  );
};

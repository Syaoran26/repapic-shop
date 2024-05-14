import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { NoDataIcon } from './Icons';

interface NoDataProps {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const NoData: FC<NoDataProps> = ({ title = 'Không có dữ liệu', icon, subtitle, className }) => {
  const styles = classNames(className, 'flex flex-col items-center px-6 py-20');

  return (
    <div className={styles}>
      {icon ?? <NoDataIcon width={160} height={160} />}
      <span className="text-lg font-bold text-fader">{title}</span>
      {subtitle && <span className="mt-2 text-xs text-fader">{subtitle}</span>}
    </div>
  );
};

export default NoData;

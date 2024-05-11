import classNames from 'classnames';
import { FC } from 'react';
import { NoDataIcon } from './Icons';

interface NoDataProps {
  title?: string;
  className?: string;
}

const NoData: FC<NoDataProps> = ({ title = 'Không có dữ liệu', className }) => {
  const styles = classNames(className, 'flex flex-col items-center px-6 py-20');

  return (
    <div className={styles}>
      <NoDataIcon width={160} height={160} />
      <span className="text-lg font-bold text-fader">{title}</span>
    </div>
  );
};

export default NoData;

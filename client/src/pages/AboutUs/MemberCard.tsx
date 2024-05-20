import { FC } from 'react';
import { IconButton, Link, Paper, Tooltip } from '@mui/material';
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoLinkedin, BiLogoTiktok } from 'react-icons/bi';

export interface Member {
  role: string;
  author: string;
  image: string;
  facebookLink: string;
}
interface MemberProps {
  data: Member;
}

const MemberCard: FC<MemberProps> = ({ data }) => {
  return (
    <div className="text-center">
      <Paper>
        <h6 className="pt-5 mb-1 text-lg font-semibold">{data.author}</h6>
        <p className="mb-5 font-normal text-fade">{data.role}</p>
        <img className="w-full aspect-[3/4] px-2 rounded-2xl" src={data.image} alt={data.author} />
        <div className="flex items-center justify-center p-4">
          <Tooltip title="Follow trên Facebook" arrow>
            <IconButton sx={{ color: '#1877f2' }} component={Link} href={data.facebookLink}>
              <BiLogoFacebook />
            </IconButton>
          </Tooltip>
          <Tooltip title="Follow trên Instagram" arrow>
            <IconButton sx={{ color: '#e02d69' }}>
              <BiLogoInstagramAlt />
            </IconButton>
          </Tooltip>
          <Tooltip title="Follow trên Tiktok" arrow>
            <IconButton sx={{ color: 'black' }}>
              <BiLogoTiktok />
            </IconButton>
          </Tooltip>
          <Tooltip title="Follow trên LinkedIn" arrow>
            <IconButton sx={{ color: '#007ebb' }}>
              <BiLogoLinkedin />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    </div>
  );
};

export default MemberCard;

import { FC } from 'react';
import { IconButton, Paper, Tooltip } from '@mui/material';
import { BiLogoFacebook, BiLogoInstagramAlt, BiLogoLinkedin, BiLogoTiktok } from 'react-icons/bi';


interface Member {
  role: string;
  author: string;
  image:string;
}
interface MemberProps{
  data: Member
}
const MemberCard: FC<MemberProps> = ({ data }) => {
  return (
    <div className="px-3 py-20 text-center">
      <Paper>
        <h6 className="pt-5 mb-1 font-semibold">{data.author}</h6>
        <p className="mb-5 font-normal text-fade">{data.role}</p>
        <img className="w-full px-2 rounded-2xl" src={data.image} alt="portrait1" />
        <div className="flex items-center justify-center p-4">
          <Tooltip title="Follow trên Facebook" arrow>
            <IconButton sx={{ color: '#1877f2' }}>
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

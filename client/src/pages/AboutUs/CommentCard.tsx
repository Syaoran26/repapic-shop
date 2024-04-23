import { Avatar, Rating } from '@mui/material';
import React from 'react';
import { RiDoubleQuotesL } from 'react-icons/ri';
import Comment from '~/types/CommentType';

interface CommentProps {
  data: Comment;
}
const CommentCard: React.FC<CommentProps> = ({ data }) => {
  return (
    <div className="p-6 bg-[#ffffff14] text-white rounded-2xl">
      <RiDoubleQuotesL className='mb-6 text-4xl text-slate-400'/>
      <p className='mb-6 text-sm font-normal'>{data.text}</p>
      <Rating name="read-only" value={data.rating} readOnly />
      <div className="flex mt-6">
        <div className="mr-4">
          <Avatar alt="author avatar" src={data.image} />
        </div>
        <div>
          <p className='mb-1 text-sm font-semibold'>{data.author}</p>
          <p className='text-xs font-normal leading-normal text-slate-400'>{data.date}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

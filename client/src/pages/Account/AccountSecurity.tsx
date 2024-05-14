import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { constants } from '@common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import { useState } from 'react';

const schema = yup
  .object({
    oldPassword: yup.string().required('Vui lòng nhập mật khẩu'),
    newPassword: yup
      .string()
      .required('Vui lòng nhập nật khẩu')
      .matches(
        constants.passwordRegex,
        'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự số',
      ),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp'),
  })
  .required();

const AccountSecurity = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const ShowPasswordAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={(event) => event.preventDefault()}
          tabIndex={-1}
          size="small"
          edge="end"
        >
          {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
        </IconButton>
      </InputAdornment>
    );
  };
  const onSubmit = (data: yup.InferType<typeof schema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper className="flex flex-col gap-6 p-6">
        <TextField
          id="oldPassword"
          label="Mật khẩu cũ"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          {...register("oldPassword")}
          InputProps={{
            endAdornment: <ShowPasswordAdornment />,
          }}
        />
        <TextField
          id="newPassword"
          label="Mật khẩu mới"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          {...register("newPassword")}
          InputProps={{
            endAdornment: <ShowPasswordAdornment />,
          }}
        />
        <TextField
          id="confirmPassword"
          label="Nhập lại mật khẩu"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          InputProps={{
            endAdornment: <ShowPasswordAdornment />,
          }}
        />                
        <div className="flex justify-end">
          <Button type="submit" variant="contained">
            Lưu thay đổi
          </Button>
        </div>
      </Paper>
    </form>
  );
};

export default AccountSecurity;

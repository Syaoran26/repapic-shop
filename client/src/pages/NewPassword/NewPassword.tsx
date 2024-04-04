import { useState } from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import { FaAngleLeft } from 'react-icons/fa6';
import config from '~/config';

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="max-w-[420px] w-full bg-white rounded-2xl py-10 px-6 shadow-sm">
      <div className="h-24">
        <svg className="h-full mx-auto" fill="none" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#007867"
            d="M80.476 16.01c-2-2-48.544 35.833-52.269 43.652 0 0-.155 29.249 5.21 30.093 2.904 0 8.228-15.41 9.35-18.755.143-.428.339-.805.612-1.163 11.697-15.343 39.074-51.85 37.097-53.827z"
          ></path>
          <path
            fill="#00A76F"
            d="M11.167 39.109c-2.51 1.716-2.606 4.943-.319 6.946 3.06 2.68 8.372 7.018 17.359 13.62v-.013c3.724-7.82 50.269-45.652 52.269-43.652 1.977 1.977-25.4 38.484-37.097 53.826-.273.36-.47.736-.613 1.163-1.082 3.227-6.071 17.672-9.03 18.699 6.326-1.22 12.623-6.279 18.458-13.265 7.403 4.887 12.643 8.034 15.829 9.86 2.228 1.279 4.962.804 6.134-1.482 6.764-13.202 14.387-52.323 15.821-72.819.231-3.305-2.447-5.951-5.707-5.355-20.295 3.714-59.214 22.977-73.104 32.472zM33.417 89.755z"
          ></path>
          <g fill="#fff" fillOpacity="0.04" filter="url(#filter0_i_1870_134242)" style={{ mixBlendMode: 'overlay' }}>
            <path d="M11.167 39.109c-2.51 1.716-2.606 4.943-.319 6.946 3.06 2.68 8.372 7.018 17.359 13.62v-.013c3.724-7.82 50.269-45.652 52.269-43.652 1.977 1.977-25.4 38.484-37.097 53.826-.273.36-.47.736-.613 1.163-1.082 3.227-6.071 17.672-9.03 18.699 6.326-1.22 12.623-6.279 18.458-13.265 7.403 4.887 12.643 8.034 15.829 9.86 2.228 1.279 4.962.804 6.134-1.482 6.764-13.202 14.387-52.323 15.821-72.819.231-3.305-2.447-5.951-5.707-5.355-20.295 3.714-59.214 22.977-73.104 32.472zM33.417 89.755z"></path>
          </g>
          <defs>
            <filter
              id="filter0_i_1870_134242"
              width="82.787"
              height="85.202"
              x="7.205"
              y="4.553"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              ></feColorMatrix>
              <feOffset dx="-2" dy="-2"></feOffset>
              <feGaussianBlur stdDeviation="2"></feGaussianBlur>
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"></feColorMatrix>
              <feBlend in2="shape" result="effect1_innerShadow_1870_134242"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col gap-2 mt-6 mb-10 text-center">
        <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-bold">Đặt lại mật khẩu</h3>
        <p className="text-sm text-fade">
          Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn và chúng tôi sẽ gửi cho bạn một liên kết qua
          email để đặt lại mật khẩu của bạn.
        </p>
      </div>
      <form className="flex flex-col gap-6">
        <FormControl variant="outlined" color="default">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput id="email" label="Email" />
        </FormControl>
        <FormControl variant="outlined" color="default">
          <InputLabel htmlFor="password">Mật khẩu mới</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu mới"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  size="small"
                  edge="end"
                >
                  {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="outlined" color="default">
          <InputLabel htmlFor="confirmPassword">Xác nhận mật khẩu</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            label="Xác nhận mật khẩu"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  size="small"
                  edge="end"
                >
                  {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button color="default" size="large" type="submit">
          Cập nhật mật khẩu
        </Button>
        <Link href={config.routes.login} color="inherit" underline="hover" fontWeight={600}>
          <span className="flex items-center justify-center gap-1 text-sm text-center">
            <FaAngleLeft />
            Trở về đăng nhập
          </span>
        </Link>
      </form>
    </div>
  );
};

export default NewPassword;

import { Breadcrumbs, Container, Link } from '@mui/material';
import React from 'react';
import config from '~/config';

const Create = () => {
  return (
    <Container>
      <div className="mb-10">
        <h4 className="mb-2 text-2xl font-bold">Tạo sản phẩm mới</h4>
        <Breadcrumbs>
          <Link color="inherit" href={config.routes.admin}>
            Dashboard
          </Link>
          <Link color="inherit">Sản phẩm</Link>
          <span>Sản phẩm mới</span>
        </Breadcrumbs>
      </div>
    </Container>
  );
};

export default Create;

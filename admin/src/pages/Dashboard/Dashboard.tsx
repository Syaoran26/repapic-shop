import { Container } from '@mui/material';
import Overview from './Overview';
import MonthlySale from './MonthlySale';

const Dashboard = () => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-6">
        <Overview />
        <MonthlySale />
      </div>
    </Container>
  );
};

export default Dashboard;

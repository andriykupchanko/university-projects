// components/Dashboard.tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

interface DashboardProps {
  isAuthenticated: boolean;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab isDisabled>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>1</TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel>3</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;

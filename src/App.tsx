
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, styled, ThemeProvider } from '@mui/system';
import { Developer, fetchDevelopers, saveDeveloper } from './apis';
import { DevModal, DevListItem, AddDevModal } from './fragments';
import { customTheme } from './theme';



const AddEmployee = styled("li")(({theme}) => ({
  cursor: "pointer",
  border: `1px solid ${theme.palette.primary}`,
  borderRadius: 3,
  height: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: theme.spacing(),
  color: theme.palette.primary,
  fontSize: 24,
}))


const App: React.FC = () => {
  const [devs, setDevs] = useState<Developer[]>(() => [])
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);
  const [isAddingEmployee, setAddingEmployee] = useState<boolean>(false);
  const shouldDisplayDevModal = useMemo(() => !!selectedDev, [selectedDev])

  useEffect(() => { // fetch all the devs on component mount
    const call = async () => {
      const fetchedDevs = await fetchDevelopers();
      setDevs(fetchedDevs);
    }
    call();
  }, []);

  const onAddEmployee = useCallback(async (dev: Omit<Developer, "id">) => {
    try {
      const worked = await saveDeveloper(dev)
    } catch(e) {
      alert("an error occured")
    } finally {
      setAddingEmployee(false)
      const maxId = devs.reduce((acc, dev) => acc > dev.id ? acc : dev.id, 0);
      setDevs(devs => [...devs, {...dev, id: maxId + 1}])
    }
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Box>
        <DevModal visible={shouldDisplayDevModal} onClose={() => setSelectedDev(null)} developer={selectedDev!} />
        <AddDevModal visible={isAddingEmployee} onClose={() => setAddingEmployee(false)} onSave={onAddEmployee} />
        <Box component="ul" sx={{listStyle: "none", pl: 1}}>
          {devs.map(dev => <DevListItem key={dev.name} developer={dev} onClick={() => setSelectedDev(dev)} /> )}
          <AddEmployee onClick={() => setAddingEmployee(true)}>Add Employee</AddEmployee>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

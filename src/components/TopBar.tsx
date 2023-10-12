import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { TopBarTab } from "../models/constants";

export default function TopBar(props: { activeTab: TopBarTab, setActiveTab: (tab: TopBarTab) => void }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button 
            onClick={() => props.setActiveTab(TopBarTab.Payouts)} 
            color="inherit" 
            sx={{ 
              marginLeft: 'auto', 
              marginRight: 'auto', 
              width: '100%', 
              ...(props.activeTab == TopBarTab.Payouts && { backgroundColor: '#3166b5' }) 
          }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Payouts
            </Typography>
          </Button>
          <Button 
            onClick={() => props.setActiveTab(TopBarTab.Reporting)} 
            color="inherit" 
            sx={{ 
              marginLeft: 'auto', 
              marginRight: 'auto', 
              width: '100%',
              ...(props.activeTab == TopBarTab.Reporting && { backgroundColor: '#3166b5' }) 
            }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Reporting
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
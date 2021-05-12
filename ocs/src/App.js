import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    display: 'flex',
    flexDirection:'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [org, setOrg] = React.useState("");
  const [repos, setRep] = React.useState(5);
  const [committies, setCom] = React.useState(5);
  const [anchor, setAnchor] = React.useState(null);

  const [data, setUserData] = useState([]);
  const [people, setPeople] = useState([]);

  /*to get all the repos desired*/
  const getRepoDetail = async () => {
      try {
          const userData = await Axios.get(`https://api.github.com/search/repositories?q=user:${org.toLowerCase()}&sort=forks&per_page=100&page=1`);
          setUserData(userData.data.items.slice(0,repos));
      } catch (error) {
          console.log(error);
      }
  };

  /*to get contributor data for repo chosen*/
  const getContDetail = async (v) => {
    try {
        const userData2 = await Axios.get(v);
        setPeople(userData2.data.slice(0,committies));
    } catch (error) {
        console.log(error);
    }
  };

  const handleClick = (event,v) => {
    setAnchor(event.currentTarget);
    getContDetail(v);
  };

  return (
    <div className="App">
      <div style={{width:"100%", height:"50px", 
      textAlign:"center", font:"30px Open Sans", 
      color:"white", backgroundColor:"#006BE0", 
      lineHeight:"48px"}}>Mihir's Github Contributor Finder app</div>

      <div style={{display:"flex", flexDirection:"row"}}>

        {/*Form which needs to be filled, 1) enter the organisation bame 2) enter number of repos 3) enter number of committies, then press fetch*/}
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField id="standard-basic" label="Organisation" variant="outlined" onChange={(e) => setOrg(e.target.value)} />
        <TextField
          id="outlined-number"
          label="N(top repos)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(event) => {
            setRep(event.target.value)
          }}
          margin="normal"
          value={repos}
        />
        <TextField
          id="outlined-number"
          label="M(top committors)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(event) => {
            setCom(event.target.value)
          }}
          margin="normal"
          value={committies}
        />
        <Button variant="contained" color="primary" onClick={() => getRepoDetail()}>
          FETCH!
        </Button>
      </FormControl>
      
      <Paper className={classes.paper}>
      <List className={classes.root}>
          {data.map((repo) => (
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={repo.name}
                      secondary={
                        <React.Fragment>
                          <div style={{display:"flex", flexDirection:"column"}}>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Forks: {repo.forks_count}&nbsp;
                          </Typography>
                          <a href={repo.html_url}>{repo.full_name}</a>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;Click:
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e,v) => {handleClick(e,repo.contributors_url)}}>
                              Contributors
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchor={anchor}
                              keepMounted
                              open={Boolean(anchor)}
                              onClose={() => {setAnchor(null)}}
                            >
                              {people.map((user) => (
                                <MenuItem onClick={() => {setAnchor(null)}}>{user.login} : {user.contributions}</MenuItem>
                                ))}
                            </Menu>
                          </Typography>
                          <Divider style={{marginBottom:"5px"}}/>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {repo.description}
                          </Typography>
                          </div>
                          <Divider style={{marginTop:"5px"}}/>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
            ))}
      </List>
      </Paper>
    </div>
    </div>
  );
}

export default App;

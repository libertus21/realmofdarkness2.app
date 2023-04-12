import WelcomePage from '../components/WelcomePage';
import { UserContext } from '../components/ClientProvider'
import Dashboard from '../components/Dashboard';


export default function Index() {

  return (
    <UserContext.Consumer>
      {(user) => {
        if (!user) return (<WelcomePage />)
        else return (<Dashboard />) // Dashboard
      }}      
    </UserContext.Consumer>    
  );
}

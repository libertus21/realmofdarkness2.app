import WelcomePage from '../components/WelcomePage';
import { UserContext } from '../components/ClientProvider'
import Dashboard from '../components/Dashboard';


export default function Index() {

  return (
    <UserContext.Consumer>
      {(user) => {
        if (!user) return (<WelcomePage />)
        else if (user.supporter < 1) return (<WelcomePage unAuth />)
        else return (<Dashboard />) // Dashboard
      }}      
    </UserContext.Consumer>    
  );
}
